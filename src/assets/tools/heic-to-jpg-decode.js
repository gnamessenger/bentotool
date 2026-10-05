// HEIC/HEIF도 열 수 있는 이미지 열기. (heic-to-jpg, image-to-kb 가 같이 씀)
// 1) 브라우저가 직접 열 수 있으면(사파리 등) 그걸 쓰고
// 2) 못 열면 HEIC 파일일 때만 heic-to(libheif) 를 처음 한 번 내려받아 풀어요.
import { loadImage } from "../common.js";

const HEIC_LIB = "https://cdn.jsdelivr.net/npm/heic-to@1.6.5/dist/csp/heic-to.js";
const BRANDS = new Set(["heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs", "mif1", "msf1"]);

let libPromise = null;
export function loadHeicLib() {
  if (!libPromise) libPromise = import(HEIC_LIB).catch((e) => { libPromise = null; throw e; });
  return libPromise;
}

// 파일 앞부분의 ftyp 상자를 보고 HEIC/HEIF 인지 판단
export async function looksHeic(file) {
  if (/\.(heic|heif)$/i.test(file.name || "") || /hei[cf]/i.test(file.type || "")) return true;
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const str = String.fromCharCode(...head);
  return str.slice(4, 8) === "ftyp" && BRANDS.has(str.slice(8, 12));
}

// → ImageBitmap 또는 HTMLImageElement (width/height 를 가진 그릴 수 있는 것)
// onLib(): 라이브러리를 처음 내려받기 시작할 때 한 번 불러줘요 (안내 문구용)
export async function decodeAny(file, onLib) {
  try {
    return await loadImage(file);
  } catch (nativeErr) {
    if (!(await looksHeic(file))) throw nativeErr;
  }
  if (!libPromise) onLib?.();
  const { heicTo } = await loadHeicLib();
  return heicTo({ blob: file, type: "bitmap" });
}
