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
};
