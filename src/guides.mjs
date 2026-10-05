// 도구별 안내 글 (도구 아래 "이 도구로 할 수 있는 일"·"팁" 영역).
// 사용 방법(steps)·자주 묻는 질문(faq)은 content.mjs에 있고, 여기 faq는 그 뒤에 덧붙여져요.
// 문구는 src/assets/tools/<slug>.js 실제 동작과 맞춰 적었어요. 기능을 바꾸면 여기도 같이 고치세요.

export const guides = {
  "remove-background": {
    ko: {
      intro: "사진에서 사람·상품·동물 같은 주인공만 남기고 배경을 자동으로 지우는 도구예요. 쇼핑몰 상품 사진, 프로필 사진, 썸네일용 '누끼'가 필요할 때 쓰면 돼요. 결과는 투명 배경 PNG로 받거나, 원하는 단색 배경을 깔아 JPG로 받을 수 있어요. AI 모델이 내 브라우저 안에서 돌아가기 때문에 사진이 서버로 올라가지 않아요.",
      faq: [["배경색을 넣으면 어떤 형식으로 저장되나요?", "투명을 고르면 PNG, 배경색을 고르면 그 색을 깐 JPG로 저장돼요. 해상도는 원본과 같아요."]],
      tips: [
        "주인공과 배경의 색이 뚜렷하게 다를수록 경계가 깔끔해요.",
        "머리카락·털처럼 가는 부분은 완벽하지 않을 수 있어요. 결과 화면에서 마우스를 움직여 원본과 비교해 보세요.",
        "처음 한 번은 AI 모델을 내려받느라 시간이 걸려요. 같은 브라우저에서 다시 쓰면 더 빨라요.",
      ],
    },
    en: {
      intro: "This tool keeps the main subject of a photo — a person, product or pet — and removes the background automatically. It's handy for product shots, profile pictures and thumbnails. Download the result as a transparent PNG, or add a solid background color and save it as a JPG. The AI model runs inside your browser, so your photo is never uploaded.",
      faq: [["What format do I get with a background color?", "Transparent saves as PNG; a background color saves as JPG with that color filled in. The resolution matches the original."]],
      tips: [
        "Clear contrast between subject and background gives the cleanest edges.",
        "Fine details like hair or fur may not be perfect — move your mouse over the result to compare with the original.",
        "The first run downloads the AI model, so it's slower. It's quicker afterwards in the same browser.",
      ],
    },
  },

  "compress-image": {
    ko: {
      intro: "사진의 가로세로 크기는 그대로 두고(원하면 줄이고) 저장 품질을 조절해 파일 용량을 줄이는 도구예요. 블로그·쇼핑몰 업로드 용량 제한, 메일 첨부, 홈페이지 속도 개선에 쓰면 좋아요. 여러 장을 한꺼번에 올리면 한 장씩 차례로 압축되고, 결과는 JPG 또는 WEBP로 저장돼요.",
      faq: [["압축했는데 오히려 커지면요?", "원본과 같은 형식·같은 크기인데 결과가 더 크면, 자동으로 원본을 그대로 돌려줘요. 품질 값을 낮추거나 '최대 가로 크기'를 줄여 보세요."]],
      tips: [
        "품질 60~80 정도면 대부분 눈으로 차이를 느끼기 어려워요. (기본값 70)",
        "휴대폰 사진은 '최대 가로 크기'를 1920px나 1280px로 줄이면 용량이 훨씬 많이 줄어요.",
        "JPG로 저장하면 투명한 부분은 흰색이 돼요. 투명 배경을 지키려면 WEBP를 고르세요.",
      ],
    },
    en: {
      intro: "This tool reduces file size by adjusting save quality — and optionally the maximum width — while keeping your photos looking the same. Use it for upload limits on blogs and shops, email attachments, or faster web pages. Drop many images at once; they're compressed one after another and saved as JPG or WEBP.",
      faq: [["What if the result is bigger than the original?", "If the format and size are unchanged and the result is larger, the original is returned as is. Try a lower quality or a smaller max width."]],
      tips: [
        "Quality between 60 and 80 is usually indistinguishable to the eye (the default is 70).",
        "For phone photos, setting max width to 1920px or 1280px shrinks files far more.",
        "JPG turns transparent areas white. Choose WEBP to keep transparency.",
      ],
    },
  },

  "resize-image": {
    ko: {
      intro: "사진의 가로·세로 픽셀 크기를 바꾸는 도구예요. 비율(%)로 한 번에 줄이거나, 가로 폭을 픽셀로 정해서 여러 장을 같은 폭으로 맞출 수 있어요. 세로는 원래 비율에 맞춰 자동으로 계산되기 때문에 사진이 찌그러지지 않아요. PNG·WEBP는 같은 형식으로, 그 밖의 형식은 JPG로 저장돼요.",
      faq: [["작은 사진을 크게 늘려도 되나요?", "100%보다 큰 값을 넣으면 늘어나긴 하지만, 없던 디테일이 생기지는 않아서 흐릿해 보일 수 있어요."]],
      tips: [
        "블로그·상세페이지용이라면 가로 1000~1280px 정도가 무난해요.",
        "파일 이름 뒤에 결과 크기(예: _1280x960)가 붙어서 원본과 헷갈리지 않아요.",
        "용량까지 줄이고 싶다면 크기 조절 뒤 '이미지 용량 줄이기'를 한 번 더 써 보세요.",
      ],
    },
    en: {
      intro: "This tool changes the pixel dimensions of your images. Scale them by a percentage, or set a width in pixels to make a batch of photos the same width. Height is calculated from the original aspect ratio, so nothing gets stretched. PNG and WEBP keep their format; other formats are saved as JPG.",
      faq: [["Can I enlarge small images?", "Values above 100% will enlarge them, but no new detail is created, so they may look soft."]],
      tips: [
        "For blogs and product pages, a width of 1000–1280px works well.",
        "The output size is added to the file name (e.g. _1280x960), so you won't mix it up with the original.",
        "To cut file size too, run the result through 'Compress Image'.",
      ],
    },
  },

  "convert-image": {
    ko: {
      intro: "이미지 파일 형식을 JPG, PNG, WEBP 중 원하는 것으로 바꾸는 도구예요. 인터넷에서 받은 WEBP가 안 열릴 때, 업로드 사이트가 JPG만 받을 때, 투명 배경이 필요한 PNG로 바꿀 때 쓰면 돼요. 가로세로 크기는 원본 그대로이고, 여러 장을 한꺼번에 바꿀 수 있어요.",
      faq: [],
      tips: [
        "사진은 JPG, 로고·스크린샷·투명 배경은 PNG가 잘 어울려요.",
        "WEBP는 같은 화질에서 용량이 작아서 홈페이지용으로 좋아요.",
        "JPG·WEBP는 약간의 압축이 들어가요. 화질 손실 없이 보관하려면 PNG를 고르세요.",
      ],
    },
    en: {
      intro: "This tool converts images between JPG, PNG and WEBP. Use it when a downloaded WEBP won't open, when a site only accepts JPG, or when you need a PNG with transparency. Dimensions stay the same, and you can convert many images at once.",
      faq: [],
      tips: [
        "JPG suits photos; PNG suits logos, screenshots and transparent images.",
        "WEBP gives smaller files at similar quality — great for websites.",
        "JPG and WEBP apply light compression. Choose PNG for lossless storage.",
      ],
    },
  },

  "image-to-pdf": {
    ko: {
      intro: "사진이나 스캔 이미지 여러 장을 순서대로 묶어 PDF 한 파일로 만드는 도구예요. 영수증·서류 사진 제출, 과제 스캔본 정리, 포트폴리오 묶기에 쓰면 편해요. 페이지 크기는 '사진 크기에 맞춤' 또는 'A4'(여백을 두고 가운데 배치) 중에서 고를 수 있어요.",
      faq: [["PDF 용량이 너무 커요.", "아주 큰 사진은 긴 변이 2500px가 되도록 자동으로 줄여 넣지만, 장수가 많으면 커질 수 있어요. 먼저 '이미지 용량 줄이기'로 사진을 줄인 뒤 만들어 보세요."]],
      tips: [
        "서류 제출용이면 'A4'를 고르면 인쇄했을 때 크기가 딱 맞아요.",
        "사진은 PDF 안에 JPG로 들어가요. 투명한 부분은 흰색이 돼요.",
        "올린 순서가 곧 페이지 순서예요. 만들기 전에 ▲▼로 확인하세요.",
      ],
    },
    en: {
      intro: "This tool combines photos or scanned images into a single PDF, in the order you choose. It's useful for submitting receipts and documents, tidying up scanned homework, or bundling a portfolio. Choose a page size: 'Fit to image' or 'A4' (centered with a margin).",
      faq: [["My PDF is too large.", "Very large images are scaled so the long side is 2500px, but many pages can still add up. Shrink them first with 'Compress Image'."]],
      tips: [
        "Choose 'A4' for documents you'll print or submit.",
        "Images are stored as JPG inside the PDF, so transparent areas become white.",
        "The list order is the page order — check it with ▲▼ before creating.",
      ],
    },
  },

  "merge-pdf": {
    ko: {
      intro: "PDF 파일 여러 개를 원하는 순서대로 이어 붙여 하나의 PDF로 만드는 도구예요. 계약서와 첨부 서류 합치기, 여러 장으로 나뉜 스캔본 정리에 쓰면 돼요. 페이지를 그대로 옮겨 붙이는 방식이라 글자 선택·검색이 그대로 되고 화질도 바뀌지 않아요.",
      faq: [],
      tips: [
        "파일을 올리면 각 파일의 쪽수가 옆에 표시돼요. '열 수 없는 PDF'로 나오면 암호를 먼저 풀어 주세요.",
        "합친 뒤 일부 페이지만 필요하면 'PDF 나누기'로 뽑아낼 수 있어요.",
        "결과 용량은 원본들을 더한 정도예요. 너무 크면 'PDF 용량 줄이기'를 써 보세요.",
      ],
    },
    en: {
      intro: "This tool joins multiple PDF files into one, in the order you want. Use it to combine a contract with its attachments or tidy up scans split across files. Pages are copied as they are, so text stays selectable and searchable and quality doesn't change.",
      faq: [],
      tips: [
        "Each file shows its page count after you add it. If it says 'Can't open', remove the password first.",
        "Need only some pages afterwards? Use 'Split PDF'.",
        "The result is roughly the sum of the originals. If it's too big, try 'Compress PDF'.",
      ],
    },
  },

  "crop-image": {
    ko: {
      intro: "사진에서 원하는 부분만 잘라내는 도구예요. 1:1, 4:5, 3:4, 16:9, 9:16 비율 버튼이 있어서 인스타그램 피드·릴스, 유튜브 썸네일 크기에 바로 맞출 수 있고, '자유'를 고르면 마음대로 자를 수 있어요. 90도 회전과 좌우 반전도 함께 돼요.",
      faq: [],
      tips: [
        "아래쪽 '결과 크기'에 잘릴 사진의 픽셀 크기가 실시간으로 보여요.",
        "PNG·WEBP는 같은 형식으로, 그 밖의 사진은 JPG로 저장돼요.",
        "유튜브 썸네일은 16:9로 자르고, 크기까지 맞추려면 '이미지 크기 조절'에서 가로 1280px로 바꾸세요.",
      ],
    },
    en: {
      intro: "This tool crops just the part of a photo you want. Ratio buttons — 1:1, 4:5, 3:4, 16:9 and 9:16 — match Instagram posts and Reels or YouTube thumbnails instantly, and 'Free' lets you crop any shape. You can also rotate by 90° and flip horizontally.",
      faq: [],
      tips: [
        "The 'Output size' below shows the pixel size of the crop in real time.",
        "PNG and WEBP keep their format; other images are saved as JPG.",
        "For YouTube thumbnails, crop to 16:9, then set the width to 1280px with 'Resize Image'.",
      ],
    },
  },

  "blur-face": {
    ko: {
      intro: "사진 속 얼굴을 AI가 찾아 모자이크나 흐림으로 가려 주는 도구예요. 블로그·SNS에 행사 사진을 올리거나 후기 캡처를 공유할 때 다른 사람 얼굴을 가리는 데 쓰면 돼요. 얼굴 말고도 차량 번호판, 이름표, 주소처럼 가리고 싶은 곳은 사진 위를 끌어서 직접 추가할 수 있어요.",
      faq: [["모든 얼굴을 다 찾아 주나요?", "아니요. 옆모습, 아주 작거나 가려진 얼굴은 놓칠 수 있어요. 저장하기 전에 꼭 눈으로 확인하고, 빠진 곳은 직접 네모를 그려 주세요."]],
      tips: [
        "강도를 높일수록 모자이크 칸이 커지고 흐림이 강해져요.",
        "저장 파일은 원본 형식(PNG·WEBP)을 따르고, 그 밖의 사진은 JPG로 저장돼요.",
        "AI 인식 프로그램은 처음에 공개 CDN에서 내려받지만, 사진 자체는 어디로도 보내지 않아요.",
      ],
    },
    en: {
      intro: "This tool uses AI to find faces in a photo and hide them with pixelation or blur. It's useful when posting event photos or sharing screenshots without exposing other people. Beyond faces, you can drag on the photo to cover license plates, name tags or addresses.",
      faq: [["Does it find every face?", "Not always. Profiles and very small or partly hidden faces can be missed. Always check before saving and draw boxes over anything it missed."]],
      tips: [
        "Higher strength means bigger mosaic blocks and a stronger blur.",
        "PNG and WEBP keep their format; other photos are saved as JPG.",
        "The face detection program is downloaded from a public CDN, but your photo itself is never sent anywhere.",
      ],
    },
  },

  "free-photos": {
    ko: {
      intro: "블로그·쇼핑몰·발표 자료에 쓸 수 있는 무료 사진을 찾아 주는 검색 도구예요. 워드프레스 재단이 운영하는 Openverse에서 '상업적 이용 가능' 라이선스 사진만 골라 보여줘요. 사진을 누르면 촬영자, 크기, 라이선스와 출처 표시가 필요한지가 함께 나와요.",
      faq: [["이 도구도 파일이 밖으로 안 나가나요?", "이 도구는 파일을 다루지 않아요. 대신 입력한 검색어가 Openverse로 전송돼 결과를 받아와요. 사진은 원래 올라가 있는 사이트(Flickr, 위키미디어 등)에서 직접 내려받아요."]],
      tips: [
        "사용하기 전에 라이선스 링크를 한 번 더 확인하세요. 라이선스 정보는 원본 사이트에 적힌 내용을 따라요.",
        "사진 속에 사람 얼굴이나 상표가 크게 나오면, 광고에 쓸 때 초상권·상표권은 따로 확인이 필요할 수 있어요.",
        "다운로드가 안 되면 원본 사이트가 직접 받기를 막은 경우라 새 탭으로 열려요. 거기서 저장하면 돼요.",
      ],
    },
    en: {
      intro: "This is a search tool for free photos you can use on blogs, shops and presentations. It shows only images licensed for commercial use, from Openverse (run by the WordPress Foundation). Click a photo to see the creator, size, license, and whether attribution is required.",
      faq: [["Does this tool send anything out?", "It doesn't handle your files. Your search keywords are sent to Openverse to get results, and photos are downloaded directly from the sites that host them (Flickr, Wikimedia, etc.)."]],
      tips: [
        "Check the license link before using a photo — license details come from the original source.",
        "If a photo prominently shows people or trademarks, advertising use may need separate permission.",
        "If a download fails, the source site blocks direct downloads, so the image opens in a new tab where you can save it.",
      ],
    },
  },

  "split-pdf": {
    ko: {
      intro: "PDF에서 필요한 페이지만 골라 새 PDF로 만들거나, 모든 페이지를 한 장씩 따로 나누는 도구예요. 긴 서류에서 제출할 부분만 뽑을 때, 여러 사람 서류가 한 파일로 스캔됐을 때 쓰면 돼요. 페이지를 그대로 복사하는 방식이라 글자와 화질이 바뀌지 않아요.",
      faq: [["적은 순서대로 페이지가 들어가나요?", "네. '5, 1-3'처럼 적으면 5쪽, 1쪽, 2쪽, 3쪽 순서로 들어가요. 같은 쪽을 두 번 적으면 한 번만 들어가요."]],
      tips: [
        "올리면 전체 쪽수가 표시되니 범위를 적기 전에 확인하세요.",
        "'한 장씩 모두 나누기'는 파일이름_1.pdf, 파일이름_2.pdf… 형태로 ZIP 하나에 담겨요.",
        "암호가 걸린 PDF는 열리지 않아요. 암호를 먼저 풀어 주세요.",
      ],
    },
    en: {
      intro: "This tool pulls the pages you need into a new PDF, or splits every page into its own file. Use it to extract just the part you need to submit, or to separate documents that were scanned into one file. Pages are copied as they are, so text and quality don't change.",
      faq: [["Are pages added in the order I type?", "Yes. '5, 1-3' gives pages 5, 1, 2, 3 in that order. A page listed twice is included once."]],
      tips: [
        "The total page count is shown after upload — check it before typing ranges.",
        "'Split every page' produces name_1.pdf, name_2.pdf… bundled in one ZIP.",
        "Password-protected PDFs can't be opened. Remove the password first.",
      ],
    },
  },

  "pdf-to-jpg": {
    ko: {
      intro: "PDF의 모든 페이지를 한 장씩 JPG나 PNG 이미지로 바꾸는 도구예요. PDF 자료를 카톡·SNS에 올리거나, 발표 자료 일부를 이미지로 쓰거나, 상세페이지에 넣을 때 편해요. 변환이 끝나면 페이지별 미리보기가 나오고, 한 장씩 받거나 ZIP으로 한 번에 받을 수 있어요.",
      faq: [["'보통'과 '고화질'은 얼마나 다른가요?", "'고화질'은 '보통'보다 가로세로가 2배 커요. 대신 파일 용량도 커지고 변환 시간이 더 걸려요."]],
      tips: [
        "각 미리보기 아래에 이미지 픽셀 크기가 적혀 있어서 결과 크기를 바로 확인할 수 있어요.",
        "페이지가 많으면 변환에 시간이 걸려요. 진행 표시가 끝날 때까지 기다려 주세요.",
        "필요한 페이지만 이미지로 바꾸려면 'PDF 나누기'로 먼저 뽑은 뒤 변환하세요.",
      ],
    },
    en: {
      intro: "This tool turns every page of a PDF into a JPG or PNG image. It's handy for posting PDF content on social media, reusing slides as images, or adding pages to a web page. When it's done you'll see a preview of each page and can download them one by one or all at once as a ZIP.",
      faq: [["How different are 'Normal' and 'High'?", "'High' is twice the width and height of 'Normal'. Files are larger and conversion takes longer."]],
      tips: [
        "The pixel size of each image is shown under its preview.",
        "Long PDFs take a while — wait until the progress bar finishes.",
        "To convert only certain pages, extract them first with 'Split PDF'.",
      ],
    },
  },

  "compress-pdf": {
    ko: {
      intro: "스캔본이나 사진이 많은 PDF의 용량을 줄이는 도구예요. 각 페이지를 이미지로 다시 그려 압축해서 새 PDF로 만드는 방식이라, 메일 첨부·서류 제출 용량 제한에 걸렸을 때 효과가 커요. 압축 강도는 강하게·보통·약하게 세 가지이고, 결과 화면에서 전후 용량을 바로 보여줘요.",
      faq: [["결과가 원본보다 크면 어떻게 되나요?", "압축본이 더 크면 원본 파일을 그대로 받게 되고, 더 줄어들지 않았다는 안내가 나와요."]],
      tips: [
        "처음에는 '보통'으로 해 보고, 그래도 크면 '강하게'로 다시 해 보세요.",
        "압축된 PDF는 글자 선택·검색과 링크가 사라져요. 원본은 꼭 따로 보관하세요.",
        "글자만 있는 PDF는 원래 작아서 이 방식으로는 잘 안 줄어요.",
      ],
    },
    en: {
      intro: "This tool shrinks scanned and image-heavy PDFs. Each page is redrawn as a compressed image and rebuilt into a new PDF, which works well when you hit email or upload size limits. Choose Strong, Medium or Light, and the result screen shows the before and after size.",
      faq: [["What if the result is bigger?", "If compression doesn't help, you get the original file back with a note saying it didn't get smaller."]],
      tips: [
        "Start with 'Medium' and switch to 'Strong' if it's still too large.",
        "Compressed PDFs lose selectable text, search and links — keep your original.",
        "Text-only PDFs are already small and usually won't shrink this way.",
      ],
    },
  },

  "video-to-mp3": {
    ko: {
      intro: "동영상 파일에서 소리만 뽑아 MP3로 저장하는 도구예요. 강의·회의 녹화본을 오디오로 들을 때, 브이로그 배경 소리를 따로 쓸 때 편해요. 음질은 96·128·192·320kbps 중에서 고를 수 있고, 변환이 끝나면 바로 들어 보고 받을 수 있어요. 오디오 파일을 올려 MP3로 바꾸는 것도 돼요.",
      faq: [["유튜브 영상 주소로도 되나요?", "아니요. 내 컴퓨터나 휴대폰에 있는 영상 파일만 올릴 수 있어요. 저작권이 있는 콘텐츠는 권리자의 허락 범위 안에서만 써 주세요."]],
      tips: [
        "말소리 위주라면 96~128kbps, 음악이라면 192kbps 이상이 좋아요.",
        "스테레오까지 저장돼요. 채널이 더 많은 영상은 앞의 두 채널만 들어가요.",
        "긴 영상은 소리를 한꺼번에 메모리에 읽어서 느릴 수 있어요. 다른 프로그램을 닫고 해 보세요.",
      ],
    },
    en: {
      intro: "This tool extracts the audio from a video file and saves it as MP3. It's handy for listening to recorded lectures or meetings, or reusing the sound from a vlog. Choose 96, 128, 192 or 320 kbps, then preview and download the result. Audio files can be converted to MP3 too.",
      faq: [["Can I use a YouTube link?", "No. Only video files on your own device can be added. Use copyrighted content only as the rights holder allows."]],
      tips: [
        "96–128 kbps is fine for speech; use 192 kbps or higher for music.",
        "Output is up to stereo — videos with more channels keep the first two.",
        "Long videos are decoded into memory at once and may be slow. Close other apps if needed.",
      ],
    },
  },

  "video-to-gif": {
    ko: {
      intro: "동영상에서 원하는 장면을 골라 움짤(GIF)로 만드는 도구예요. 상품 사용 장면, 짧은 리액션, 설명용 화면 녹화를 블로그·메신저에 넣을 때 쓰면 좋아요. 시작 위치, 길이(최대 15초), 가로 크기(240~640px), 초당 프레임(8~20)을 정할 수 있고 워터마크는 붙지 않아요.",
      faq: [["GIF에 소리도 들어가나요?", "아니요. GIF 형식은 소리를 담을 수 없어서 화면만 들어가요."]],
      tips: [
        "영상을 재생하다 원하는 장면에서 멈추고 '지금 위치에서 시작'을 누르면 편해요.",
        "메신저용은 가로 320~480px, 초당 10프레임이면 용량과 부드러움이 적당해요.",
        "GIF는 한 장면에 최대 256색만 쓸 수 있어서, 색이 화려한 영상은 원본보다 거칠어 보일 수 있어요.",
      ],
    },
    en: {
      intro: "This tool turns a moment from a video into a GIF. Use it for product demos, short reactions or screen recordings in blogs and chats. Set the start point, length (up to 15 seconds), width (240–640px) and frames per second (8–20). No watermark is added.",
      faq: [["Does the GIF include sound?", "No. The GIF format can't store audio, so only the picture is kept."]],
      tips: [
        "Pause the video at the moment you want and click 'Start here'.",
        "For chats, 320–480px wide at 10 fps balances size and smoothness.",
        "GIFs use at most 256 colors per frame, so colorful videos can look rougher than the original.",
      ],
    },
  },

  "compress-video": {
    ko: {
      intro: "동영상의 해상도와 화질(비트레이트)을 낮춰 용량을 줄이는 도구예요. 카톡·메일 용량 초과, 업로드 제한에 걸렸을 때 쓰면 돼요. 브라우저가 영상을 한 번 재생하면서 새로 녹화하는 방식이라, 따로 프로그램을 설치하지 않아도 내 컴퓨터 안에서 처리돼요.",
      faq: [["결과 파일 형식은 뭔가요?", "브라우저가 지원하면 MP4로, 아니면 WEBM으로 저장돼요. 최신 크롬·엣지에서 쓰는 걸 권해요."]],
      tips: [
        "해상도는 영상의 짧은 변 기준이에요. 세로 영상도 '720p'를 고르면 짧은 쪽이 720px가 돼요.",
        "영상 길이만큼 시간이 걸리니, 끝날 때까지 이 탭을 화면에 켜 두세요.",
        "결과가 원본보다 크면 안내가 나와요. 해상도나 화질을 한 단계 낮춰 다시 해 보세요.",
      ],
    },
    en: {
      intro: "This tool reduces video file size by lowering the resolution and quality (bitrate). Use it when you hit email, messenger or upload size limits. Your browser plays the video once while re-recording it, so everything happens on your own device without installing anything.",
      faq: [["What format is the output?", "MP4 if your browser supports it, otherwise WEBM. The latest Chrome or Edge is recommended."]],
      tips: [
        "Resolution refers to the short side — for vertical videos, '720p' makes the short side 720px.",
        "It takes about as long as the video plays, so keep this tab visible until it finishes.",
        "If the result is bigger than the original, you'll see a note. Try one step lower resolution or quality.",
      ],
    },
  },

  "word-counter": {
    ko: {
      intro: "글을 붙여넣으면 공백 포함·제외 글자 수, 단어 수, 문단·줄 수, 원고지(200자) 매수, 바이트, 읽는 시간을 바로 세 주는 도구예요. 자기소개서·과제·블로그 글처럼 분량 기준이 있는 글을 쓸 때 편해요. 목표 글자 수를 적으면 얼마나 남았는지 막대로 보여줘요.",
      faq: [["읽는 시간은 어떻게 계산하나요?", "공백을 뺀 글자 수를 1분에 약 500자 읽는다고 보고 계산한 대략적인 값이에요."]],
      tips: [
        "목표 글자 수는 '공백 포함' 기준으로 계산돼요.",
        "쓴 글은 이 브라우저에만 임시로 남아요. 공용 컴퓨터라면 다 쓴 뒤 '지우기'를 눌러 주세요.",
        "바이트 제한이 있는 곳은 사이트마다 기준이 달라요. 두 가지 바이트 값 중 해당하는 쪽을 보세요.",
      ],
    },
    en: {
      intro: "Paste your text to instantly see characters with and without spaces, words, sentences, paragraphs, lines, bytes and reading time. It's handy for essays, assignments and posts with length limits. Set a target length and a bar shows how much is left.",
      faq: [],
      tips: [
        "The target length is measured in characters including spaces.",
        "Your draft is kept only in this browser. On a shared computer, click 'Clear' when you're done.",
        "Byte limits differ between sites — check which of the two byte counts applies.",
      ],
    },
  },

  "qr-code": {
    ko: {
      intro: "링크·글·와이파이 정보를 담은 QR코드를 만드는 도구예요. 명함, 전단지, 매장 테이블, 행사 안내문에 넣기 좋아요. 코드 색과 배경 색을 바꿀 수 있고, PNG(256~2048px)나 인쇄용 SVG로 받을 수 있어요. 내용이 코드 안에 직접 들어가서 따로 서버를 거치지 않아요.",
      faq: [["만든 QR코드를 나중에 수정할 수 있나요?", "아니요. 내용이 코드 안에 직접 들어가서, 바꾸려면 새로 만들어야 해요. 인쇄하기 전에 휴대폰으로 꼭 한 번 찍어 보세요."]],
      tips: [
        "와이파이 QR은 대부분의 휴대폰에서 카메라로 찍기만 하면 비밀번호를 입력하지 않고 연결돼요.",
        "링크가 길수록 코드가 촘촘해져요. 작게 인쇄할 거라면 짧은 주소를 쓰세요.",
        "코드 주변 흰 여백은 인식에 필요하니 잘라내지 마세요.",
      ],
    },
    en: {
      intro: "This tool creates QR codes for links, text or Wi-Fi details. They're great for business cards, flyers, café tables and event signs. Change the code and background colors, and download a PNG (256–2048px) or an SVG for print. The content is encoded directly in the code, with no server in between.",
      faq: [["Can I edit a QR code later?", "No. The content is inside the code itself, so you'll need to make a new one. Always test-scan with a phone before printing."]],
      tips: [
        "With a Wi-Fi QR code, most phones can join just by scanning it with the camera — no typing the password.",
        "Longer links make denser codes. Use a short URL if you'll print it small.",
        "Don't crop the white margin around the code — scanners need it.",
      ],
    },
  },

  "heic-to-jpg": {
    ko: {
      intro: "아이폰으로 찍은 HEIC(HEIF) 사진을 JPG나 PNG로 바꾸는 도구예요. HEIC는 용량이 작아 좋지만 윈도우 PC, 회사 메일, 쇼핑몰·관공서 업로드 같은 곳에서 안 열리는 일이 많아요. 사진을 올리면 내 브라우저 안에서 바로 바뀌고, 여러 장을 한꺼번에 올려 ZIP으로 받을 수도 있어요. 가로세로 크기는 원본 그대로예요.",
      faq: [
        ["변환하면 촬영 날짜·위치 정보도 남나요?", "아니요. 바뀐 JPG·PNG에는 촬영 날짜, GPS 위치 같은 사진 정보(EXIF)가 들어가지 않아요. 위치 정보를 지우고 보내고 싶을 때는 오히려 편해요."],
        ["변환이 '실패'로 나와요.", "파일이 손상됐거나, 아주 드문 HEIC 종류(연속 촬영 묶음, 특수 HDR 등)일 수 있어요. 같은 사진이 계속 안 되면 하단 문의 메일로 알려 주세요. 확인해서 고쳐 나갈게요."],
      ],
      tips: [
        "품질 90이면 눈으로 원본과 차이를 느끼기 어려워요. 용량을 더 줄이고 싶으면 80 정도로 낮춰 보세요.",
        "앞으로 JPG로 찍고 싶다면 아이폰 설정 > 카메라 > 포맷에서 '높은 호환성'을 고르세요.",
        "업로드 사이트에 용량 제한이 있다면 '사진 용량 KB 맞추기'로 한 번 더 줄이면 돼요. 그 도구도 HEIC를 바로 받아요.",
      ],
    },
    en: {
      intro: "This tool converts iPhone HEIC (HEIF) photos to JPG or PNG. HEIC files are small, but they often won't open on Windows PCs, in work email, or on shopping and government upload forms. Conversion happens right inside your browser, and you can drop many photos at once and download them as a ZIP. Dimensions stay the same as the original.",
      faq: [
        ["Is the date and location info kept?", "No. The converted JPG/PNG doesn't include photo metadata (EXIF) such as capture date or GPS location — handy when you want to share without location data."],
        ["A photo shows 'Failed'.", "The file may be damaged or an unusual HEIC variant (burst sequences, special HDR, etc.). If it keeps failing, email us via the link at the bottom so we can look into it."],
      ],
      tips: [
        "Quality 90 is practically indistinguishable from the original. Try around 80 for smaller files.",
        "To shoot JPG from now on, set iPhone Settings > Camera > Formats to 'Most Compatible'.",
        "If a site has a file-size limit, run the result through 'Resize Image to KB' — it accepts HEIC directly too.",
      ],
    },
  },

  "image-to-kb": {
    ko: {
      intro: "사진 파일을 내가 정한 용량(예: 100KB, 200KB, 1MB) 이하로 자동으로 맞춰 주는 도구예요. 공공기관 민원, 입사 지원, 자격증·시험 접수처럼 '사진은 ○○KB 이하'라는 조건이 있을 때 쓰면 돼요. 먼저 화질을 조금씩 낮춰 보고, 그래도 크면 가로세로 크기를 줄여서 목표 안에서 가장 좋은 화질을 찾아요. 결과마다 '목표 이하'인지 확인해서 표시하고, 아이폰 HEIC 사진도 바로 받아요.",
      faq: [
        ["사이트가 '가로 ○○px'처럼 크기도 정해 뒀어요.", "먼저 '이미지 크기 조절'로 가로 크기를 맞춘 다음, 여기서 '가로세로 크기 그대로'를 골라 용량만 줄이세요."],
        ["목표를 못 맞췄다고 나와요.", "목표가 아주 작거나 '가로세로 크기 그대로'를 골랐을 때 생길 수 있어요. 목표 용량을 조금 늘리거나 '자동'으로 바꿔 보세요. 못 맞춘 결과는 ⚠ 표시로 알려 드려요."],
      ],
      tips: [
        "1KB를 1,000바이트로 계산해서, 1,024바이트로 계산하는 사이트에서도 넉넉히 통과해요.",
        "증명사진처럼 얼굴이 중요한 사진은 목표를 너무 작게 잡으면 흐려져요. 허용되는 최대 용량을 고르는 게 가장 선명해요.",
        "대부분의 접수 사이트는 JPG만 받아요. 특별히 WEBP를 요구하지 않으면 JPG로 두세요.",
      ],
    },
    en: {
      intro: "This tool automatically shrinks photos to a file size you choose — 100KB, 200KB, 1MB or any custom value. Use it whenever a form says 'photo must be under ___KB': government services, job applications, exam registrations. It first lowers the quality step by step and, if that's not enough, reduces the dimensions, keeping the best quality that still fits. Each result is checked and marked if it's under the target, and iPhone HEIC photos are accepted directly.",
      faq: [
        ["The site also requires a specific width in pixels.", "First set the width with 'Resize Image', then come back and choose 'Keep dimensions' so only the file size is reduced."],
        ["It says it couldn't reach the target.", "This happens with very small targets or when 'Keep dimensions' is selected. Try a slightly larger target or switch to 'Auto'. Results that miss the target are clearly marked with ⚠."],
      ],
      tips: [
        "1KB is counted as 1,000 bytes, so results also pass on sites that count 1KB as 1,024 bytes.",
        "For ID photos, a very small target makes faces blurry. Choosing the largest allowed size gives the sharpest result.",
        "Most application sites only accept JPG. Keep JPG unless WEBP is specifically requested.",
      ],
    },
  },

  "id-photo": {
    ko: {
      intro: "집에서 찍은 사진으로 이력서·자격증·비자 서류용 증명사진을 만드는 도구예요. 반명함(3×4cm), 여권(3.5×4.5cm), 명함판(5×7cm), 미국 비자(2×2인치) 규격 중 하나를 고르면 그 비율로 크롭 틀이 고정되고, 300dpi 기준 픽셀 크기의 JPG로 저장돼요. 배경은 AI가 지운 뒤 흰색·연파랑·연회색이나 원하는 색으로 바꿀 수 있고, 원본 배경을 그대로 둘 수도 있어요. 4×6인치(약 10×15cm) 인화지 한 장에 여러 장을 배치한 인화용 시트도 만들 수 있어요.",
      faq: [["인화용 시트 한 장에 몇 장 들어가요?", "인화용 시트 한 장에 반명함은 9장, 여권 규격은 8장, 미국 비자 규격은 2장, 명함판은 2장이 들어가요."]],
      tips: [
        "밝고 단색인 벽 앞에서, 그림자 없이 정면으로 찍으면 배경 지우기가 가장 깔끔해요.",
        "머리카락 끝처럼 가는 부분은 AI가 완벽하게 지우지 못할 수 있어요. 결과를 확대해서 꼭 확인하세요.",
        "여권·비자처럼 공식 요건이 있는 사진은 편집한 사진을 받지 않는 곳이 있어요. 제출 전에 기관 안내를 꼭 확인하세요.",
      ],
    },
    en: {
      intro: "This tool turns a photo taken at home into an ID photo for résumés, certificates or visa paperwork. Pick a size — Korean résumé size (3×4 cm), Korean passport (3.5×4.5 cm), 5×7 cm or US visa (2×2 in) — and the crop frame locks to that ratio, then saves a JPG at the 300 dpi pixel size. AI can remove the background and replace it with white, light blue, light gray or any color, or you can keep the original. You can also make a print sheet with several copies on one 4×6 inch (about 10×15 cm) print.",
      faq: [["How many photos fit on the print sheet?", "9 résumé-size (3×4 cm) photos, 8 passport-size photos, 2 US visa photos or 2 photos at 5×7 cm."]],
      tips: [
        "Shoot facing the camera in front of a bright, plain wall with no shadows for the cleanest cutout.",
        "Fine strands of hair may not be removed perfectly. Zoom in and check the result.",
        "Passport and visa offices often reject edited photos. Always check the official requirements before submitting.",
      ],
    },
  },

  "image-to-text": {
    ko: {
      intro: "사진이나 화면 캡처 속 글자를 읽어서, 복사하고 고칠 수 있는 텍스트로 바꿔 주는 도구예요(OCR). 카톡 캡처 내용을 문서로 옮기거나, 책·안내문 사진에서 문장을 따올 때 일일이 다시 치지 않아도 돼요. 한국어와 영어를 함께 읽을 수 있고, 결과는 복사하거나 .txt 파일로 저장할 수 있어요. 글자 인식은 내 브라우저 안에서 이뤄져서 사진이 서버로 올라가지 않아요.",
      faq: [["줄바꿈이나 띄어쓰기가 원본과 달라요.", "사진 속 줄 모양대로 줄이 바뀌고, 띄어쓰기가 가끔 빠지거나 더 들어가요. 결과 칸에서 바로 고친 뒤 복사하세요."]],
      tips: [
        "글자가 화면에 크게, 반듯하게 보이도록 찍거나 캡처하면 훨씬 정확해요. 필요한 부분만 잘라서 올리면 더 좋아요.",
        "영어만 있는 사진은 언어를 '영어만'으로 바꾸면 더 빠르고 정확할 수 있어요.",
        "손글씨, 아주 작은 글씨, 기울어진 사진, 무늬 있는 배경 위 글자는 잘 못 읽어요. 이름·숫자·계좌번호는 꼭 원본과 대조하세요.",
      ],
    },
    en: {
      intro: "This tool reads the text in a photo or screenshot and turns it into text you can copy and edit (OCR). Use it to grab sentences from a picture of a book or notice, or to move chat screenshots into a document without retyping. It reads Korean and English together, and you can copy the result or save it as a .txt file. Recognition runs inside your browser, so your image is never uploaded.",
      faq: [["Line breaks and spacing don't match the original.", "Lines break where they do in the image, and spaces are sometimes missed or added. Fix them in the result box before copying."]],
      tips: [
        "Large, straight, sharp text gives much better results. Cropping to just the part you need helps too.",
        "For English-only images, switch the language to 'English only' — it can be faster and more accurate.",
        "Handwriting, tiny text, tilted photos and text on busy backgrounds are hard to read. Always double-check names, numbers and account numbers.",
      ],
    },
  },

  "add-watermark": {
    ko: {
      intro: "사진과 PDF에 글자나 로고 워터마크를 넣는 도구예요. 상품 사진에 브랜드 이름을 넣거나, 신분증·통장 사본에 '○○ 제출용'을 표시하거나, 강의 자료 PDF에 로고를 찍을 때 쓰면 좋아요. 크기·색·투명도·각도를 조절하고 9곳 중 원하는 위치에 두거나 바둑판처럼 반복해서 채울 수 있어요. 여러 파일에 같은 설정을 한 번에 적용하고, 파일은 업로드되지 않아요.",
      faq: [["사진마다 크기가 다른데 워터마크 크기는 어떻게 되나요?", "워터마크 크기는 각 사진의 짧은 변을 기준으로 정해져서, 큰 사진이든 작은 사진이든 비슷한 비율로 들어가요."]],
      tips: [
        "사본 악용을 막으려면 '바둑판 반복'에 투명도 30~50% 정도가 좋아요. 내용은 읽히면서 잘라 내기는 어려워요.",
        "로고는 배경이 투명한 PNG로 고르세요. 흰 배경 로고는 네모난 흰 상자가 같이 찍혀요.",
        "JPG 사진은 품질 92%의 JPG로, PNG·WEBP는 같은 형식으로 저장돼요. PDF는 모든 쪽에 워터마크 그림이 얹히고 원래 글자는 그대로 남아요.",
      ],
    },
    en: {
      intro: "This tool adds a text or logo watermark to images and PDFs. Use it to brand product photos, mark ID or bank-statement copies as 'for submission only', or stamp a logo on course PDFs. Adjust size, color, opacity and angle, place it in one of 9 spots or repeat it as a tiled pattern. The same settings apply to every file at once, and nothing is uploaded.",
      faq: [["My images are different sizes. How big will the watermark be?", "The watermark is sized relative to each image's shorter side, so it looks proportionally the same on large and small images."]],
      tips: [
        "To discourage misuse of document copies, use 'Tile' with about 30–50% opacity — still readable, but hard to crop out.",
        "Use a PNG logo with a transparent background. A logo on a white background will stamp a white box too.",
        "JPG photos are saved as JPG at 92% quality; PNG and WEBP keep their format. For PDFs, the watermark is placed on every page as an image and the original text stays intact.",
      ],
    },
  },

  "remove-object": {
    ko: {
      intro: "사진에서 필요 없는 사람·물체·잡동사니를 붓으로 칠하면, AI가 그 자리를 주변 배경과 어울리게 새로 채워 주는 도구예요. 여행 사진에 끼어든 행인, 하늘을 가로지르는 전선, 바닥의 쓰레기나 얼룩을 지울 때 쓰면 좋아요. 한 번 지운 뒤에도 남은 자국을 다시 칠해서 여러 번 이어서 지울 수 있고, 되돌리기로 앞 단계로 돌아갈 수도 있어요. AI 모델이 내 브라우저 안에서 돌아가서 사진이 서버로 올라가지 않아요.",
      faq: [["지운 자리가 뭉개져 보여요.", "AI는 가려진 뒤쪽을 실제로 아는 게 아니라 주변을 보고 그럴듯하게 그려 넣어요. 하늘·바다·잔디·벽처럼 단순한 배경의 작은 물체는 자연스럽지만, 사진에서 아주 큰 부분이나 글자·얼굴처럼 복잡한 곳은 흐릿하거나 어색할 수 있어요. 이럴 땐 조금씩 나눠서 여러 번 지워 보세요."]],
      tips: [
        "물체보다 조금 넉넉하게, 그림자까지 같이 칠하면 자국이 덜 남아요.",
        "큰 물체는 한 번에 칠하기보다 부분부분 나눠서 지우면 더 깔끔할 때가 많아요.",
        "긴 변이 4096px보다 큰 사진은 4096px로 줄여서 작업하고, 저장도 그 크기로 돼요.",
      ],
    },
    en: {
      intro: "Brush over unwanted people, objects or clutter, and AI repaints that spot to blend in with the surroundings. It's great for photobombers in travel shots, power lines across the sky, or litter and stains on the ground. After each erase you can paint over leftovers and erase again, and Undo takes you back a step. The AI model runs inside your browser, so your photo is never uploaded.",
      faq: [["The erased area looks smudged.", "The AI doesn't know what was really behind the object — it paints in something plausible from the surroundings. Small objects on simple backgrounds like sky, sea, grass or walls look natural, but very large areas or detailed spots like text and faces can look blurry or odd. Try erasing in several smaller passes."]],
      tips: [
        "Paint a little beyond the object and include its shadow to avoid leftover outlines.",
        "For large objects, erasing piece by piece often looks cleaner than doing it all at once.",
        "Photos larger than 4096px on the long side are reduced to 4096px for editing and saved at that size.",
      ],
    },
  },

  "upscale-image": {
    ko: {
      intro: "작거나 흐린 사진을 AI(Real-ESRGAN)로 2배 또는 4배 크게 만들면서, 뭉개진 경계와 노이즈를 다듬어 더 또렷하게 보여 주는 도구예요. 오래된 사진, 메신저로 받아 작아진 사진, 썸네일을 크게 써야 할 때 좋아요. 큰 사진도 작은 조각으로 나눠 하나씩 처리해서 브라우저가 멈추지 않게 했고, 진행률과 남은 시간을 보여 줘요. 사진은 서버로 올라가지 않고 내 브라우저 안에서만 처리돼요.",
      faq: [["원래 없던 디테일도 살아나나요?", "아니요. AI가 사진을 보고 그럴듯하게 선명하게 다듬는 것이라, 너무 작아서 알아볼 수 없는 글자나 얼굴이 원래 모습으로 되살아나지는 않아요. 피부나 잔디처럼 결이 고운 부분은 매끈하게(그림처럼) 바뀔 수 있어요."]],
      tips: [
        "원본이 작을수록 효과가 커요. 이미 큰 사진은 2배만으로도 충분한 경우가 많아요.",
        "결과 화면에서 그림을 끌어 여러 부분을 비교해 보고, 마음에 들 때 저장하세요.",
        "CPU 모드에서는 시간이 꽤 걸려요. 크롬·엣지 최신 버전에서는 그래픽 가속(WebGPU)이 켜져 훨씬 빨라질 수 있어요.",
      ],
    },
    en: {
      intro: "This tool uses AI (Real-ESRGAN) to enlarge small or blurry photos 2× or 4× while cleaning up soft edges and noise, so they look sharper. It's handy for old photos, images shrunk by messaging apps, or thumbnails you need bigger. Large photos are split into small tiles and processed one by one so your browser doesn't freeze, with progress and time remaining shown. Your photo is processed only in your browser and never uploaded.",
      faq: [["Can it recover details that weren't there?", "No. The AI sharpens the photo in a plausible way, but text or faces too small to make out won't come back as they really were. Fine textures like skin or grass can turn smoother, a bit like a painting."]],
      tips: [
        "The smaller the original, the bigger the improvement. For already-large photos, 2× is often enough.",
        "Drag the result to compare different areas before you save.",
        "CPU mode takes a while. In the latest Chrome or Edge, graphics acceleration (WebGPU) may kick in and make it much faster.",
      ],
    },
  },

  "organize-pdf": {
    ko: {
      intro: "PDF의 모든 페이지를 작은 그림으로 펼쳐 놓고, 눈으로 보면서 페이지를 돌리고·빼고·순서를 바꾸는 도구예요. 옆으로 누운 스캔 페이지 바로잡기, 빈 페이지나 필요 없는 페이지 빼기, 순서가 뒤섞인 서류 정리에 쓰면 돼요. 페이지를 그림으로 바꾸지 않고 그대로 옮겨 담기 때문에 글자 선택과 화질은 원본과 같아요. 파일은 내 브라우저 안에서만 처리돼요.",
      faq: [["페이지가 아주 많은 PDF도 되나요?", "네. 썸네일은 화면에 보이는 페이지부터 작게 한 장씩 그려서 무겁지 않게 했어요. 다만 아주 큰 파일은 컴퓨터·휴대폰 메모리에 따라 열고 저장하는 데 시간이 걸릴 수 있어요."]],
      tips: [
        "실수로 뺀 페이지는 '처음 상태로'를 누르면 모두 돌아와요. (회전·순서도 처음으로 돌아가요)",
        "카드 아래 '원래 n쪽' 표시로 원본에서 몇 쪽이었는지 확인할 수 있어요.",
        "필요한 페이지만 따로 뽑고 싶다면 'PDF 나누기'가, 여러 PDF를 하나로 묶으려면 'PDF 합치기'가 더 빨라요.",
      ],
    },
    en: {
      intro: "This tool lays out every page of your PDF as a thumbnail so you can rotate, remove and reorder pages while you look at them. Use it to fix sideways scans, drop blank or unwanted pages, or sort a jumbled document. Pages are copied as they are rather than turned into images, so text stays selectable and quality is unchanged. Everything happens inside your browser.",
      faq: [["Does it work with very long PDFs?", "Yes. Thumbnails are drawn small, one at a time, starting with the pages on screen, to keep things light. Very large files may still take a while to open and save depending on your device's memory."]],
      tips: [
        "Removed a page by mistake? 'Start over' brings every page back (and resets rotation and order).",
        "The 'orig. p.n' label under each card shows where the page was in the original file.",
        "To pull out just a few pages use 'Split PDF'; to combine several PDFs use 'Merge PDF'.",
      ],
    },
  },

  "sign-pdf": {
    ko: {
      intro: "계약서·신청서·동의서 같은 PDF에 서명이나 도장을 넣는 도구예요. 마우스나 손가락으로 직접 서명을 그리거나, 서명·도장 이미지를 올리거나, 이름·날짜를 글자로 적어서 원하는 페이지의 원하는 자리에 놓으면 돼요. 여러 개를 넣을 수 있고, 같은 서명을 모든 쪽 같은 자리에 한 번에 넣을 수도 있어요. 파일은 내 브라우저 안에서만 처리돼요.",
      faq: [["넣은 글자도 PDF에서 검색되나요?", "아니요. 한글 글꼴을 PDF에 넣지 않고 글자를 그림으로 바꿔서 넣기 때문에, 넣은 이름·날짜는 선택하거나 검색할 수 없어요. 원래 PDF에 있던 글자는 그대로예요."]],
      tips: [
        "도장은 흰 종이에 찍어 밝은 곳에서 위에서 똑바로 찍은 사진이 가장 깔끔하게 투명해져요.",
        "직접 그릴 때는 서명 칸을 넉넉히 쓰고 크게 그린 뒤, 페이지에서 크기를 줄이면 더 매끈해 보여요.",
        "한 번 만든 서명은 '만든 서명'에 남아 있어서, 다른 페이지로 넘어가 눌러 주면 또 넣을 수 있어요. (새로고침하면 사라져요)",
      ],
    },
    en: {
      intro: "This tool adds a signature or stamp to PDFs such as contracts, applications and consent forms. Draw your signature with a mouse or finger, upload a signature or stamp image, or type a name or date, then place it wherever you need on any page. You can add several, and even put the same signature in the same spot on every page at once. Everything happens inside your browser.",
      faq: [["Is the text I add searchable?", "No. Text is turned into an image instead of embedding a font, so the names and dates you add can't be selected or searched. The original text in the PDF is unchanged."]],
      tips: [
        "For stamps, a well-lit, straight-on photo of the stamp on white paper becomes transparent most cleanly.",
        "Draw your signature large in the box, then shrink it on the page — it looks smoother.",
        "Signatures you make stay under 'Your signatures', so you can go to another page and click to add them again (they're cleared when you reload).",
      ],
    },
  },

  "trim-video": {
    ko: {
      intro: "동영상에서 필요한 구간만 잘라 MP4로 저장하는 도구예요. 강의·회의 녹화에서 필요한 부분만 남기거나, 긴 영상을 SNS용으로 짧게 자를 때 쓰면 좋아요. 영상 편집 프로그램 ffmpeg를 브라우저용(ffmpeg.wasm)으로 만든 엔진을 써서, 설치 없이 내 컴퓨터 안에서 처리돼요. '빠르게'는 화질 그대로 몇 초 만에, '정확하게'는 원하는 시점에 딱 맞게 잘라요.",
      faq: [
        ["처음에 시간이 걸리는 이유는요?", "처음 한 번은 변환 엔진(약 9MB 다운로드, 압축을 풀면 약 32MB)을 받아야 해요. 그다음부터는 브라우저에 저장돼서 바로 시작돼요."],
        ["큰 영상도 자를 수 있나요?", "원본은 통째로 메모리에 올리지 않아서 테스트에서 2GB 영상의 10초 구간도 몇 초 만에 잘렸어요. 다만 잘라낸 결과가 1GB를 넘을 만큼 길면 메모리 부족으로 실패할 수 있어요."],
      ],
      tips: [
        "영상을 재생하다 원하는 장면에서 멈추고 '지금 위치를 시작으로'를 누르면 편해요. '구간 미리보기'로 확인한 뒤 자르세요.",
        "'빠르게'로 잘랐는데 앞부분이 조금 더 들어갔다면 '정확하게'로 다시 잘라 보세요.",
        "AVI처럼 브라우저가 미리보기를 못 하는 형식도 시작·끝을 숫자(초)로 적으면 자를 수 있어요.",
      ],
    },
    en: {
      intro: "This tool cuts out the part of a video you need and saves it as MP4. Use it to keep just the key part of a lecture or meeting recording, or to shorten a long video for social media. It runs ffmpeg compiled for the browser (ffmpeg.wasm), so everything happens on your own device without installing anything. Fast keeps the original quality and finishes in seconds; Exact cuts precisely where you set it.",
      faq: [
        ["Why does the first run take longer?", "The first time, your browser downloads the video engine (about 9 MB, roughly 32 MB unpacked). After that it's cached and starts right away."],
        ["Can I trim large videos?", "The original isn't loaded into memory all at once — in our test, a 10-second clip from a 2 GB video was cut in a few seconds. But if the trimmed result itself is over about 1 GB, it may fail when memory runs out."],
      ],
      tips: [
        "Pause at the moment you want and click 'Set start here', then use 'Preview clip' to check before trimming.",
        "If a Fast trim starts a bit early, trim again with Exact.",
        "Formats your browser can't preview, like AVI, can still be trimmed — just type the start and end in seconds.",
      ],
    },
  },

  "convert-video": {
    ko: {
      intro: "아이폰 MOV, AVI, MKV, WEBM 같은 동영상을 어디서나 잘 열리는 MP4(H.264·AAC)나 WEBM으로 바꾸는 도구예요. '이 파일은 재생이 안 돼요', '업로드가 안 돼요' 할 때 MP4로 바꾸면 대부분 해결돼요. 해상도를 1080p·720p·480p로 낮춰서 용량도 함께 줄일 수 있어요. 영상 편집 프로그램 ffmpeg를 브라우저용(ffmpeg.wasm)으로 만든 엔진이 내 컴퓨터 안에서 처리해요.",
      faq: [["처음에 시간이 걸리는 이유는요?", "처음 한 번은 변환 엔진(약 9MB 다운로드, 압축을 풀면 약 32MB)을 받아야 해요. 그다음부터는 브라우저에 저장돼서 바로 시작돼요."]],
      tips: [
        "이미 H.264로 된 MKV·MOV를 '원본 그대로' MP4로 바꾸면 다시 만들지 않고 옮겨 담기만 해서 몇 초 만에 끝나요.",
        "아이폰 영상(HEVC)이 윈도우나 다른 기기에서 안 열리면 MP4로 바꿔 보세요. H.264로 다시 만들어져요.",
        "변환하는 동안 이 탭을 닫지 마세요. 오래 걸리면 '취소'를 누르고 해상도를 낮추거나 영상을 잘라서 나눠 변환하세요.",
      ],
    },
    en: {
      intro: "This tool converts videos such as iPhone MOV, AVI, MKV and WEBM into MP4 (H.264 · AAC) that opens almost everywhere, or into WEBM. When a file won't play or won't upload, converting it to MP4 usually fixes it. You can also lower the resolution to 1080p, 720p or 480p to make the file smaller. It runs ffmpeg compiled for the browser (ffmpeg.wasm) on your own device.",
      faq: [["Why does the first run take longer?", "The first time, your browser downloads the video engine (about 9 MB, roughly 32 MB unpacked). After that it's cached and starts right away."]],
      tips: [
        "MKV or MOV files that already use H.264, converted to MP4 at 'Keep original', are just repackaged — it takes seconds.",
        "If iPhone (HEVC) videos won't open on Windows or other devices, convert them to MP4 — they're re-encoded to H.264.",
        "Keep this tab open while converting. If it's taking too long, click Cancel and lower the resolution, or trim the video into parts first.",
      ],
    },
  },

  "video-to-subtitles": {
    ko: {
      intro: "영상이나 녹음 파일의 말소리를 AI(OpenAI가 공개한 Whisper 모델)가 받아써서, 시간이 붙은 자막(SRT·VTT)과 글(TXT)로 만들어 주는 도구예요. 유튜브·릴스 자막, 강의·회의 녹취록, 상담 녹음 정리에 쓰면 좋아요. 받아쓴 자막은 영상과 함께 미리 보면서 글자와 시간을 바로 고친 뒤 저장할 수 있어요. AI가 내 브라우저 안에서 돌아가기 때문에 영상과 소리는 어디로도 올라가지 않아요.",
      faq: [["긴 영상도 되나요?", "돼요. 다만 속도는 컴퓨터마다 크게 달라요. 저희 테스트 컴퓨터에서 11분 영상은 그래픽카드를 쓰면 '정확'으로 약 1분 30초, 그래픽카드 없이(CPU) '빠름'으로 약 4분 걸렸어요. CPU로 '정확'을 쓰면 영상 길이만큼 걸릴 수 있어요. 영상 전체 소리를 메모리에 올려서 처리하므로 1시간이 넘는 영상이나 1GB가 넘는 파일은 브라우저가 멈추거나 실패할 수 있어요. 그럴 땐 'MP3 추출'로 소리만 뽑거나 영상을 나눠서 올려 주세요."]],
      tips: [
        "작은 모델('빠름')은 한국어에서 틀리는 글자가 꽤 많아요. 한국어 영상은 '정확' 이상을 쓰고, 그래픽카드가 있는 컴퓨터라면 '가장 정확'이 훨씬 좋아요.",
        "배경음악이 크거나 여러 사람이 동시에 말하면 정확도가 떨어져요. 끝부분이나 조용한 구간에 '시청해 주셔서 감사합니다' 같은 엉뚱한 문장이 생기면 ✕로 지우세요.",
        "자막 시간은 1초 안팎으로 어긋날 수 있어요. ▶로 재생해 보면서 시간 칸을 고치면 돼요. 캡컷·프리미어·유튜브에는 SRT 파일을 그대로 올리면 돼요.",
      ],
    },
    en: {
      intro: "This tool uses AI (OpenAI's open Whisper model) to transcribe the speech in a video or audio file into timed subtitles (SRT, VTT) and plain text (TXT). Use it for YouTube or Reels captions, lecture and meeting transcripts, or call recordings. You can preview the subtitles with your video and fix any words or timings before saving. The AI runs inside your browser, so your video and audio are never uploaded.",
      faq: [["Does it work with long videos?", "Yes, but speed varies a lot between computers. On our test PC an 11-minute video took about 1.5 minutes with Accurate on the graphics card, and about 4 minutes with Fast on the CPU alone. Accurate on the CPU can take about as long as the video itself. The whole soundtrack is held in memory, so videos over an hour or files over 1 GB may make the browser stall or fail — extract the audio with 'Video to MP3' first or split the video."]],
      tips: [
        "Clear English speech came out well even with Fast in our tests. For other languages such as Korean, the smaller model makes noticeably more mistakes — use Accurate or Most accurate.",
        "Loud background music or people talking over each other lowers accuracy. If an odd line like 'Thanks for watching' appears at the end or in a silent part, delete it with ✕.",
        "Timings can be off by about a second. Play a line with ▶ and adjust the time boxes. SRT files can be uploaded directly to YouTube, CapCut or Premiere.",
      ],
    },
  },
};
