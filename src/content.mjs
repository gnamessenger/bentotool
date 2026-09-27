// 사이트 문구(한국어·영어)와 도구 목록.
// 도구를 추가할 때: tools 배열에 항목 하나 + src/assets/tools/<slug>.js 파일 하나.

export const site = {
  ko: {
    langLabel: "한국어",
    switchLabel: "English",
    home: {
      title: "벤토툴 - 무료 온라인 파일 도구 모음 | 배경 제거·이미지 압축·PDF·동영상 변환",
      desc: "배경 제거, 이미지 압축, PDF 합치기·나누기, 동영상 GIF·MP3 변환, 글자 수 세기, QR코드까지 무료로. 회원가입 없이, 파일은 서버로 전송되지 않고 내 브라우저에서 바로 처리돼요.",
      h1: "필요한 파일 도구,<br><em>한 도시락</em>에 다 담았어요",
      sub: "배경 제거부터 PDF 합치기까지. 전부 무료, 회원가입 없이, 파일은 내 컴퓨터 밖으로 나가지 않아요.",
      toolsTitle: "모든 도구",
      features: [
        ["🔒", "업로드 없음", "모든 처리가 내 브라우저 안에서 이뤄져요. 파일이 어디로도 전송되지 않아요."],
        ["⚡", "기다림 없음", "서버 대기열이 없어서 올리자마자 바로 처리돼요."],
        ["💸", "완전 무료", "회원가입도, 횟수 제한도, 워터마크도 없어요."],
      ],
    },
    cats: { image: "이미지 도구", pdf: "PDF 도구", video: "동영상·오디오 도구", util: "글자·유틸리티" },
    nav: { tools: "모든 도구" },
    how: "사용 방법",
    faq: "자주 묻는 질문",
    related: "다른 도구도 써보세요",
    footer: {
      privacy: "개인정보처리방침",
      contact: "문의",
      note: "모든 파일은 브라우저 안에서만 처리되며 어디에도 저장되지 않습니다.",
    },
    privacy: {
      title: "개인정보처리방침 | 벤토툴",
      desc: "벤토툴 개인정보처리방침",
      h1: "개인정보처리방침",
      contactTitle: "7. 문의",
      contactText: "개인정보 및 서비스 이용에 관한 문의는 아래 이메일로 보내 주세요.",
      body: `
<p>벤토툴(이하 "사이트")은 이용자의 개인정보를 소중히 여기며, 다음과 같이 처리합니다.</p>
<h2>1. 파일 처리</h2>
<p>이용자가 사이트에 올리는 이미지·PDF 등 모든 파일은 이용자의 웹 브라우저 안에서만 처리됩니다. 파일은 사이트 운영자의 서버나 제3자에게 전송·저장되지 않습니다.</p>
<h2>2. 수집하는 정보</h2>
<p>사이트는 회원가입을 받지 않으며, 이름·연락처 등 개인을 식별할 수 있는 정보를 직접 수집하지 않습니다.</p>
<h2>3. 쿠키와 광고</h2>
<p>사이트는 Google AdSense 등 제3자 광고 서비스를 사용할 수 있습니다. Google을 포함한 제3자 공급업체는 쿠키를 사용하여 이용자의 이 사이트 및 다른 사이트 방문 기록을 바탕으로 광고를 게재할 수 있습니다. 이용자는 <a href="https://adssettings.google.com" rel="nofollow">Google 광고 설정</a>에서 맞춤 광고를 해제할 수 있습니다.</p>
<h2>4. 방문 통계</h2>
<p>서비스 개선을 위해 방문 페이지, 브라우저 종류 등 개인을 식별할 수 없는 통계 정보를 수집할 수 있습니다.</p>
<h2>5. 외부 라이브러리</h2>
<p>일부 도구는 기능 실행에 필요한 프로그램 파일(AI 모델 등)을 공개 CDN에서 내려받습니다. 이때 이용자의 파일은 전송되지 않습니다. '무료 사진 찾기'는 입력한 검색어를 이미지 검색 서비스인 Openverse(WordPress 재단 운영)로 보내 결과를 받아옵니다.</p>
<h2>6. 변경</h2>
<p>이 방침이 바뀌면 이 페이지에 게시합니다.</p>`,
    },
    ui: {
      choose: "파일 선택",
      orDrop: "또는 여기로 끌어다 놓기",
      pasteHint: "Ctrl+V로 붙여넣기도 돼요",
      processing: "처리 중…",
      waiting: "대기 중",
      failed: "실패",
      download: "다운로드",
      downloadAll: "모두 다운로드",
      clear: "모두 지우기",
      remove: "빼기",
      moveUp: "위로",
      moveDown: "아래로",
      privacyBadge: "🔒 파일은 서버로 전송되지 않아요",
      addMore: "파일 추가",
    },
  },

  en: {
    langLabel: "English",
    switchLabel: "한국어",
    home: {
      title: "BentoTool - Free Online File Tools | Remove Background, Compress Images, PDF, Video",
      desc: "Remove backgrounds, compress images, merge and split PDFs, convert video to GIF or MP3, count words, make QR codes — free, no sign-up. Files never leave your browser.",
      h1: "Every file tool you need,<br><em>packed in one box</em>",
      sub: "From background removal to PDF merging. Free, no sign-up, and your files never leave your device.",
      toolsTitle: "All tools",
      features: [
        ["🔒", "No uploads", "Everything runs inside your browser. Your files are never sent anywhere."],
        ["⚡", "No waiting", "No server queues — processing starts the moment you drop a file."],
        ["💸", "Totally free", "No sign-up, no limits, no watermarks."],
      ],
    },
    cats: { image: "Image tools", pdf: "PDF tools", video: "Video & audio tools", util: "Text & utilities" },
    nav: { tools: "All tools" },
    how: "How to use",
    faq: "FAQ",
    related: "Try other tools",
    footer: {
      privacy: "Privacy Policy",
      contact: "Contact",
      note: "All files are processed in your browser and never stored anywhere.",
    },
    privacy: {
      title: "Privacy Policy | BentoTool",
      desc: "BentoTool privacy policy",
      h1: "Privacy Policy",
      contactTitle: "7. Contact",
      contactText: "For questions about privacy or the service, email us at",
      body: `
<p>BentoTool ("the Site") respects your privacy. This policy explains how we handle information.</p>
<h2>1. Your files</h2>
<p>All files you use on the Site (images, PDFs, etc.) are processed entirely inside your web browser. They are never uploaded to our servers or shared with third parties.</p>
<h2>2. Information we collect</h2>
<p>The Site has no accounts and does not directly collect personally identifiable information such as names or contact details.</p>
<h2>3. Cookies and advertising</h2>
<p>The Site may use third-party advertising services such as Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising at <a href="https://adssettings.google.com" rel="nofollow">Google Ads Settings</a>.</p>
<h2>4. Analytics</h2>
<p>We may collect anonymous usage statistics (pages visited, browser type) to improve the service.</p>
<h2>5. Third-party libraries</h2>
<p>Some tools download program files (such as AI models) from public CDNs. Your files are not transmitted when this happens. 'Free Stock Photos' sends your search keywords to Openverse (run by the WordPress Foundation) to fetch results.</p>
<h2>6. Changes</h2>
<p>Any changes to this policy will be posted on this page.</p>`,
    },
    ui: {
      choose: "Choose files",
      orDrop: "or drop them here",
      pasteHint: "You can also paste with Ctrl+V",
      processing: "Processing…",
      waiting: "Waiting",
      failed: "Failed",
      download: "Download",
      downloadAll: "Download all",
      clear: "Clear all",
      remove: "Remove",
      moveUp: "Move up",
      moveDown: "Move down",
      privacyBadge: "🔒 Files never leave your device",
      addMore: "Add files",
    },
  },
};

export const tools = [
  {
    slug: "remove-background",
    icon: "✂️",
    cat: "image",
    libs: [],
    ko: {
      name: "배경 제거",
      short: "AI가 사진 배경을 자동으로 지워 투명 PNG로",
      title: "이미지 배경 제거 - 무료 AI 누끼 따기 | 벤토툴",
      desc: "사진을 올리면 AI가 자동으로 배경을 지워 투명 PNG로 만들어 드려요. 회원가입 없이 무료, 사진은 서버로 전송되지 않습니다.",
      h1: "이미지 배경 제거",
      sub: "클릭 한 번으로 누끼 따기. 100% 자동, 무료.",
      steps: [
        "사진을 올리거나 끌어다 놓으세요.",
        "AI가 사람·상품·동물을 알아보고 배경을 지워요.",
        "투명 PNG 또는 원하는 배경색으로 저장하세요.",
      ],
      faq: [
        ["정말 무료인가요?", "네. 횟수 제한도 워터마크도 없이 무료로 쓸 수 있어요."],
        ["사진이 서버에 저장되나요?", "아니요. 모든 처리는 내 브라우저 안에서 이뤄지고, 사진은 어디로도 전송되지 않아요."],
        ["처음에 왜 오래 걸리나요?", "처음 한 번은 AI 모델(약 40MB)을 내려받아요. 그다음부터는 바로 처리돼요."],
        ["어떤 사진이 잘 되나요?", "사람, 상품, 동물처럼 주인공이 뚜렷한 사진일수록 깔끔하게 지워져요."],
      ],
      ui: {
        loadingModel: "AI 모델 준비 중…",
        downloadingModel: "AI 모델 내려받는 중…",
        removing: "배경 지우는 중…",
        firstNote: "처음 한 번은 AI 모델(약 40MB)을 내려받느라 조금 걸려요.",
        background: "배경",
        transparent: "투명",
        custom: "직접 고르기",
        another: "다른 사진 하기",
        fail: "배경 제거에 실패했어요. 다른 사진으로 시도하거나 크롬·엣지 최신 버전을 써 주세요.",
        compareHint: "사진 위에서 마우스를 좌우로 움직이면 원본과 비교할 수 있어요",
      },
    },
    en: {
      name: "Remove Background",
      short: "AI removes photo backgrounds into transparent PNGs",
      title: "Remove Background from Image - Free AI Background Remover | BentoTool",
      desc: "Upload a photo and AI removes the background automatically, giving you a transparent PNG. Free, no sign-up, and your photo never leaves your browser.",
      h1: "Remove Image Background",
      sub: "One click, clean cutout. 100% automatic and free.",
      steps: [
        "Upload or drop your photo.",
        "AI detects the person, product or pet and removes the background.",
        "Save as a transparent PNG or with any background color.",
      ],
      faq: [
        ["Is it really free?", "Yes. No limits and no watermarks."],
        ["Are my photos uploaded?", "No. Everything runs inside your browser and your photo is never sent anywhere."],
        ["Why is the first run slow?", "The first time, your browser downloads the AI model (about 40 MB). After that it's instant."],
        ["What photos work best?", "Photos with a clear subject — people, products, animals — give the cleanest results."],
      ],
      ui: {
        loadingModel: "Preparing AI model…",
        downloadingModel: "Downloading AI model…",
        removing: "Removing background…",
        firstNote: "The first run downloads the AI model (about 40 MB), so it takes a moment.",
        background: "Background",
        transparent: "Transparent",
        custom: "Pick a color",
        another: "Try another photo",
        fail: "Background removal failed. Try another photo or the latest Chrome/Edge.",
        compareHint: "Move your mouse across the image to compare with the original",
      },
    },
  },

  {
    slug: "compress-image",
    icon: "🗜️",
    cat: "image",
    libs: ["jszip"],
    ko: {
      name: "이미지 용량 줄이기",
      short: "화질은 지키고 사진 용량은 확 줄이기",
      title: "이미지 용량 줄이기 - JPG·PNG 사진 압축 무료 | 벤토툴",
      desc: "사진 화질은 지키면서 파일 용량을 확 줄여요. 여러 장을 한꺼번에, 무료로, 업로드 없이 브라우저에서 바로 압축합니다.",
      h1: "이미지 용량 줄이기",
      sub: "화질은 그대로, 용량은 가볍게. 여러 장도 한 번에.",
      steps: [
        "품질과 저장 형식을 고르세요. (기본값으로도 충분해요)",
        "사진을 올리면 바로 압축돼요. 여러 장도 한 번에 돼요.",
        "한 장씩 받거나 '모두 다운로드'로 한 번에 받으세요.",
      ],
      faq: [
        ["얼마나 줄어드나요?", "사진에 따라 다르지만 보통 50~80% 줄어요. 품질 값을 낮출수록 더 작아져요."],
        ["PNG도 되나요?", "네. PNG를 WEBP나 JPG로 저장하면 용량이 크게 줄어요. 투명 배경을 지키려면 WEBP를 고르세요."],
        ["사진이 업로드되나요?", "아니요. 압축은 내 브라우저 안에서 이뤄지고 사진은 어디로도 전송되지 않아요."],
      ],
      ui: {
        quality: "품질",
        format: "저장 형식",
        maxWidth: "최대 가로 크기",
        original: "원본 그대로",
        keptOriginal: "원본이 더 작아서 원본 유지",
      },
    },
    en: {
      name: "Compress Image",
      short: "Shrink photo file size without visible quality loss",
      title: "Compress Image - Reduce JPG & PNG File Size Free | BentoTool",
      desc: "Reduce image file size while keeping quality. Compress multiple photos at once, free, with no uploads — right in your browser.",
      h1: "Compress Images",
      sub: "Same look, lighter files. Batch compress in one go.",
      steps: [
        "Pick quality and output format (the defaults work great).",
        "Drop your photos — they're compressed instantly, many at once.",
        "Download one by one or use 'Download all'.",
      ],
      faq: [
        ["How much smaller will my images get?", "Usually 50–80% smaller, depending on the photo. Lower quality means smaller files."],
        ["Does it work with PNG?", "Yes. Saving PNGs as WEBP or JPG shrinks them a lot. Choose WEBP to keep transparency."],
        ["Are my images uploaded?", "No. Compression happens in your browser and nothing is sent anywhere."],
      ],
      ui: {
        quality: "Quality",
        format: "Format",
        maxWidth: "Max width",
        original: "Keep original",
        keptOriginal: "Original was smaller — kept as is",
      },
    },
  },

  {
    slug: "resize-image",
    icon: "📐",
    cat: "image",
    libs: ["jszip"],
    ko: {
      name: "이미지 크기 조절",
      short: "사진 가로·세로 크기를 원하는 대로",
      title: "이미지 크기 조절 - 사진 사이즈 변경 무료 | 벤토툴",
      desc: "사진 크기를 비율(%)이나 가로 픽셀로 간단히 바꿔요. 여러 장을 한꺼번에, 무료로, 업로드 없이 처리합니다.",
      h1: "이미지 크기 조절",
      sub: "비율이나 픽셀로 간단하게. 여러 장도 한 번에.",
      steps: [
        "비율(%)로 줄일지, 가로 크기(px)를 정할지 고르세요.",
        "사진을 올리면 바로 크기가 바뀌어요. 세로는 비율에 맞춰 자동으로 정해져요.",
        "한 장씩 받거나 '모두 다운로드'로 한 번에 받으세요.",
      ],
      faq: [
        ["사진이 찌그러지지 않나요?", "가로세로 비율을 그대로 지켜서 찌그러지지 않아요."],
        ["여러 장을 같은 크기로 맞출 수 있나요?", "네. '가로 크기(px)'를 고르면 모든 사진의 가로 폭이 같아져요."],
        ["사진이 업로드되나요?", "아니요. 내 브라우저 안에서만 처리돼요."],
      ],
      ui: {
        mode: "방식",
        byPercent: "비율(%)",
        byWidth: "가로 크기(px)",
        value: "값",
      },
    },
    en: {
      name: "Resize Image",
      short: "Change image dimensions by percent or pixels",
      title: "Resize Image - Change Photo Size Online Free | BentoTool",
      desc: "Resize photos by percentage or width in pixels. Batch resize multiple images for free, with no uploads.",
      h1: "Resize Images",
      sub: "By percent or pixels. Batch resize in seconds.",
      steps: [
        "Choose to scale by percentage or set a width in pixels.",
        "Drop your photos — height adjusts automatically to keep the aspect ratio.",
        "Download one by one or use 'Download all'.",
      ],
      faq: [
        ["Will my photos get stretched?", "No. The aspect ratio is always preserved."],
        ["Can I make many images the same width?", "Yes. Choose 'Width (px)' and every image gets the same width."],
        ["Are my images uploaded?", "No. Everything happens in your browser."],
      ],
      ui: {
        mode: "Mode",
        byPercent: "Percent (%)",
        byWidth: "Width (px)",
        value: "Value",
      },
    },
  },

  {
    slug: "convert-image",
    icon: "🔁",
    cat: "image",
    libs: ["jszip"],
    ko: {
      name: "이미지 형식 변환",
      short: "JPG, PNG, WEBP 서로 바꾸기",
      title: "이미지 변환 - JPG PNG WEBP 형식 변환 무료 | 벤토툴",
      desc: "JPG를 PNG로, PNG를 JPG로, WEBP를 JPG로. 이미지 형식을 무료로 바꿔요. 여러 장 한꺼번에, 업로드 없이.",
      h1: "이미지 형식 변환",
      sub: "JPG · PNG · WEBP, 원하는 형식으로 한 번에.",
      steps: [
        "바꿀 형식(JPG, PNG, WEBP)을 고르세요.",
        "사진을 올리면 바로 변환돼요. 여러 장도 한 번에 돼요.",
        "한 장씩 받거나 '모두 다운로드'로 한 번에 받으세요.",
      ],
      faq: [
        ["WEBP 사진이 안 열려요. 어떻게 하죠?", "여기서 JPG나 PNG로 바꾸면 어디서든 열려요."],
        ["투명 배경은 어떻게 되나요?", "PNG나 WEBP로 바꾸면 투명 배경이 그대로 남아요. JPG는 투명을 지원하지 않아서 흰색으로 채워져요."],
        ["아이폰 HEIC 사진도 되나요?", "크롬·엣지는 HEIC를 읽지 못해서 아직 지원하지 않아요. 아이폰 설정 > 카메라 > 포맷에서 '높은 호환성'을 고르면 JPG로 찍혀요."],
      ],
      ui: { target: "변환할 형식" },
    },
    en: {
      name: "Convert Image",
      short: "Convert between JPG, PNG and WEBP",
      title: "Image Converter - Convert JPG, PNG, WEBP Free | BentoTool",
      desc: "Convert JPG to PNG, PNG to JPG, WEBP to JPG and more. Free batch image conversion with no uploads.",
      h1: "Convert Images",
      sub: "JPG · PNG · WEBP — any direction, in one go.",
      steps: [
        "Choose the target format (JPG, PNG or WEBP).",
        "Drop your images — they convert instantly, many at once.",
        "Download one by one or use 'Download all'.",
      ],
      faq: [
        ["My WEBP images won't open. What do I do?", "Convert them to JPG or PNG here and they'll open anywhere."],
        ["What happens to transparency?", "PNG and WEBP keep transparency. JPG doesn't support it, so transparent areas become white."],
        ["Does it support iPhone HEIC photos?", "Chrome and Edge can't read HEIC yet, so it's not supported. On iPhone, set Settings > Camera > Formats to 'Most Compatible' to shoot JPG."],
      ],
      ui: { target: "Convert to" },
    },
  },

  {
    slug: "image-to-pdf",
    icon: "📄",
    cat: "pdf",
    libs: ["jspdf"],
    ko: {
      name: "이미지 PDF 변환",
      short: "사진 여러 장을 PDF 한 파일로",
      title: "JPG PDF 변환 - 이미지를 PDF로 만들기 무료 | 벤토툴",
      desc: "사진·스캔 이미지 여러 장을 PDF 한 파일로 묶어요. 순서도 바꿀 수 있고, 무료에 업로드도 없어요.",
      h1: "이미지를 PDF로",
      sub: "사진 여러 장을 PDF 한 파일로. 순서도 자유롭게.",
      steps: [
        "PDF로 만들 사진을 올리세요. 여러 장을 한 번에 올려도 돼요.",
        "▲▼ 버튼으로 순서를 맞추고 페이지 크기를 고르세요.",
        "'PDF 만들기'를 누르면 바로 저장돼요.",
      ],
      faq: [
        ["몇 장까지 되나요?", "정해진 제한은 없어요. 다만 수백 장이면 컴퓨터 사양에 따라 시간이 걸릴 수 있어요."],
        ["서류 스캔본을 A4로 맞출 수 있나요?", "네. 페이지 크기를 'A4'로 고르면 모든 사진이 A4 용지에 맞춰 들어가요."],
        ["사진이 업로드되나요?", "아니요. PDF는 내 브라우저 안에서 만들어져요."],
      ],
      ui: { pageSize: "페이지 크기", fit: "사진 크기에 맞춤", a4: "A4", make: "PDF 만들기", outName: "이미지_PDF" },
    },
    en: {
      name: "Image to PDF",
      short: "Combine photos into a single PDF",
      title: "JPG to PDF - Convert Images to PDF Free | BentoTool",
      desc: "Combine photos and scans into one PDF. Reorder pages, choose page size — free and with no uploads.",
      h1: "Images to PDF",
      sub: "Turn many photos into one PDF, in any order.",
      steps: [
        "Add the images you want in your PDF — many at once is fine.",
        "Reorder with ▲▼ and pick a page size.",
        "Click 'Create PDF' and it downloads right away.",
      ],
      faq: [
        ["How many images can I add?", "There's no fixed limit, though hundreds of images may take a while depending on your device."],
        ["Can I fit scans to A4?", "Yes. Choose 'A4' and every image is fitted onto an A4 page."],
        ["Are my images uploaded?", "No. The PDF is created inside your browser."],
      ],
      ui: { pageSize: "Page size", fit: "Fit to image", a4: "A4", make: "Create PDF", outName: "images" },
    },
  },

  {
    slug: "merge-pdf",
    icon: "📚",
    cat: "pdf",
    libs: ["pdflib"],
    ko: {
      name: "PDF 합치기",
      short: "PDF 여러 개를 하나로",
      title: "PDF 합치기 - 여러 PDF 하나로 병합 무료 | 벤토툴",
      desc: "PDF 파일 여러 개를 원하는 순서대로 하나로 합쳐요. 무료, 회원가입 없이, 파일은 업로드되지 않아요.",
      h1: "PDF 합치기",
      sub: "여러 PDF를 원하는 순서대로 하나로.",
      steps: [
        "합칠 PDF 파일들을 올리세요.",
        "▲▼ 버튼으로 순서를 맞추세요.",
        "'PDF 합치기'를 누르면 하나로 합쳐진 PDF가 저장돼요.",
      ],
      faq: [
        ["계약서 같은 중요한 파일도 괜찮나요?", "네. 파일은 서버로 전송되지 않고 내 브라우저 안에서만 합쳐져서 안전해요."],
        ["암호가 걸린 PDF도 되나요?", "암호가 걸린 PDF는 합칠 수 없어요. 암호를 풀고 다시 올려 주세요."],
        ["몇 개까지 합칠 수 있나요?", "정해진 제한은 없어요."],
      ],
      ui: { make: "PDF 합치기", pages: "쪽", encrypted: "열 수 없는 PDF(암호 등)", needTwo: "PDF를 2개 이상 올려 주세요", outName: "합친_PDF" },
    },
    en: {
      name: "Merge PDF",
      short: "Combine multiple PDFs into one",
      title: "Merge PDF - Combine PDF Files Online Free | BentoTool",
      desc: "Merge multiple PDF files into one, in any order. Free, no sign-up, and your files are never uploaded.",
      h1: "Merge PDF Files",
      sub: "Combine PDFs into one, in the order you want.",
      steps: [
        "Add the PDF files you want to merge.",
        "Reorder them with ▲▼.",
        "Click 'Merge PDF' to download the combined file.",
      ],
      faq: [
        ["Is it safe for contracts and sensitive files?", "Yes. Files are merged inside your browser and never sent to any server."],
        ["Can I merge password-protected PDFs?", "No. Remove the password first, then add the file again."],
        ["How many files can I merge?", "There's no fixed limit."],
      ],
      ui: { make: "Merge PDF", pages: "pages", encrypted: "Can't open (password?)", needTwo: "Add at least 2 PDFs", outName: "merged" },
    },
  },

  // ======================= 이미지 (추가) =======================
  {
    slug: "crop-image",
    icon: "🖼️",
    cat: "image",
    libs: ["cropperCss", "cropper"],
    ko: {
      name: "이미지 자르기",
      short: "인스타 1:1, 4:5 등 원하는 비율로 자르기",
      title: "이미지 자르기 - 사진 크롭 1:1·4:5·16:9 무료 | 벤토툴",
      desc: "사진을 원하는 부분만 자르세요. 인스타그램 1:1·4:5, 유튜브 16:9, 릴스 9:16 비율 버튼으로 쉽게. 무료, 업로드 없이.",
      h1: "이미지 자르기",
      sub: "인스타·유튜브 비율로 딱 맞게. 회전·뒤집기도 돼요.",
      steps: [
        "자를 사진을 올리세요.",
        "비율 버튼을 고르고 네모 틀을 끌어서 원하는 부분에 맞추세요.",
        "'자르고 저장'을 누르면 바로 저장돼요.",
      ],
      faq: [
        ["인스타그램에 맞는 비율은 뭔가요?", "피드는 1:1(정사각형)이나 4:5(세로), 릴스·스토리는 9:16이에요."],
        ["화질이 떨어지나요?", "자른 부분은 원본 화질 그대로 저장돼요."],
        ["사진이 업로드되나요?", "아니요. 내 브라우저 안에서만 처리돼요."],
      ],
      ui: { free: "자유", rotate: "↻ 회전", flipH: "⇋ 좌우 반전", save: "자르고 저장", another: "다른 사진", size: "결과 크기" },
    },
    en: {
      name: "Crop Image",
      short: "Crop to 1:1, 4:5, 16:9 or any ratio",
      title: "Crop Image Online - 1:1, 4:5, 16:9 Photo Cropper Free | BentoTool",
      desc: "Crop photos to exactly what you need. One-click ratios for Instagram (1:1, 4:5), YouTube (16:9) and Reels (9:16). Free, no uploads.",
      h1: "Crop Images",
      sub: "Perfect ratios for Instagram and YouTube. Rotate and flip too.",
      steps: [
        "Upload the photo you want to crop.",
        "Pick a ratio and drag the frame over the area you want.",
        "Click 'Crop & save' to download.",
      ],
      faq: [
        ["Which ratio should I use for Instagram?", "Feed posts: 1:1 (square) or 4:5 (portrait). Reels and Stories: 9:16."],
        ["Will the quality drop?", "No. The cropped area keeps the original resolution."],
        ["Is my photo uploaded?", "No. Everything happens in your browser."],
      ],
      ui: { free: "Free", rotate: "↻ Rotate", flipH: "⇋ Flip", save: "Crop & save", another: "Another photo", size: "Output size" },
    },
  },

  {
    slug: "blur-face",
    icon: "🙈",
    cat: "image",
    libs: [],
    ko: {
      name: "얼굴 모자이크",
      short: "사진 속 얼굴을 자동으로 찾아 모자이크",
      title: "얼굴 모자이크 - 사진 얼굴 자동 블러 처리 무료 | 벤토툴",
      desc: "사진 속 얼굴을 AI가 자동으로 찾아 모자이크·블러 처리해요. 직접 영역을 추가할 수도 있어요. 무료, 사진은 업로드되지 않아요.",
      h1: "얼굴 모자이크",
      sub: "AI가 얼굴을 찾아서 자동으로 가려줘요. 번호판·이름표도 직접 추가 가능.",
      steps: [
        "사진을 올리면 AI가 얼굴을 찾아 자동으로 모자이크해요.",
        "빠진 곳은 사진 위를 끌어서 네모를 추가하고, 필요 없는 네모는 ✕로 빼세요.",
        "모자이크·흐림 방식과 강도를 고른 뒤 저장하세요.",
      ],
      faq: [
        ["얼굴을 못 찾으면 어떻게 하나요?", "사진 위를 마우스로 끌어서 가릴 곳을 직접 네모로 그리면 돼요. 번호판, 이름표, 주소도 같은 방법으로 가릴 수 있어요."],
        ["사진이 서버로 가나요?", "아니요. 얼굴 인식도 내 브라우저 안에서 이뤄져서, 민감한 사진도 안심하고 쓸 수 있어요."],
        ["저장한 사진에서 모자이크를 되돌릴 수 있나요?", "아니요. 저장된 사진은 원래 모습으로 되돌릴 수 없게 픽셀이 바뀌어요."],
      ],
      ui: {
        loading: "얼굴 찾는 중…", found: "얼굴 {n}개를 찾았어요", none: "얼굴을 못 찾았어요. 사진 위를 끌어서 직접 추가하세요.",
        mode: "방식", mosaic: "모자이크", blur: "흐림", strength: "강도", save: "저장", another: "다른 사진",
        hint: "사진 위를 끌면 가릴 영역이 추가돼요 · 네모의 ✕로 뺄 수 있어요", redetect: "얼굴 다시 찾기", clearAll: "전부 빼기",
      },
    },
    en: {
      name: "Blur Faces",
      short: "Automatically find and blur faces in photos",
      title: "Blur Face in Photo - Auto Face Blur & Pixelate Free | BentoTool",
      desc: "AI automatically finds faces in your photo and pixelates or blurs them. Add areas manually too. Free, and your photo is never uploaded.",
      h1: "Blur Faces in Photos",
      sub: "AI finds faces and hides them automatically. Add license plates or name tags by hand.",
      steps: [
        "Upload a photo — AI finds faces and blurs them automatically.",
        "Drag on the photo to add areas, or remove boxes with ✕.",
        "Choose pixelate or blur, set strength, and save.",
      ],
      faq: [
        ["What if a face isn't detected?", "Just drag on the photo to draw a box over it. Works for license plates, name tags and addresses too."],
        ["Is my photo sent to a server?", "No. Face detection runs inside your browser, so it's safe for sensitive photos."],
        ["Can the blur be undone from the saved image?", "No. The pixels are permanently changed in the saved file."],
      ],
      ui: {
        loading: "Finding faces…", found: "Found {n} face(s)", none: "No faces found. Drag on the photo to add areas.",
        mode: "Style", mosaic: "Pixelate", blur: "Blur", strength: "Strength", save: "Save", another: "Another photo",
        hint: "Drag on the photo to add an area · Remove boxes with ✕", redetect: "Detect again", clearAll: "Remove all",
      },
    },
  },

  {
    slug: "free-photos",
    icon: "📷",
    cat: "image",
    libs: [],
    ko: {
      name: "무료 사진 찾기",
      short: "상업적으로 써도 되는 무료 이미지 검색",
      title: "무료 이미지 사이트 - 상업용 무료 사진 검색·다운로드 | 벤토툴",
      desc: "블로그·쇼핑몰·광고에 쓸 수 있는 상업용 무료 사진을 검색하고 바로 받으세요. 수억 장의 CC 라이선스 이미지, 출처 문구도 한 번에 복사.",
      h1: "무료 사진 찾기",
      sub: "상업적으로 써도 되는 사진만 골라서 보여줘요.",
      steps: [
        "찾는 사진을 검색하세요. 영어로 검색하면 훨씬 많이 나와요. (예: office, coffee)",
        "마음에 드는 사진을 누르면 크게 보고 라이선스를 확인할 수 있어요.",
        "'다운로드'로 받고, 출처 표시가 필요한 사진은 '출처 문구 복사'로 붙여넣으세요.",
      ],
      faq: [
        ["정말 상업적으로 써도 되나요?", "상업적 이용이 허용된 CC 라이선스 사진만 보여줘요. 다만 CC BY 계열은 출처 표시가 필요하니 '출처 문구 복사'를 써 주세요. CC0·PDM은 출처 표시 없이 써도 돼요."],
        ["사진은 어디서 오나요?", "워드프레스 재단이 운영하는 Openverse를 통해 Flickr, 위키미디어 등 공개 라이선스 이미지를 검색해요."],
        ["한글로 검색해도 되나요?", "되지만 대부분 영어 태그라서, 영어로 검색하면 훨씬 많은 사진이 나와요."],
      ],
      ui: {
        placeholder: "예: coffee, office, 자연", search: "검색", all: "전체", wide: "가로", tall: "세로", square: "정사각형",
        more: "더 보기", none: "검색 결과가 없어요. 영어로 검색해 보세요.", loading: "찾는 중…", error: "검색이 잠시 안 돼요. 잠시 뒤 다시 시도해 주세요.",
        by: "촬영", license: "라이선스", copyCredit: "출처 문구 복사", copied: "✔ 복사됨", source: "원본 페이지", noCredit: "출처 표시 없이 사용 가능",
        needCredit: "사용할 때 출처 표시가 필요해요", tip: "💡 영어로 검색하면 더 많이 나와요",
        chips: [["사무실", "office"], ["커피", "coffee"], ["자연", "nature"], ["비즈니스", "business"], ["음식", "food"], ["도시", "city"], ["하늘", "sky"], ["꽃", "flowers"]],
      },
    },
    en: {
      name: "Free Stock Photos",
      short: "Search free images you can use commercially",
      title: "Free Stock Photos - Search Free Images for Commercial Use | BentoTool",
      desc: "Search and download free photos you can use for blogs, shops and ads. Hundreds of millions of CC-licensed images, with one-click attribution.",
      h1: "Free Stock Photos",
      sub: "Only photos licensed for commercial use.",
      steps: [
        "Search for what you need (e.g. office, coffee).",
        "Click a photo to preview it and check its license.",
        "Download it, and use 'Copy credit' when attribution is required.",
      ],
      faq: [
        ["Can I really use them commercially?", "We only show CC licenses that allow commercial use. CC BY licenses require attribution — use 'Copy credit'. CC0 and Public Domain need no credit."],
        ["Where do the photos come from?", "We search openly licensed images from Flickr, Wikimedia and more through Openverse, run by the WordPress Foundation."],
        ["Is there a download limit?", "No, but please be reasonable — the search is a free public service."],
      ],
      ui: {
        placeholder: "e.g. coffee, office, nature", search: "Search", all: "All", wide: "Landscape", tall: "Portrait", square: "Square",
        more: "Load more", none: "No results. Try another keyword.", loading: "Searching…", error: "Search is unavailable right now. Please try again shortly.",
        by: "by", license: "License", copyCredit: "Copy credit", copied: "✔ Copied", source: "Source page", noCredit: "No attribution required",
        needCredit: "Attribution required", tip: "",
        chips: [["Office", "office"], ["Coffee", "coffee"], ["Nature", "nature"], ["Business", "business"], ["Food", "food"], ["City", "city"], ["Sky", "sky"], ["Flowers", "flowers"]],
      },
    },
  },

  // ======================= PDF (추가) =======================
  {
    slug: "split-pdf",
    icon: "🗂️",
    cat: "pdf",
    libs: ["pdflib", "jszip"],
    ko: {
      name: "PDF 나누기",
      short: "필요한 페이지만 뽑거나 한 장씩 나누기",
      title: "PDF 나누기 - PDF 페이지 분할·추출 무료 | 벤토툴",
      desc: "PDF에서 필요한 페이지만 뽑거나 한 장씩 나눠요. '1-3, 5'처럼 쉽게 지정. 무료, 회원가입 없이, 파일은 업로드되지 않아요.",
      h1: "PDF 나누기",
      sub: "필요한 페이지만 쏙. 한 장씩 나누기도 돼요.",
      steps: [
        "나눌 PDF를 올리세요.",
        "'원하는 페이지만 뽑기'에 1-3, 5처럼 적거나 '한 장씩 모두 나누기'를 고르세요.",
        "버튼을 누르면 바로 저장돼요.",
      ],
      faq: [
        ["페이지는 어떻게 적나요?", "쉼표로 구분하고 범위는 하이픈으로 적어요. 예: 1-3, 5, 8-10"],
        ["한 장씩 나누면 어떻게 받나요?", "모든 페이지가 각각 PDF가 되고, ZIP 파일 하나로 한 번에 받아요."],
        ["중요한 서류도 괜찮나요?", "네. 파일이 서버로 전송되지 않고 내 브라우저에서만 처리돼요."],
      ],
      ui: {
        pages: "쪽", mode: "방식", pick: "원하는 페이지만 뽑기", each: "한 장씩 모두 나누기", range: "페이지", rangePh: "예: 1-3, 5",
        run: "PDF 나누기", bad: "페이지 번호를 확인해 주세요 (1~{n})", encrypted: "열 수 없는 PDF예요 (암호 등)", another: "다른 PDF",
      },
    },
    en: {
      name: "Split PDF",
      short: "Extract pages or split every page",
      title: "Split PDF - Extract Pages from PDF Free | BentoTool",
      desc: "Extract the pages you need or split a PDF into single pages. Simple ranges like '1-3, 5'. Free, no sign-up, no uploads.",
      h1: "Split PDF",
      sub: "Pull out just the pages you need, or split them all.",
      steps: [
        "Add the PDF you want to split.",
        "Type pages like 1-3, 5 — or choose 'Split every page'.",
        "Click the button to download.",
      ],
      faq: [
        ["How do I enter pages?", "Separate with commas and use hyphens for ranges, e.g. 1-3, 5, 8-10"],
        ["How do I get split pages?", "Each page becomes its own PDF, bundled in one ZIP file."],
        ["Is it safe for sensitive documents?", "Yes. Files are never sent to a server."],
      ],
      ui: {
        pages: "pages", mode: "Mode", pick: "Extract pages", each: "Split every page", range: "Pages", rangePh: "e.g. 1-3, 5",
        run: "Split PDF", bad: "Check the page numbers (1–{n})", encrypted: "Can't open this PDF (password?)", another: "Another PDF",
      },
    },
  },

  {
    slug: "pdf-to-jpg",
    icon: "🖨️",
    cat: "pdf",
    libs: ["pdfjs", "jszip"],
    ko: {
      name: "PDF JPG 변환",
      short: "PDF 페이지를 고화질 이미지로",
      title: "PDF JPG 변환 - PDF를 이미지로 바꾸기 무료 | 벤토툴",
      desc: "PDF의 모든 페이지를 JPG·PNG 이미지로 바꿔요. 고화질 선택 가능, 한 번에 ZIP으로. 무료, 업로드 없이.",
      h1: "PDF를 JPG로",
      sub: "PDF 페이지를 고화질 이미지로. 한 번에 모두 받기.",
      steps: [
        "변환할 PDF를 올리세요.",
        "화질과 형식(JPG·PNG)을 고르세요.",
        "페이지별로 받거나 '모두 다운로드'로 한 번에 받으세요.",
      ],
      faq: [
        ["인스타·블로그에 올리기 좋은 화질은?", "'보통'이면 충분해요. 인쇄하거나 글씨를 크게 확대해야 하면 '고화질'을 고르세요."],
        ["JPG와 PNG 중 뭘 골라야 하나요?", "사진이 많으면 JPG, 글자·도표 위주면 PNG가 더 선명해요."],
        ["파일이 업로드되나요?", "아니요. 내 브라우저에서만 변환돼요."],
      ],
      ui: { quality: "화질", normal: "보통", high: "고화질", format: "형식", page: "쪽", rendering: "변환 중… {i}/{n}", another: "다른 PDF", encrypted: "열 수 없는 PDF예요 (암호 등)" },
    },
    en: {
      name: "PDF to JPG",
      short: "Turn PDF pages into high-quality images",
      title: "PDF to JPG - Convert PDF to Images Free | BentoTool",
      desc: "Convert every page of a PDF to JPG or PNG images. Choose high quality and download all as ZIP. Free, no uploads.",
      h1: "PDF to JPG",
      sub: "High-quality images from every page, downloaded in one go.",
      steps: [
        "Add the PDF you want to convert.",
        "Choose quality and format (JPG or PNG).",
        "Download pages one by one or all at once.",
      ],
      faq: [
        ["Which quality should I pick?", "'Normal' is fine for social media and blogs. Choose 'High' for printing or zooming into small text."],
        ["JPG or PNG?", "JPG for photo-heavy pages, PNG for text and diagrams — it's sharper."],
        ["Is my file uploaded?", "No. Conversion happens in your browser."],
      ],
      ui: { quality: "Quality", normal: "Normal", high: "High", format: "Format", page: "Page", rendering: "Converting… {i}/{n}", another: "Another PDF", encrypted: "Can't open this PDF (password?)" },
    },
  },

  {
    slug: "compress-pdf",
    icon: "📉",
    cat: "pdf",
    libs: ["pdfjs", "jspdf"],
    ko: {
      name: "PDF 용량 줄이기",
      short: "스캔 PDF·이미지 많은 PDF 압축",
      title: "PDF 용량 줄이기 - PDF 압축 무료 | 벤토툴",
      desc: "스캔본·사진이 많은 PDF의 용량을 확 줄여요. 이메일 첨부 용량 초과, 제출 서류 용량 제한 해결. 무료, 업로드 없이.",
      h1: "PDF 용량 줄이기",
      sub: "메일 첨부·서류 제출 용량 제한, 이제 걱정 끝.",
      steps: [
        "용량을 줄일 PDF를 올리세요.",
        "압축 강도를 고르세요. 강할수록 더 작아지고 화질은 조금 낮아져요.",
        "'압축하기'를 누르면 줄어든 PDF가 저장돼요.",
      ],
      faq: [
        ["어떤 PDF가 많이 줄어드나요?", "스캔한 서류, 사진이 많은 PDF가 크게 줄어요. 글자만 있는 PDF는 원래 작아서 거의 안 줄어들 수 있어요."],
        ["압축하면 뭐가 달라지나요?", "각 페이지를 이미지로 바꿔 다시 만들어요. 그래서 압축된 PDF에서는 글자를 선택하거나 검색할 수 없어요. 원본은 꼭 따로 보관하세요."],
        ["파일이 업로드되나요?", "아니요. 내 브라우저에서만 압축돼요."],
      ],
      ui: {
        level: "압축 강도", strong: "강하게 (가장 작게)", medium: "보통 (추천)", light: "약하게 (화질 우선)", run: "압축하기",
        working: "압축 중… {i}/{n}쪽", result: "{a} → {b}", notSmaller: "이 PDF는 이미 충분히 작아서 더 줄어들지 않았어요.", another: "다른 PDF",
        note: "※ 압축된 PDF는 글자 선택·검색이 안 돼요. 원본은 따로 보관하세요.", encrypted: "열 수 없는 PDF예요 (암호 등)", download: "압축된 PDF 받기",
      },
    },
    en: {
      name: "Compress PDF",
      short: "Shrink scanned and image-heavy PDFs",
      title: "Compress PDF - Reduce PDF File Size Free | BentoTool",
      desc: "Shrink scanned and image-heavy PDFs to fit email and upload limits. Free, no uploads — right in your browser.",
      h1: "Compress PDF",
      sub: "Beat email attachment and upload size limits.",
      steps: [
        "Add the PDF you want to shrink.",
        "Choose a compression level — stronger means smaller with slightly lower quality.",
        "Click 'Compress' to download the smaller PDF.",
      ],
      faq: [
        ["Which PDFs shrink the most?", "Scanned documents and image-heavy PDFs. Text-only PDFs are already small and may not shrink much."],
        ["What changes after compressing?", "Each page is rebuilt as an image, so text in the compressed PDF can't be selected or searched. Keep your original."],
        ["Is my file uploaded?", "No. Compression happens in your browser."],
      ],
      ui: {
        level: "Level", strong: "Strong (smallest)", medium: "Medium (recommended)", light: "Light (best quality)", run: "Compress",
        working: "Compressing… page {i}/{n}", result: "{a} → {b}", notSmaller: "This PDF is already small, so it didn't get smaller.", another: "Another PDF",
        note: "※ Text in the compressed PDF can't be selected or searched. Keep your original.", encrypted: "Can't open this PDF (password?)", download: "Download compressed PDF",
      },
    },
  },

  // ======================= 동영상·오디오 =======================
  {
    slug: "video-to-mp3",
    icon: "🎵",
    cat: "video",
    libs: ["lamejs"],
    ko: {
      name: "동영상 MP3 추출",
      short: "영상에서 소리만 MP3로",
      title: "동영상 MP3 변환 - MP4에서 소리 추출 무료 | 벤토툴",
      desc: "내 동영상(MP4·MOV·WEBM)에서 소리만 뽑아 MP3로 저장해요. 강의 녹음, 회의 녹화, 브이로그 음악 추출에. 무료, 업로드 없이.",
      h1: "동영상에서 MP3 추출",
      sub: "영상에서 소리만 쏙. 강의·회의 녹화를 오디오로.",
      steps: [
        "소리를 뽑을 동영상을 올리세요.",
        "음질을 고르세요. (보통은 128kbps면 충분해요)",
        "변환이 끝나면 MP3를 받으세요.",
      ],
      faq: [
        ["어떤 영상이 되나요?", "크롬·엣지에서 재생되는 MP4, WEBM, MOV(대부분) 영상이 돼요."],
        ["용량이 큰 영상도 되나요?", "되지만 컴퓨터 메모리를 많이 써요. 1GB 넘는 영상은 느릴 수 있어요."],
        ["영상이 업로드되나요?", "아니요. 내 브라우저에서만 변환돼요."],
      ],
      ui: { bitrate: "음질", decoding: "소리 읽는 중…", encoding: "MP3 만드는 중… {p}%", done: "완료! {size}", fail: "이 영상에서 소리를 읽지 못했어요. 소리가 없거나 지원하지 않는 형식일 수 있어요.", another: "다른 영상" },
    },
    en: {
      name: "Video to MP3",
      short: "Extract audio from video as MP3",
      title: "Video to MP3 - Extract Audio from MP4 Free | BentoTool",
      desc: "Extract the audio from your videos (MP4, MOV, WEBM) and save it as MP3. Great for lectures, meetings and vlogs. Free, no uploads.",
      h1: "Extract MP3 from Video",
      sub: "Pull the audio out of any video — lectures, meetings, vlogs.",
      steps: [
        "Add the video you want the audio from.",
        "Choose the quality (128 kbps is usually plenty).",
        "Download the MP3 when it's done.",
      ],
      faq: [
        ["Which videos work?", "Anything Chrome or Edge can play: MP4, WEBM and most MOV files."],
        ["Do large videos work?", "Yes, but they use a lot of memory. Videos over 1 GB may be slow."],
        ["Is my video uploaded?", "No. Conversion happens in your browser."],
      ],
      ui: { bitrate: "Quality", decoding: "Reading audio…", encoding: "Creating MP3… {p}%", done: "Done! {size}", fail: "Couldn't read audio from this video. It may have no sound or an unsupported format.", another: "Another video" },
    },
  },

  {
    slug: "video-to-gif",
    icon: "🎞️",
    cat: "video",
    libs: [],
    ko: {
      name: "동영상 GIF 만들기",
      short: "영상의 한 장면을 움짤(GIF)로",
      title: "동영상 GIF 변환 - 움짤 만들기 MP4 to GIF 무료 | 벤토툴",
      desc: "동영상에서 원하는 구간을 골라 GIF 움짤로 만들어요. 크기·프레임 조절 가능. 무료, 워터마크 없음, 업로드 없이.",
      h1: "동영상으로 GIF 만들기",
      sub: "원하는 장면만 골라 움짤로. 워터마크 없음.",
      steps: [
        "동영상을 올리세요.",
        "영상을 보면서 시작 위치에서 '지금 위치에서 시작'을 누르고, 길이를 정하세요.",
        "'GIF 만들기'를 누르면 움짤이 만들어져요.",
      ],
      faq: [
        ["GIF 용량을 줄이려면?", "가로 크기를 줄이거나, 초당 프레임을 낮추거나, 길이를 짧게 하면 돼요."],
        ["최대 몇 초까지 되나요?", "15초까지 만들 수 있어요. GIF는 길수록 용량이 매우 커져요."],
        ["워터마크가 있나요?", "없어요."],
      ],
      ui: { start: "시작(초)", setStart: "지금 위치에서 시작", length: "길이(초)", width: "가로 크기", fps: "초당 프레임", make: "GIF 만들기", making: "GIF 만드는 중… {p}%", done: "완료! {size}", download: "GIF 다운로드", another: "다른 영상", fail: "GIF를 만들지 못했어요. 다른 영상으로 시도해 주세요." },
    },
    en: {
      name: "Video to GIF",
      short: "Turn a video clip into a GIF",
      title: "Video to GIF - Convert MP4 to GIF Free, No Watermark | BentoTool",
      desc: "Pick a part of your video and turn it into a GIF. Adjust size and frame rate. Free, no watermark, no uploads.",
      h1: "Make a GIF from Video",
      sub: "Pick the moment, get the GIF. No watermark.",
      steps: [
        "Add your video.",
        "Scrub to the start, click 'Start here', and set the length.",
        "Click 'Make GIF'.",
      ],
      faq: [
        ["How do I make the GIF smaller?", "Lower the width, reduce frames per second, or shorten the clip."],
        ["How long can it be?", "Up to 15 seconds — GIFs get very large quickly."],
        ["Is there a watermark?", "No."],
      ],
      ui: { start: "Start (s)", setStart: "Start here", length: "Length (s)", width: "Width", fps: "FPS", make: "Make GIF", making: "Making GIF… {p}%", done: "Done! {size}", download: "Download GIF", another: "Another video", fail: "Couldn't make the GIF. Please try another video." },
    },
  },

  {
    slug: "compress-video",
    icon: "📦",
    cat: "video",
    libs: [],
    ko: {
      name: "동영상 용량 줄이기",
      short: "카톡·메일로 보내기 좋게 영상 압축",
      title: "동영상 용량 줄이기 - 영상 압축 무료 | 벤토툴",
      desc: "큰 동영상의 해상도와 화질을 조절해 용량을 줄여요. 카톡 전송·메일 첨부 용량 초과 해결. 무료, 업로드 없이 브라우저에서.",
      h1: "동영상 용량 줄이기",
      sub: "카톡·메일 용량 초과 해결. 업로드 없이 내 컴퓨터에서.",
      steps: [
        "줄일 동영상을 올리세요.",
        "해상도와 화질을 고르세요. (720p·보통이면 대부분 충분해요)",
        "'압축하기'를 누르고 끝날 때까지 이 탭을 열어 두세요.",
      ],
      faq: [
        ["얼마나 걸리나요?", "영상 길이만큼 걸려요. 영상을 한 번 재생하면서 새로 만들기 때문이에요. 1분 영상이면 약 1분이에요."],
        ["다른 탭을 봐도 되나요?", "압축하는 동안에는 이 탭을 화면에 켜 두세요. 다른 탭으로 가면 브라우저가 속도를 늦춰서 영상이 끊길 수 있어요."],
        ["영상이 업로드되나요?", "아니요. 내 브라우저에서만 처리돼요."],
      ],
      ui: {
        resolution: "해상도", original: "원본", quality: "화질", high: "높음", medium: "보통", low: "낮음", run: "압축하기",
        working: "압축 중… {p}% (이 탭을 켜 두세요)", done: "완료! {a} → {b}", download: "다운로드", another: "다른 영상",
        unsupported: "이 브라우저에서는 동영상 압축을 지원하지 않아요. 크롬·엣지 최신 버전을 써 주세요.", fail: "압축하지 못했어요. 다른 영상으로 시도해 주세요.", notSmaller: "원본이 이미 작아서 더 줄어들지 않았어요. 해상도나 화질을 낮춰 보세요.",
      },
    },
    en: {
      name: "Compress Video",
      short: "Shrink videos for email and messaging",
      title: "Compress Video - Reduce Video File Size Free | BentoTool",
      desc: "Reduce video file size by adjusting resolution and quality. Fix email and messenger size limits. Free, no uploads — right in your browser.",
      h1: "Compress Video",
      sub: "Beat file size limits — processed on your own device.",
      steps: [
        "Add the video you want to shrink.",
        "Choose resolution and quality (720p · Medium works for most).",
        "Click 'Compress' and keep this tab open until it finishes.",
      ],
      faq: [
        ["How long does it take?", "About as long as the video — it's re-recorded while playing. A 1-minute video takes about a minute."],
        ["Can I switch tabs?", "Keep this tab visible while compressing. Browsers slow down background tabs, which can make the video stutter."],
        ["Is my video uploaded?", "No. Everything happens in your browser."],
      ],
      ui: {
        resolution: "Resolution", original: "Original", quality: "Quality", high: "High", medium: "Medium", low: "Low", run: "Compress",
        working: "Compressing… {p}% (keep this tab open)", done: "Done! {a} → {b}", download: "Download", another: "Another video",
        unsupported: "Video compression isn't supported in this browser. Please use the latest Chrome or Edge.", fail: "Couldn't compress. Please try another video.", notSmaller: "The original is already small. Try a lower resolution or quality.",
      },
    },
  },

  // ======================= 글자·유틸리티 =======================
  {
    slug: "word-counter",
    icon: "🔢",
    cat: "util",
    libs: [],
    ko: {
      name: "글자 수 세기",
      short: "자소서·블로그 글자 수, 공백 포함/제외",
      title: "글자 수 세기 - 자소서 글자수 세기 공백 포함·제외 | 벤토툴",
      desc: "자기소개서, 블로그, 과제 글자 수를 바로 세요. 공백 포함·제외, 바이트, 단어 수, 원고지 매수까지. 목표 글자 수 설정도 돼요.",
      h1: "글자 수 세기",
      sub: "자소서·블로그·과제. 공백 포함/제외, 바이트까지 한 번에.",
      steps: [
        "글을 붙여넣거나 바로 쓰세요.",
        "공백 포함·제외 글자 수, 바이트, 단어 수가 바로 보여요.",
        "목표 글자 수를 적으면 얼마나 남았는지 알려줘요.",
      ],
      faq: [
        ["자소서는 공백 포함인가요, 제외인가요?", "회사마다 달라요. 대부분의 채용 사이트는 '공백 포함'으로 세지만, 공고에 적힌 기준을 꼭 확인하세요."],
        ["바이트는 어떻게 세나요?", "두 가지로 보여줘요. 한글 2바이트 기준(옛 방식, 일부 채용 사이트)과 한글 3바이트 기준(UTF-8, NEIS 등)이에요."],
        ["쓴 글이 저장되나요?", "서버에는 저장되지 않아요. 실수로 창을 닫아도 되살릴 수 있게 내 브라우저에만 임시로 남겨 둬요."],
      ],
      ui: {
        placeholder: "여기에 글을 붙여넣거나 쓰세요…", withSpace: "공백 포함", noSpace: "공백 제외", bytes2: "바이트 (한글 2)", bytes3: "바이트 (UTF-8)",
        words: "단어", lines: "줄", paragraphs: "문단", manuscript: "원고지(200자)", reading: "읽는 시간", minutes: "분", seconds: "초", unit: "자", sheets: "매",
        goal: "목표 글자 수", goalPh: "예: 1000", left: "{n}자 남았어요", over: "{n}자 넘었어요", copy: "복사", clear: "지우기", copied: "✔ 복사됨",
      },
    },
    en: {
      name: "Word Counter",
      short: "Count words, characters and more",
      title: "Word Counter - Count Words & Characters Online Free | BentoTool",
      desc: "Count words, characters (with and without spaces), sentences, paragraphs and reading time instantly. Set a target length for essays and posts.",
      h1: "Word & Character Counter",
      sub: "Words, characters, sentences and reading time — instantly.",
      steps: [
        "Paste or type your text.",
        "Word, character and sentence counts update as you type.",
        "Set a goal to see how much is left.",
      ],
      faq: [
        ["Does it count spaces?", "It shows both: characters with spaces and without spaces."],
        ["How is reading time calculated?", "Based on an average reading speed of about 200 words per minute."],
        ["Is my text saved?", "Never on a server. A draft is kept only in your browser so you don't lose it if you close the tab."],
      ],
      ui: {
        placeholder: "Paste or type your text here…", withSpace: "Characters", noSpace: "No spaces", bytes2: "Bytes (2/CJK)", bytes3: "Bytes (UTF-8)",
        words: "Words", lines: "Lines", paragraphs: "Paragraphs", manuscript: "Sentences", reading: "Reading time", minutes: "min", seconds: "s", unit: "", sheets: "",
        goal: "Target length", goalPh: "e.g. 500", left: "{n} to go", over: "{n} over", copy: "Copy", clear: "Clear", copied: "✔ Copied",
      },
    },
  },

  {
    slug: "qr-code",
    icon: "🔳",
    cat: "util",
    libs: ["qrcode"],
    ko: {
      name: "QR코드 만들기",
      short: "링크·와이파이 QR코드를 색상까지 자유롭게",
      title: "QR코드 만들기 - 무료 QR코드 생성기 (링크·와이파이) | 벤토툴",
      desc: "링크, 글, 와이파이 QR코드를 무료로 만드세요. 색상·크기 조절, PNG·SVG 다운로드. 유효기간 없이 영구 사용, 워터마크 없음.",
      h1: "QR코드 만들기",
      sub: "링크·와이파이 QR을 무료로, 기한 없이 영구히.",
      steps: [
        "링크나 글을 입력하세요. 와이파이 탭에서는 이름과 비밀번호를 넣으세요.",
        "색상과 크기를 고르면 미리보기가 바로 바뀌어요.",
        "PNG(일반용)나 SVG(인쇄용)로 받으세요.",
      ],
      faq: [
        ["QR코드에 유효기간이 있나요?", "없어요. 여기서 만든 QR코드는 내용이 코드 안에 직접 들어 있어서 영원히 작동해요. (링크 주소 자체가 사라지면 그 링크는 안 열려요)"],
        ["인쇄용은 어떤 걸 받나요?", "SVG를 받으세요. 아무리 크게 인쇄해도 깨지지 않아요."],
        ["색을 바꿔도 잘 찍히나요?", "배경은 밝게, 코드는 진하게 해야 잘 찍혀요. 반대로 하면 못 읽는 휴대폰이 있어요."],
      ],
      ui: {
        tabText: "링크·글", tabWifi: "와이파이", textPh: "https://… 또는 아무 글", ssid: "와이파이 이름", password: "비밀번호", security: "보안",
        none: "없음", fg: "코드 색", bg: "배경 색", size: "크기", png: "PNG 다운로드", svg: "SVG 다운로드", empty: "내용을 입력하면 QR코드가 나타나요", tooLong: "내용이 너무 길어요",
      },
    },
    en: {
      name: "QR Code Generator",
      short: "Link and Wi-Fi QR codes in any color",
      title: "QR Code Generator - Free QR Codes for Links & Wi-Fi | BentoTool",
      desc: "Create QR codes for links, text and Wi-Fi for free. Custom colors and size, PNG and SVG download. Never expires, no watermark.",
      h1: "QR Code Generator",
      sub: "Link and Wi-Fi QR codes — free and they never expire.",
      steps: [
        "Enter a link or text. For Wi-Fi, enter the network name and password.",
        "Pick colors and size — the preview updates instantly.",
        "Download PNG (everyday) or SVG (print).",
      ],
      faq: [
        ["Do these QR codes expire?", "Never. The content is encoded directly in the code, so it works forever (as long as the link itself still exists)."],
        ["Which format is best for printing?", "SVG — it stays sharp at any size."],
        ["Will colored codes still scan?", "Keep the background light and the code dark. Inverted colors fail on some phones."],
      ],
      ui: {
        tabText: "Link / text", tabWifi: "Wi-Fi", textPh: "https://… or any text", ssid: "Network name", password: "Password", security: "Security",
        none: "None", fg: "Code color", bg: "Background", size: "Size", png: "Download PNG", svg: "Download SVG", empty: "Type something to see your QR code", tooLong: "Content is too long",
      },
    },
  },
];
