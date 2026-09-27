// 사이트 문구(한국어·영어)와 도구 목록.
// 도구를 추가할 때: tools 배열에 항목 하나 + src/assets/tools/<slug>.js 파일 하나.

export const site = {
  ko: {
    langLabel: "한국어",
    switchLabel: "English",
    home: {
      title: "벤토툴 - 무료 온라인 파일 도구 모음 | 배경 제거·이미지 압축·PDF 변환",
      desc: "배경 제거, 이미지 용량 줄이기, 크기 조절, 형식 변환, PDF 만들기·합치기를 무료로. 회원가입 없이, 파일은 서버로 전송되지 않고 내 브라우저에서 바로 처리돼요.",
      h1: "필요한 파일 도구,<br><em>한 도시락</em>에 다 담았어요",
      sub: "배경 제거부터 PDF 합치기까지. 전부 무료, 회원가입 없이, 파일은 내 컴퓨터 밖으로 나가지 않아요.",
      toolsTitle: "모든 도구",
      features: [
        ["🔒", "업로드 없음", "모든 처리가 내 브라우저 안에서 이뤄져요. 파일이 어디로도 전송되지 않아요."],
        ["⚡", "기다림 없음", "서버 대기열이 없어서 올리자마자 바로 처리돼요."],
        ["💸", "완전 무료", "회원가입도, 횟수 제한도, 워터마크도 없어요."],
      ],
    },
    cats: { image: "이미지 도구", pdf: "PDF 도구" },
    nav: { tools: "모든 도구" },
    how: "사용 방법",
    faq: "자주 묻는 질문",
    related: "다른 도구도 써보세요",
    footer: {
      privacy: "개인정보처리방침",
      note: "모든 파일은 브라우저 안에서만 처리되며 어디에도 저장되지 않습니다.",
    },
    privacy: {
      title: "개인정보처리방침 | 벤토툴",
      desc: "벤토툴 개인정보처리방침",
      h1: "개인정보처리방침",
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
<p>일부 도구는 기능 실행에 필요한 프로그램 파일(AI 모델 등)을 공개 CDN에서 내려받습니다. 이때 이용자의 파일은 전송되지 않습니다.</p>
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
      title: "BentoTool - Free Online File Tools | Remove Background, Compress Images, PDF",
      desc: "Remove backgrounds, compress, resize and convert images, create and merge PDFs — free, no sign-up. Files never leave your browser.",
      h1: "Every file tool you need,<br><em>packed in one box</em>",
      sub: "From background removal to PDF merging. Free, no sign-up, and your files never leave your device.",
      toolsTitle: "All tools",
      features: [
        ["🔒", "No uploads", "Everything runs inside your browser. Your files are never sent anywhere."],
        ["⚡", "No waiting", "No server queues — processing starts the moment you drop a file."],
        ["💸", "Totally free", "No sign-up, no limits, no watermarks."],
      ],
    },
    cats: { image: "Image tools", pdf: "PDF tools" },
    nav: { tools: "All tools" },
    how: "How to use",
    faq: "FAQ",
    related: "Try other tools",
    footer: {
      privacy: "Privacy Policy",
      note: "All files are processed in your browser and never stored anywhere.",
    },
    privacy: {
      title: "Privacy Policy | BentoTool",
      desc: "BentoTool privacy policy",
      h1: "Privacy Policy",
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
<p>Some tools download program files (such as AI models) from public CDNs. Your files are not transmitted when this happens.</p>
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
];
