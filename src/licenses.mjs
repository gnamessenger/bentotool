// 오픈소스 고지 — 도구가 쓰는 외부 부품 목록 (2026-10-17 npm·Hugging Face·원본 저장소에서 라이선스 직접 확인)
// 부품을 추가·교체하면 이 목록도 같이 고칠 것.
export const licenses = [
  { name: "@imgly/background-removal", ver: "1.7.0", lic: "AGPL-3.0", url: "https://github.com/imgly/background-removal-js", ko: "배경 제거, 증명사진 만들기", en: "Remove Background, ID Photo" },
  { name: "ffmpeg.wasm (@ffmpeg/core)", ver: "0.12.10", lic: "GPL-2.0-or-later", url: "https://github.com/ffmpegwasm/ffmpeg.wasm", ko: "동영상 자르기, 동영상 형식 변환", en: "Trim Video, Convert Video" },
  { name: "@ffmpeg/ffmpeg", ver: "0.12.15", lic: "MIT", url: "https://github.com/ffmpegwasm/ffmpeg.wasm", ko: "동영상 자르기, 동영상 형식 변환", en: "Trim Video, Convert Video" },
  { name: "heic-to", ver: "1.6.5", lic: "LGPL-3.0", url: "https://github.com/hoppergee/heic-to", ko: "HEIC JPG 변환", en: "HEIC to JPG" },
  { name: "lamejs", ver: "1.2.1", lic: "LGPL-3.0", url: "https://github.com/zhuker/lamejs", ko: "동영상 MP3 추출", en: "Video to MP3" },
  { name: "MI-GAN (Picsart AI Research)", ver: "v2", lic: "MIT", url: "https://github.com/Picsart-AI-Research/MI-GAN", ko: "사진 속 물체·사람 지우기", en: "Remove Objects" },
  { name: "Real-ESRGAN (realesr-general-x4v3)", ver: "0.2.5.0", lic: "BSD-3-Clause", url: "https://github.com/xinntao/Real-ESRGAN", ko: "AI 화질 개선·확대", en: "AI Image Upscaler" },
  { name: "Whisper (OpenAI)", ver: "base · small · large-v3-turbo", lic: "MIT / Apache-2.0", url: "https://github.com/openai/whisper", ko: "영상 자막 만들기", en: "Video to Subtitles" },
  { name: "Transformers.js", ver: "4.3.0", lic: "Apache-2.0", url: "https://github.com/huggingface/transformers.js", ko: "영상 자막 만들기", en: "Video to Subtitles" },
  { name: "ONNX Runtime Web", ver: "1.30.0", lic: "MIT", url: "https://github.com/microsoft/onnxruntime", ko: "물체 지우기, 화질 개선", en: "Remove Objects, Upscaler" },
  { name: "MediaPipe Tasks Vision", ver: "0.10.14", lic: "Apache-2.0", url: "https://github.com/google-ai-edge/mediapipe", ko: "얼굴 모자이크", en: "Blur Faces" },
  { name: "Tesseract.js", ver: "7.0.0", lic: "Apache-2.0", url: "https://github.com/naptha/tesseract.js", ko: "이미지 글자 추출", en: "Image to Text" },
  { name: "PDF.js", ver: "3.11.174", lic: "Apache-2.0", url: "https://github.com/mozilla/pdf.js", ko: "PDF 도구", en: "PDF tools" },
  { name: "pdf-lib", ver: "1.17.1", lic: "MIT", url: "https://github.com/Hopding/pdf-lib", ko: "PDF 도구, 워터마크", en: "PDF tools, Watermark" },
  { name: "jsPDF", ver: "2.5.1", lic: "MIT", url: "https://github.com/parallax/jsPDF", ko: "이미지 PDF 변환 등", en: "Image to PDF and more" },
  { name: "JSZip", ver: "3.10.1", lic: "MIT (MIT 또는 GPL-3.0 중 MIT 적용)", licEn: "MIT (dual MIT/GPL-3.0, used under MIT)", url: "https://github.com/Stuk/jszip", ko: "여러 파일 한 번에 받기(ZIP)", en: "Download all (ZIP)" },
  { name: "Cropper.js", ver: "1.6.2", lic: "MIT", url: "https://github.com/fengyuanchen/cropperjs", ko: "이미지 자르기, 증명사진", en: "Crop Image, ID Photo" },
  { name: "gifenc", ver: "1.0.3", lic: "MIT", url: "https://github.com/mattdesl/gifenc", ko: "동영상 GIF 만들기", en: "Video to GIF" },
  { name: "qrcode-generator", ver: "1.4.4", lic: "MIT", url: "https://github.com/kazuhikoarase/qrcode-generator", ko: "QR코드 만들기", en: "QR Code Generator" },
];

export const licensesText = {
  ko: {
    title: "오픈소스 고지 | 벤토툴",
    desc: "벤토툴이 사용하는 오픈소스 소프트웨어와 AI 모델, 각각의 라이선스를 안내해요.",
    h1: "오픈소스 고지",
    intro: `<p>벤토툴은 아래 오픈소스 소프트웨어와 공개 AI 모델을 사용해요. 모든 파일 처리는 방문자의 브라우저 안에서 이뤄지며, 이 부품들은 공개 CDN(jsDelivr, cdnjs)과 Hugging Face에서 <strong>수정하지 않은 원본 그대로</strong> 불러와 사용해요.</p>
<p>벤토툴 사이트의 소스 코드는 GitHub에 공개되어 있어요: <a href="https://github.com/gnamessenger/bentotool" rel="noopener">github.com/gnamessenger/bentotool</a></p>`,
    cols: ["이름", "버전", "라이선스", "쓰이는 도구"],
    photos: `<h2>무료 사진 찾기</h2><p>'무료 사진 찾기'는 워드프레스 재단이 운영하는 <a href="https://openverse.org" rel="noopener">Openverse</a>를 통해 공개 라이선스 사진을 검색해요. 각 사진의 라이선스와 출처는 사진마다 표시돼요.</p>`,
    outro: `<p>각 라이선스 전문은 이름에 연결된 원본 페이지에서 볼 수 있어요. 빠지거나 잘못된 내용이 있으면 알려 주세요.</p>`,
    contact: "문의",
  },
  en: {
    title: "Open Source Notices | BentoTool",
    desc: "Open-source software and AI models used by BentoTool, and their licenses.",
    h1: "Open Source Notices",
    intro: `<p>BentoTool uses the open-source software and publicly released AI models listed below. All file processing happens in your browser, and these components are loaded <strong>unmodified</strong> from public CDNs (jsDelivr, cdnjs) and Hugging Face.</p>
<p>The source code of this website is public on GitHub: <a href="https://github.com/gnamessenger/bentotool" rel="noopener">github.com/gnamessenger/bentotool</a></p>`,
    cols: ["Name", "Version", "License", "Used in"],
    photos: `<h2>Free Stock Photos</h2><p>Free Stock Photos searches openly licensed images through <a href="https://openverse.org" rel="noopener">Openverse</a>, run by the WordPress Foundation. Each photo shows its own license and credit.</p>`,
    outro: `<p>Full license texts are available on each project's page (linked from the name). If anything is missing or incorrect, please let us know.</p>`,
    contact: "Contact",
  },
};
