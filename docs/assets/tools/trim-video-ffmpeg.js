// ffmpeg.wasm 공용 로더 (trim-video, convert-video가 같이 씀)
// - 단일 스레드 코어(@ffmpeg/core)라 SharedArrayBuffer·COOP/COEP 헤더 없이 동작해요.
// - CDN 파일로는 워커를 직접 만들 수 없어서(다른 출처), 같은 출처의 blob: 워커를 만들고
//   그 안에서 CDN의 worker.js를 import 해요. 코어 JS는 워커 안에서 동적 import,
//   wasm은 진행률을 보여주려고 직접 받아서 blob: 주소로 넘겨요.
// - 입력 파일은 WORKERFS로 연결해서 wasm 메모리에 통째로 복사하지 않아요.
import { FFmpeg } from "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js";

const FF_BASE = "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/";
const CORE_BASE = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/";
const WASM_SIZE = 32232419;   // ffmpeg-core.wasm 압축 풀린 크기 (전송은 brotli 약 9.3MB)

let wasmUrlPromise = null;
let instance = null;          // { ff, ready }

async function wasmBlobUrl(onDownload) {
  const res = await fetch(CORE_BASE + "ffmpeg-core.wasm");
  if (!res.ok || !res.body) throw new Error("wasm download failed: " + res.status);
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    got += value.length;
    onDownload?.(Math.min(1, got / WASM_SIZE));
  }
  return URL.createObjectURL(new Blob(chunks, { type: "application/wasm" }));
}

// onDownload(ratio 0~1): 첫 다운로드 진행률
export function loadFFmpeg(onDownload) {
  if (instance) return instance.ready;
  const ff = new FFmpeg();
  const ready = (async () => {
    if (!wasmUrlPromise) wasmUrlPromise = wasmBlobUrl(onDownload).catch((e) => { wasmUrlPromise = null; throw e; });
    const wasmURL = await wasmUrlPromise;
    const workerURL = URL.createObjectURL(new Blob([`import "${FF_BASE}worker.js";`], { type: "text/javascript" }));
    await ff.load({ classWorkerURL: workerURL, coreURL: CORE_BASE + "ffmpeg-core.js", wasmURL });
    return ff;
  })();
  instance = { ff, ready };
  ready.catch(() => { if (instance?.ff === ff) instance = null; ff.terminate(); });
  return ready;
}

// 작업 취소: 워커를 끝내요. 다음 작업 때 다시 불러와요 (wasm은 메모리에 남아 있어 빨라요).
export function stopFFmpeg() {
  if (!instance) return;
  try { instance.ff.terminate(); } catch {}
  instance = null;
}

let mountSeq = 0;
// 입력 파일을 /inN/input.확장자 로 연결 (복사 없음)
export async function mountInput(ff, file) {
  const dir = `/in${++mountSeq}`;
  const ext = (file.name.match(/\.[a-z0-9]{1,5}$/i)?.[0] || ".mp4").toLowerCase();
  const named = new File([file], "input" + ext, { type: file.type });
  await ff.createDir(dir);
  await ff.mount("WORKERFS", { files: [named] }, dir);
  return { path: `${dir}/input${ext}`, ext, cleanup: async () => { try { await ff.unmount(dir); await ff.deleteDir(dir); } catch {} } };
}

// ffmpeg 실행 + 로그 수집. onTime(초) 으로 현재 처리 위치를 알려줘요.
export async function run(ff, args, onTime) {
  const log = [];
  const onLog = ({ message }) => log.push(message);
  const onProg = ({ time }) => { if (onTime && time > 0) onTime(time / 1e6); };
  ff.on("log", onLog);
  ff.on("progress", onProg);
  try {
    const ret = await ff.exec(["-hide_banner", "-nostdin", ...args]);
    return { ret, log: log.join("\n") };
  } finally {
    ff.off("log", onLog);
    ff.off("progress", onProg);
  }
}

// 입력 정보: 길이(초), 가로·세로, 영상/소리 코덱
export async function probe(ff, path) {
  const { log } = await run(ff, ["-i", path]);
  const d = log.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  const v = log.match(/Stream #\d+:\d+[^:]*: Video: (\w+)[^\n]*?\b(\d{2,5})x(\d{2,5})\b/);
  const a = log.match(/Stream #\d+:\d+[^:]*: Audio: (\w+)/);
  const rot = log.match(/rotate\s*:\s*(-?\d+)|rotation of (-?\d+)/);
  return {
    duration: d ? +d[1] * 3600 + +d[2] * 60 + +d[3] : 0,
    vcodec: v?.[1] || "", width: v ? +v[2] : 0, height: v ? +v[3] : 0,
    acodec: a?.[1] || "",
    rotated: rot ? Math.abs(+(rot[1] || rot[2])) % 180 === 90 : false,
    log,
  };
}

// 결과 파일을 꺼내고 지워요
export async function takeOutput(ff, path, type) {
  const data = await ff.readFile(path);
  try { await ff.deleteFile(path); } catch {}
  return new Blob([data], { type });
}

export const fmtTime = (s) => {
  s = Math.max(0, s || 0);
  const m = Math.floor(s / 60), sec = s - m * 60;
  const hh = Math.floor(m / 60);
  const mm = hh ? String(m % 60).padStart(2, "0") : String(m);
  return (hh ? hh + ":" : "") + mm + ":" + sec.toFixed(1).padStart(4, "0");
};
