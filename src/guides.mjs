// 도구별 안내 글 (도구 아래 "이 도구로 할 수 있는 일"·"팁" 영역).
// 사용 방법(steps)·자주 묻는 질문(faq)은 content.mjs에 있고, 여기 faq는 그 뒤에 덧붙여져요.
// 문구는 src/assets/tools/<slug>.js 실제 동작과 맞춰 적었어요. 기능을 바꾸면 여기도 같이 고치세요.

export const guides = {
  "remove-background": {
    ko: {
      intro: [
        "사진에서 사람·상품·동물 같은 주인공만 남기고 배경을 자동으로 지우는 도구예요. 쇼핑몰 상품 사진, 프로필 사진, 썸네일용 '누끼'가 필요할 때 쓰면 돼요.",
        "결과는 투명 배경 PNG로 받거나, 흰색·검정·연보라·보라·베이지·하늘색 중 하나 또는 직접 고른 색을 깔아 JPG로 받을 수 있어요. 결과 화면에서 색을 눌러 보면 바로 바뀌어서, 저장하기 전에 어울리는 배경을 비교해 볼 수 있어요.",
        "AI 모델이 내 브라우저 안에서 돌아가기 때문에 사진이 서버로 올라가지 않아요. 사진은 한 번에 한 장씩 처리하고, 끝나면 '다른 사진 하기'로 바로 다음 사진을 할 수 있어요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "스마트스토어·오픈마켓에 올릴 상품 사진을 흰 배경으로 통일하고 싶을 때 좋아요. 집 안 아무 데서나 찍은 사진도 배경을 지우고 흰색으로 저장하면 상품 목록이 한결 정돈돼 보여요.",
          "유튜브 썸네일, 카드뉴스, 상세페이지 디자인에 인물이나 상품을 오려 붙일 때는 투명 PNG로 받아 디자인 프로그램에 그대로 얹으면 돼요.",
          "프로필 사진 배경이 어수선할 때 단색 배경으로 바꾸면 메신저·SNS·명함용 사진으로 쓰기 좋아요.",
          "반려동물 사진을 오려서 스티커나 굿즈 시안을 만들 때도 쓸 수 있어요.",
        ]],
        ["결과물 고르는 법: 투명 PNG와 배경색 JPG", [
          "다른 그림 위에 얹어 쓸 거라면 '투명'을 고르세요. 파일 이름 뒤에 _nobg가 붙은 PNG로 저장되고, 지워진 부분이 실제로 비어 있어서 어떤 배경 위에 올려도 자연스럽게 겹쳐요.",
          "그대로 업로드하거나 인쇄할 거라면 배경색을 고르는 게 편해요. 빈 곳을 고른 색으로 채운 JPG(품질 95)로 저장돼서, 투명 PNG를 제대로 보여 주지 못하는 곳에서도 문제없이 쓸 수 있어요.",
          "목록에 없는 색은 '+'를 눌러 직접 고르면 돼요. 브랜드 색이 정해져 있다면 그 색을 넣어 상품 사진 배경을 통일할 수 있어요.",
        ]],
        ["다른 방법과 비교", [
          "아이폰은 iOS 16부터 사진 앱에서 주인공을 길게 누르면 배경에서 분리해 복사하거나 공유할 수 있어요(iPhone XS·XR 이후 기종). 휴대폰 안에서 바로 쓰기에는 그쪽이 빠르고, 배경색을 깔아 저장하거나 컴퓨터에서 작업할 때는 이 도구가 편해요.",
          "윈도우 11 그림판에도 배경 제거 버튼이 생겼어요(지역에 따라 제공되지 않을 수 있어요). 이 도구는 윈도우·맥 상관없이 브라우저만 있으면 같은 방식으로 쓸 수 있어요.",
          "포토샵 같은 편집 프로그램은 붓으로 경계를 하나하나 다듬을 수 있어 정교하지만 익히는 데 시간이 걸려요. 빠르게 누끼만 필요하면 여기서 먼저 따 보고, 경계가 아쉬운 사진만 편집 프로그램으로 다듬는 식으로 나눠 쓰면 좋아요.",
        ]],
        ["주의할 점·한계", [
          "직접 지우개로 다듬는 기능은 없어요. AI가 주인공으로 판단한 부분만 남기기 때문에, 남기고 싶은 소품이 지워지거나 지우고 싶은 물건이 남을 수 있어요.",
          "유리컵, 투명한 비닐 포장, 얇은 레이스처럼 비치는 물체는 배경과 구분하기 어려워서 일부가 같이 지워지거나 뒤 배경이 비쳐 남을 수 있어요.",
          "주인공이 여럿이거나 아주 작게 찍힌 사진은 원하는 대상만 남지 않을 수 있어요. '이미지 자르기'로 남길 대상이 크게 보이도록 먼저 잘라서 올리면 도움이 될 수 있어요.",
          "처음 쓸 때 내려받는 AI 모델은 약 40MB라 모바일 데이터로 쓰면 데이터가 꽤 나가요. 가능하면 와이파이에서 처음 실행하세요.",
        ]],
      ],
      faq: [
        ["배경색을 넣으면 어떤 형식으로 저장되나요?", "투명을 고르면 PNG, 배경색을 고르면 그 색을 깐 JPG로 저장돼요. 해상도는 원본과 같아요."],
        ["여러 장을 한 번에 지울 수 있나요?", "지금은 한 번에 한 장씩이에요. 한 장이 끝나면 '다른 사진 하기'를 눌러 다음 사진을 올리면 되고, AI 모델은 처음에 받아 둔 걸 다시 쓰기 때문에 두 번째부터는 기다리는 시간이 짧아요."],
        ["저장한 PNG가 투명하지 않고 흰색이나 검은색으로 보여요.", "투명한 부분을 보여 주는 방식은 프로그램마다 달라서, 일부 사진 보기 프로그램이나 메신저는 투명한 곳을 흰색·검은색으로 표시해요. 파일 자체는 투명하니 디자인 프로그램이나 문서에 얹어 보면 확인할 수 있어요. 배경색을 고른 상태로 저장했다면 JPG라서 실제로 색이 채워져 있어요."],
        ["상품 사진을 정사각형 같은 규격으로 맞추려면요?", "이 도구는 원본과 같은 크기로 저장해요. 정사각형이 필요하면 '이미지 자르기'에서 1:1로 자르고, 픽셀 크기는 '이미지 크기 조절'로 맞추세요."],
      ],
      tips: [
        "주인공과 배경의 색이 뚜렷하게 다를수록 경계가 깔끔해요.",
        "머리카락·털처럼 가는 부분은 완벽하지 않을 수 있어요. 결과 화면에서 마우스를 움직여 원본과 비교해 보세요.",
        "처음 한 번은 AI 모델을 내려받느라 시간이 걸려요. 같은 브라우저에서 다시 쓰면 더 빨라요.",
      ],
    },
    en: {
      intro: [
        "This tool keeps the main subject of a photo — a person, product or pet — and removes the background automatically. It's handy for product shots, profile pictures and thumbnails.",
        "Download the result as a transparent PNG, or fill the background with white, black, lavender, purple, beige, light blue or any color you pick and save it as a JPG. Clicking a color updates the preview instantly, so you can compare backgrounds before saving.",
        "The AI model runs inside your browser, so your photo is never uploaded. Photos are processed one at a time; when you're done, click 'Try another photo' to move on to the next.",
      ],
      sections: [
        ["When it comes in handy", [
          "Online sellers often want every product shot on a clean white background. Even a photo taken on the kitchen table looks tidy in a product listing once the background is gone and replaced with white.",
          "For YouTube thumbnails, social graphics or product pages, download a transparent PNG and drop the cut-out person or product straight into your design app.",
          "If the background of your profile picture is messy, swapping it for a solid color makes it work better for chat apps, social media or business cards.",
          "You can also cut out pet photos to mock up stickers or merchandise.",
        ]],
        ["Choosing the output: transparent PNG or colored JPG", [
          "Pick 'Transparent' if you'll place the cut-out on top of something else. It's saved as a PNG with _nobg added to the file name, and the removed area is genuinely empty, so it sits naturally on any background.",
          "Pick a background color if you'll upload or print the image as it is. The empty area is filled with your color and saved as a JPG at quality 95, which works even in places that don't display transparent PNGs properly.",
          "Need a color that isn't listed? Click '+' to choose your own — handy for keeping product photos on your brand color.",
        ]],
        ["How it compares to other options", [
          "On iPhone (iOS 16 or later, iPhone XS/XR and newer), you can touch and hold the subject in the Photos app to lift it from the background and copy or share it. That's quickest when you're staying on your phone; this tool is easier when you want a colored background or you're working on a computer.",
          "Windows 11 Paint now has a remove-background button too, though it isn't available in every region. This tool works the same way on Windows or Mac — all you need is a browser.",
          "Editors like Photoshop let you refine edges brush stroke by brush stroke, which is precise but takes time to learn. A practical split is to cut out here first and only take the trickiest photos into an editor.",
        ]],
        ["Things to keep in mind", [
          "There's no manual eraser or brush. The AI keeps whatever it judges to be the subject, so a prop you wanted might disappear, or an object you didn't want might stay.",
          "See-through things — glasses, clear plastic packaging, thin lace — are hard to separate from the background. Parts may be removed along with it, or the background may show through.",
          "With several subjects or a very small one, the result may not keep exactly what you wanted. Cropping first with 'Crop Image' so the subject fills more of the frame can help.",
          "The AI model downloaded on first use is about 40 MB, which adds up on mobile data. Try to run it on Wi-Fi the first time.",
        ]],
      ],
      faq: [
        ["What format do I get with a background color?", "Transparent saves as PNG; a background color saves as JPG with that color filled in. The resolution matches the original."],
        ["Can I process several photos at once?", "Not at the moment — it's one photo at a time. When one is done, click 'Try another photo' and add the next. The AI model you downloaded the first time is reused, so later photos start faster."],
        ["My PNG shows a white or black background instead of transparency.", "Apps display transparency differently, and some image viewers and chat apps show transparent areas as white or black. The file itself is still transparent — place it in a design app or document to check. If you saved with a background color, it's a JPG and the color is really filled in."],
        ["How do I make a product photo square?", "This tool saves at the original size. For a square image, crop it 1:1 with 'Crop Image', then set the pixel size with 'Resize Image'."],
      ],
      tips: [
        "Clear contrast between subject and background gives the cleanest edges.",
        "Fine details like hair or fur may not be perfect — move your mouse over the result to compare with the original.",
        "The first run downloads the AI model, so it's slower. It's quicker afterwards in the same browser.",
      ],
    },
  },

  "compress-image": {
    ko: {
      intro: [
        "사진의 가로세로 크기는 그대로 두고(원하면 줄이고) 저장 품질을 조절해 파일 용량을 줄이는 도구예요. 블로그·쇼핑몰 업로드 용량 제한, 메일 첨부, 홈페이지 속도 개선에 쓰면 좋아요.",
        "여러 장을 한꺼번에 올리면 한 장씩 차례로 압축되고, 결과는 JPG 또는 WEBP로 저장돼요. 목록에는 사진마다 원래 용량과 줄어든 용량, 몇 % 줄었는지가 바로 표시돼서 받기 전에 결과를 확인할 수 있어요.",
        "사진은 버튼으로 고르거나 끌어다 놓아도 되고, 캡처한 이미지를 복사해 Ctrl+V로 붙여넣어도 바로 들어가요. 품질이나 형식을 바꾸면 이미 올린 사진도 새 설정으로 다시 압축되니, 값을 바꿔 보며 마음에 드는 지점을 찾으면 돼요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "쇼핑몰이나 오픈마켓 상세페이지에 사진을 올리는데 '장당 ○MB 이하' 조건에 걸릴 때 좋아요. 휴대폰 사진은 한 장에 몇 MB씩 되는 경우가 많아서, 최대 가로 크기를 줄이고 품질을 조금 낮추면 조건 안에 들어오는 경우가 많아요.",
          "블로그나 홈페이지에 사진을 많이 넣으면 페이지가 느려질 수 있어요. 화면에 보이는 크기보다 훨씬 큰 사진을 그대로 올리는 경우가 흔한데, 가로 1280~1920px 정도로 줄여 두면 보기에는 차이가 적으면서 불러올 양이 줄어요.",
          "메일이나 메신저로 사진 여러 장을 보낼 때 첨부 용량을 넘기지 않게 줄일 수 있어요. 여러 장을 올린 뒤 '모두 다운로드'를 누르면 ZIP 한 파일로 받아져서 그대로 첨부하기도 편해요.",
          "용량이 큰 PNG 스크린샷이나 그래픽을 WEBP로 바꿔 가볍게 보관하고 싶을 때도 써요.",
        ]],
        ["품질·형식·최대 가로 크기 고르는 법", [
          "품질은 10부터 100까지 고를 수 있고 기본값은 70이에요. 숫자가 낮을수록 용량이 작아지는 대신, 하늘이나 피부처럼 색이 부드럽게 이어지는 부분에 얼룩이나 계단 모양이 생기기 쉬워요. 화질이 아주 중요하면 80~90, 용량 제한이 빡빡하면 50~60부터 시험해 보세요.",
          "저장 형식은 JPG와 WEBP 두 가지예요. JPG는 거의 모든 사이트와 프로그램에서 열리는 가장 무난한 형식이고, WEBP는 투명 배경을 지켜 주고 같은 품질 값에서 용량이 더 작게 나오는 경우가 많아요. 다만 업로드할 곳이 WEBP를 받지 않을 수 있으니, 잘 모르겠으면 JPG로 두세요.",
          "최대 가로 크기는 원본 그대로, 2560px, 1920px, 1280px, 800px 중에서 골라요. 사진의 가로가 고른 값보다 클 때만 줄어들고, 이미 더 작은 사진은 늘리지 않고 그대로 둬요. 세로는 비율에 맞춰 함께 줄어서 사진이 찌그러지지 않아요.",
        ]],
        ["다른 방법과 비교", [
          "윈도우 그림판 같은 기본 프로그램으로도 사진을 다시 저장해 용량을 바꿀 수는 있지만, 보통 한 장씩 열고 저장해야 해요. 이 도구는 여러 장에 같은 품질·형식·크기를 한 번에 적용하고, 얼마나 줄었는지를 사진마다 바로 보여 준다는 점이 달라요.",
          "메신저 앱은 사진을 보낼 때 자체적으로 줄여서 보내기도 하지만, 얼마나 줄일지는 내가 정하기 어려워요. 여기서는 품질과 가로 크기를 직접 정해서 줄인 뒤 보내니 결과를 예상하기 쉬워요.",
          "'200KB 이하'처럼 정확한 용량에 맞춰야 한다면, 값을 바꿔 가며 맞추는 것보다 목표 용량을 적으면 알아서 맞춰 주는 '사진 용량 KB 맞추기'가 더 편해요.",
        ]],
        ["주의할 점·한계", [
          "한 번 압축한 JPG를 다시 압축하면 화질이 조금씩 더 떨어져요. 설정을 바꿔 다시 하고 싶을 때는 압축본이 아니라 원본 사진으로 하세요.",
          "최대 가로 크기는 가로 폭만 기준으로 해요. 그래서 세로로 긴 사진은 세로가 여전히 클 수 있어요. 예를 들어 1920px를 고르면 3024×4032 세로 사진은 1920×2560이 돼요.",
          "브라우저가 열지 못하는 형식(예: 크롬에서 아이폰 HEIC 사진)은 '실패'로 나올 수 있어요. 그럴 땐 'HEIC JPG 변환'으로 먼저 바꾼 뒤 올려 주세요.",
        ]],
      ],
      faq: [
        ["압축했는데 오히려 커지면요?", "원본과 같은 형식·같은 크기인데 결과가 더 크면, 자동으로 원본을 그대로 돌려줘요. 품질 값을 낮추거나 '최대 가로 크기'를 줄여 보세요."],
        ["압축하면 촬영 날짜·위치 정보는 어떻게 되나요?", "새로 저장된 사진에는 촬영 날짜, 카메라 정보, GPS 위치 같은 사진 정보(EXIF)가 들어가지 않아요. 위치를 드러내지 않고 공유할 때는 편하지만, 날짜별로 사진을 정리해 둔다면 원본도 함께 보관하세요. 원본이 더 작아서 원본을 그대로 돌려준 경우에는 원래 정보가 남아 있어요."],
        ["움직이는 GIF도 압축되나요?", "아니요. GIF를 올리면 첫 장면 한 장만 JPG나 WEBP 정지 사진으로 저장돼요. 움직임을 살려야 한다면 원본 GIF를 그대로 쓰세요."],
        ["필요 없는 사진은 어떻게 빼나요?", "목록 오른쪽의 ✕를 누르면 그 사진만 빠지고, '모두 다운로드'에도 들어가지 않아요. 목록 전체를 비우려면 아래 '모두 지우기'를 누르세요."],
      ],
      tips: [
        "품질 60~80 정도면 대부분 눈으로 차이를 느끼기 어려워요. (기본값 70)",
        "휴대폰 사진은 '최대 가로 크기'를 1920px나 1280px로 줄이면 용량이 훨씬 많이 줄어요.",
        "JPG로 저장하면 투명한 부분은 흰색이 돼요. 투명 배경을 지키려면 WEBP를 고르세요.",
      ],
    },
    en: {
      intro: [
        "This tool reduces file size by adjusting save quality — and optionally the maximum width — while keeping your photos looking the same. Use it for upload limits on blogs and shops, email attachments, or faster web pages.",
        "Drop many images at once; they're compressed one after another and saved as JPG or WEBP. Each row shows the original size, the new size and the percentage saved, so you can check the result before downloading.",
        "Pick files with the button, drag them in, or copy a screenshot and paste it with Ctrl+V. If you change the quality or format, images already in the list are recompressed with the new settings — so you can try a few values and keep the one you like.",
      ],
      sections: [
        ["When it comes in handy", [
          "Online stores and marketplaces often cap each image at a few megabytes. Phone photos are frequently several MB each, so lowering the max width and nudging the quality down usually gets them under the limit.",
          "Lots of images can slow a blog or website down. Photos are often uploaded far larger than they're ever displayed; scaling them to around 1280–1920px wide looks much the same on screen while cutting what visitors have to load.",
          "When emailing or messaging a batch of photos, compressing them first helps you stay under attachment limits. Click 'Download all' and you get a single ZIP that's easy to attach.",
          "It's also a quick way to turn bulky PNG screenshots or graphics into lighter WEBP files for storage.",
        ]],
        ["Choosing quality, format and max width", [
          "Quality runs from 10 to 100, with 70 as the default. Lower numbers give smaller files, but smooth areas like skies and skin start to show blotches or banding. If quality really matters, try 80–90; if the size limit is tight, start at 50–60.",
          "There are two formats: JPG and WEBP. JPG opens practically everywhere, which makes it the safe choice. WEBP keeps transparency and often comes out smaller at the same quality setting — but some upload forms don't accept it, so stick with JPG if you're unsure.",
          "Max width can be Keep original, 2560px, 1920px, 1280px or 800px. Images are only scaled down when they're wider than the value you pick; narrower images are never enlarged. Height follows the aspect ratio, so nothing gets squashed.",
        ]],
        ["How it compares to other options", [
          "You can re-save a photo in a built-in app like Windows Paint to change its size, but that usually means opening and saving each file one by one. Here the same quality, format and width are applied to every image at once, and you see how much each one shrank.",
          "Messaging apps sometimes shrink photos on their own when you send them, but you don't get much say in how much. Compressing here first means you choose the quality and width, so the result is predictable.",
          "If you need to hit an exact size such as 'under 200KB', 'Resize Image to KB' is easier — you type the target and it finds the settings for you.",
        ]],
        ["Things to keep in mind", [
          "Every time a JPG is recompressed it loses a little more quality. When you want to try different settings, start from the original photo rather than an already compressed copy.",
          "Max width only looks at the width, so tall portrait photos can still be quite tall. For example, at 1920px a 3024×4032 portrait photo becomes 1920×2560.",
          "Formats your browser can't open — such as iPhone HEIC photos in Chrome — may show 'Failed'. Convert them first with 'HEIC to JPG'.",
        ]],
      ],
      faq: [
        ["What if the result is bigger than the original?", "If the format and size are unchanged and the result is larger, the original is returned as is. Try a lower quality or a smaller max width."],
        ["What happens to the date and location info?", "Compressed images don't include photo metadata (EXIF) such as capture date, camera details or GPS location. That's handy when you'd rather not share where a photo was taken, but keep your originals if you sort photos by date. If the original was smaller and returned unchanged, its metadata is still there."],
        ["Can I compress animated GIFs?", "No. Only the first frame of a GIF is saved, as a still JPG or WEBP. Keep the original GIF if you need the animation."],
        ["How do I remove an image from the list?", "Click the ✕ on its row — it's removed and won't be included in 'Download all'. To empty the whole list, click 'Clear all' below it."],
      ],
      tips: [
        "Quality between 60 and 80 is usually indistinguishable to the eye (the default is 70).",
        "For phone photos, setting max width to 1920px or 1280px shrinks files far more.",
        "JPG turns transparent areas white. Choose WEBP to keep transparency.",
      ],
    },
  },

  "resize-image": {
    ko: {
      intro: [
        "사진의 가로·세로 픽셀 크기를 바꾸는 도구예요. 비율(%)로 한 번에 줄이거나, 가로 폭을 픽셀로 정해서 여러 장을 같은 폭으로 맞출 수 있어요.",
        "세로는 원래 비율에 맞춰 자동으로 계산되기 때문에 사진이 찌그러지지 않아요. PNG·WEBP는 같은 형식으로, 그 밖의 형식은 JPG로 저장돼요.",
        "목록에는 사진마다 '원래 크기 → 바뀐 크기'와 용량 변화가 함께 표시돼요. 방식이나 값을 바꾸면 이미 올린 사진도 새 값으로 다시 처리되니, 숫자를 바꿔 가며 결과를 비교해 보세요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "블로그나 상세페이지에 넣을 사진을 모두 같은 가로 폭으로 맞추면, 글 사이사이 사진 크기가 들쭉날쭉하지 않아 보기 좋아요.",
          "휴대폰 원본 사진이 너무 커서 업로드가 오래 걸리거나 '이미지가 너무 큽니다'라는 안내가 나올 때 써요. 50%로 줄이면 가로세로가 각각 절반이 돼서 전체 픽셀 수는 4분의 1이 돼요.",
          "홈페이지 배너나 쇼핑몰 썸네일처럼 '가로 ○○px'로 정해진 자리에 넣을 사진을 맞출 때 좋아요.",
          "발표 자료나 문서에 사진을 많이 넣어 파일이 무거워졌다면, 넣기 전에 사진 크기를 줄여 두면 문서 용량도 함께 가벼워져요.",
        ]],
        ["비율(%)과 가로 크기(px) 고르는 법", [
          "'비율(%)'은 원본 크기를 기준으로 줄이거나 늘려요. 기본값은 50%이고, 50을 넣으면 4000×3000 사진이 2000×1500이 돼요. 사진마다 크기가 달라도 같은 비율로 줄이고 싶을 때 맞아요.",
          "'가로 크기(px)'는 결과의 가로 폭을 직접 정해요. 기본값은 1280px이고, 원본이 그보다 크면 줄어들고 작으면 늘어나요. 여러 장의 가로 폭을 똑같이 맞추고 싶을 때 쓰세요.",
          "JPG로 저장되는 사진은 품질 92로 저장돼요. 크기만 바꾸고 화질은 되도록 지키려는 설정이라, 용량까지 많이 줄이고 싶다면 이후에 '이미지 용량 줄이기'를 한 번 더 쓰면 돼요.",
        ]],
        ["다른 방법과 비교", [
          "윈도우 그림판이나 휴대폰 사진 편집 기능으로도 크기를 바꿀 수 있지만, 보통 사진을 한 장씩 열어서 바꾸고 저장해야 해요. 이 도구는 여러 장에 같은 값을 한 번에 적용하고 ZIP으로 모아 받을 수 있어서 사진이 많을 때 손이 덜 가요.",
          "디자인 프로그램은 세밀한 보정까지 되지만, 단순히 크기만 맞출 때는 프로그램을 여는 것보다 여기에 끌어다 놓는 쪽이 간단해요.",
        ]],
        ["주의할 점·한계", [
          "세로 크기나 정확한 가로×세로(예: 1080×1080)를 따로 정하는 기능은 없어요. 정사각형처럼 비율 자체를 바꿔야 한다면 '이미지 자르기'로 먼저 비율을 맞춘 뒤 여기서 크기를 정하세요.",
          "GIF·BMP 같은 형식은 JPG로 저장되고, 움직이는 GIF는 첫 장면만 남아요. JPG로 저장될 때 투명한 부분은 흰색으로 채워져요.",
          "작은 사진을 크게 늘리면 흐려 보여요. 확대가 꼭 필요하다면 AI가 경계를 다듬어 주는 'AI 화질 개선·확대'를 써 보세요.",
          "크기를 바꿔 저장한 사진에는 촬영 날짜·위치 같은 사진 정보(EXIF)가 들어가지 않아요. 원본은 따로 보관하세요.",
        ]],
      ],
      faq: [
        ["작은 사진을 크게 늘려도 되나요?", "100%보다 큰 값을 넣으면 늘어나긴 하지만, 없던 디테일이 생기지는 않아서 흐릿해 보일 수 있어요."],
        ["세로 크기를 기준으로 맞출 수 있나요?", "지금은 비율(%)이나 가로 폭 기준만 돼요. 세로를 특정 크기로 맞추고 싶다면 '원하는 세로 ÷ 원본 세로 × 100'으로 비율을 계산해 '비율(%)'에 넣으세요. 예를 들어 세로 3000px 사진에 33%를 넣으면 세로가 990px가 돼요."],
        ["DPI(인쇄 해상도)도 바뀌나요?", "이 도구는 픽셀 수만 바꿔요. 인쇄용 DPI 값을 따로 정하는 기능은 없어서, 인쇄 크기는 인쇄하는 프로그램에서 맞춰 주세요."],
      ],
      tips: [
        "블로그·상세페이지용이라면 가로 1000~1280px 정도가 무난해요.",
        "파일 이름 뒤에 결과 크기(예: _1280x960)가 붙어서 원본과 헷갈리지 않아요.",
        "용량까지 줄이고 싶다면 크기 조절 뒤 '이미지 용량 줄이기'를 한 번 더 써 보세요.",
      ],
    },
    en: {
      intro: [
        "This tool changes the pixel dimensions of your images. Scale them by a percentage, or set a width in pixels to make a batch of photos the same width.",
        "Height is calculated from the original aspect ratio, so nothing gets stretched. PNG and WEBP keep their format; other formats are saved as JPG.",
        "Each row shows the original and new dimensions along with the change in file size. If you switch the mode or change the value, images already in the list are processed again — so it's easy to try a few numbers and compare.",
      ],
      sections: [
        ["When it comes in handy", [
          "Give every image in a blog post or product page the same width, so the photos don't jump around in size between paragraphs.",
          "When a full-size phone photo takes ages to upload or a site says the image is too large. Scaling to 50% halves both width and height, leaving a quarter of the original pixels.",
          "Fitting images to fixed slots such as website banners or shop thumbnails that call for a specific width in pixels.",
          "If a slide deck or document has become heavy because of the photos in it, shrinking the images before inserting them keeps the file lighter too.",
        ]],
        ["Percent or width: which to use", [
          "'Percent (%)' scales relative to the original size. The default is 50%, which turns a 4000×3000 photo into 2000×1500. Use it when your photos are different sizes but you want to shrink them all by the same proportion.",
          "'Width (px)' sets the output width directly. The default is 1280px: larger images are scaled down and smaller ones are scaled up. Use it when every image needs exactly the same width.",
          "Images saved as JPG use quality 92, aimed at changing the size while keeping quality as high as practical. If you also want a much smaller file, run the results through 'Compress Image' afterwards.",
        ]],
        ["How it compares to other options", [
          "Windows Paint or your phone's photo editor can resize too, but usually one image at a time — open, resize, save, repeat. Here the same setting is applied to every image at once, and you can grab them all in a single ZIP.",
          "Design software offers fine control, but when all you need is a new size, dropping files here is quicker than opening a full editor.",
        ]],
        ["Things to keep in mind", [
          "You can't set the height or an exact width × height (say, 1080×1080). If you need a different shape, such as a square, crop it first with 'Crop Image', then resize here.",
          "Formats like GIF and BMP are saved as JPG, and animated GIFs keep only their first frame. When saving as JPG, transparent areas are filled with white.",
          "Enlarging small images makes them look soft. If you really need a bigger version, try 'AI Image Upscaler', which uses AI to clean up edges as it enlarges.",
          "Resized images don't include photo metadata (EXIF) such as capture date or location. Keep your originals.",
        ]],
      ],
      faq: [
        ["Can I enlarge small images?", "Values above 100% will enlarge them, but no new detail is created, so they may look soft."],
        ["Can I resize to a specific height?", "Only percent and width are available right now. To hit a particular height, work out 'target height ÷ original height × 100' and enter that as the percentage. For example, 33% on a photo 3000px tall gives a height of 990px."],
        ["Does it change the DPI?", "This tool only changes the number of pixels. There's no setting for print DPI, so set the print size in the program you print from."],
      ],
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
      intro: [
        "사진이나 스캔 이미지 여러 장을 순서대로 묶어 PDF 한 파일로 만드는 도구예요. 영수증·서류 사진 제출, 과제 스캔본 정리, 포트폴리오 묶기에 쓰면 편해요.",
        "페이지 크기는 '사진 크기에 맞춤' 또는 'A4'(여백을 두고 가운데 배치) 중에서 고를 수 있어요. 사진 한 장이 PDF 한 쪽이 되고, 목록에 붙은 번호 순서대로 페이지가 쌓여요.",
        "JPG·PNG·WEBP처럼 브라우저가 여는 이미지는 대부분 쓸 수 있고, 캡처한 화면을 복사해 Ctrl+V로 붙여넣어 바로 추가할 수도 있어요. 완성된 PDF는 '이미지_PDF.pdf'라는 이름으로 저장돼요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "관공서나 회사에서 '서류는 PDF로 제출'하라고 할 때, 휴대폰으로 찍은 신분증 사본·통장 사본·증명서 사진을 A4 PDF 한 파일로 묶어 낼 수 있어요.",
          "경비 정산용 영수증 사진을 한 달 치씩 모아 PDF 하나로 만들어 두면 제출하기도 보관하기도 편해요.",
          "손으로 푼 과제나 필기 노트를 페이지별로 찍어 순서대로 묶으면 바로 제출용 파일이 돼요.",
          "그림·사진 작업물을 PDF 포트폴리오로 보낼 때는 '사진 크기에 맞춤'을 고르면 여백 없이 작품이 페이지를 꽉 채워요.",
        ]],
        ["페이지 크기 고르는 법", [
          "'사진 크기에 맞춤'은 사진마다 페이지 크기가 달라지는 방식이에요. 가로 사진은 가로 페이지, 세로 사진은 세로 페이지가 되고 여백이 없어요. 화면으로 보는 PDF나 포트폴리오에 잘 맞아요.",
          "'A4'는 모든 페이지를 세로 A4로 통일하고, 사진을 비율 그대로 줄이거나 늘려 사방에 약 8mm 여백을 두고 가운데에 놓아요. 인쇄하거나 서류로 낼 때 좋아요. 가로로 긴 사진은 세로 A4 안에 들어가느라 작게 보일 수 있어요.",
          "PDF 안에 들어가는 사진은 긴 변이 2500px를 넘으면 2500px로 줄이고, JPG 품질 90으로 넣어요. A4 세로 길이를 2500px로 채우면 약 210dpi라서, 휴대폰 원본을 그대로 넣는 것보다 용량은 줄이면서 서류용으로 넉넉한 크기예요.",
        ]],
        ["다른 방법과 비교", [
          "아이폰은 '파일' 앱의 문서 스캔 기능으로 종이를 바로 찍어 PDF로 저장할 수 있어요. 종이 서류를 지금 찍는 거라면 그쪽이 빠르고, 이미 갤러리에 있는 사진이나 캡처, 여러 기기에서 모은 이미지를 묶을 때는 이 도구가 편해요.",
          "사진을 한 장씩 메일에 첨부하면 받는 사람이 순서대로 열어 보기 번거로워요. PDF 하나로 묶으면 순서가 고정되고 파일도 하나라서 확인하기 쉬워요.",
        ]],
        ["주의할 점·한계", [
          "이 도구에는 사진을 돌리는 기능이 없어요. 옆으로 누운 사진은 '이미지 자르기'에서 90도 돌려 저장한 뒤 넣으세요.",
          "글자를 인식하는 기능(OCR)은 없어서, 만든 PDF에서 글자를 선택하거나 검색할 수는 없어요. 사진 속 글자가 필요하면 '이미지 글자 추출 (OCR)'을 따로 쓰세요.",
          "스캔 사진의 기울어짐이나 그림자를 자동으로 펴 주는 기능은 없어요. 종이를 평평하게 두고 위에서 똑바로 찍을수록 결과가 깔끔해요.",
          "브라우저가 열지 못하는 이미지(예: 크롬에서 아이폰 HEIC 사진)가 섞이면 PDF 만들기가 실패할 수 있어요. 'HEIC JPG 변환'으로 먼저 바꾼 뒤 넣어 주세요.",
        ]],
      ],
      faq: [
        ["PDF 용량이 너무 커요.", "아주 큰 사진은 긴 변이 2500px가 되도록 자동으로 줄여 넣지만, 장수가 많으면 커질 수 있어요. 먼저 '이미지 용량 줄이기'로 사진을 줄인 뒤 만들어 보세요."],
        ["사진마다 크기가 달라도 되나요?", "네. '사진 크기에 맞춤'이면 페이지 크기가 사진마다 달라지고, 'A4'면 크기가 제각각인 사진도 모두 같은 A4 페이지에 맞춰 들어가요."],
        ["한 페이지에 사진 여러 장을 넣을 수 있나요?", "아니요. 사진 한 장이 PDF 한 쪽이 돼요. 신분증 앞뒷면처럼 한 쪽에 같이 넣고 싶다면, 미리 한 장의 이미지로 합친 뒤 올려 주세요."],
        ["PDF에 비밀번호를 걸 수 있나요?", "이 도구에는 비밀번호 설정 기능이 없어요. 만든 PDF는 누구나 열 수 있는 일반 PDF라서, 민감한 서류는 보내는 방법에 신경 써 주세요."],
      ],
      tips: [
        "서류 제출용이면 'A4'를 고르면 인쇄했을 때 크기가 딱 맞아요.",
        "사진은 PDF 안에 JPG로 들어가요. 투명한 부분은 흰색이 돼요.",
        "올린 순서가 곧 페이지 순서예요. 만들기 전에 ▲▼로 확인하세요.",
      ],
    },
    en: {
      intro: [
        "This tool combines photos or scanned images into a single PDF, in the order you choose. It's useful for submitting receipts and documents, tidying up scanned homework, or bundling a portfolio.",
        "Choose a page size: 'Fit to image' or 'A4' (centered with a margin). Each image becomes one page, stacked in the numbered order shown in the list.",
        "Most images your browser can open — JPG, PNG, WEBP and so on — will work, and you can paste a copied screenshot with Ctrl+V to add it straight away. The finished PDF downloads as 'images.pdf'.",
      ],
      sections: [
        ["When it comes in handy", [
          "When an office or employer asks for documents 'as a PDF', you can bundle phone photos of an ID, a bank statement and a certificate into one A4 PDF.",
          "Collect a month of receipt photos into a single PDF for expense reports — easier to submit and easier to file away.",
          "Photograph handwritten homework or notes page by page and combine them, in order, into one file ready to hand in.",
          "For an art or photo portfolio, choose 'Fit to image' so each piece fills its page with no margins.",
        ]],
        ["Choosing a page size", [
          "'Fit to image' gives every page the shape of its photo: landscape photos get landscape pages, portrait photos get portrait pages, and there are no margins. It suits PDFs meant for screens and portfolios.",
          "'A4' makes every page a portrait A4 sheet and scales each image — up or down, keeping its proportions — to sit centered with roughly 8 mm of margin all round. It's the one to use for printing or formal submissions. Wide landscape images may look small on a portrait page.",
          "Images are placed in the PDF as JPG at quality 90, and anything longer than 2500px on its long side is scaled down to 2500px. Spread over the height of an A4 page, that's about 210 dpi — plenty for documents, and lighter than embedding full-size phone photos.",
        ]],
        ["How it compares to other options", [
          "On iPhone, the Files app has a Scan Documents feature that photographs paper and saves it straight to PDF. That's quicker if you're scanning paper right now; this tool is handier for photos already in your gallery, screenshots, or images gathered from different devices.",
          "Attaching photos to an email one by one makes it awkward for the recipient to view them in order. A single PDF keeps the order fixed and gives them just one file to open.",
        ]],
        ["Things to keep in mind", [
          "There's no rotate button here. If a photo is sideways, rotate it in 'Crop Image', save it, then add it.",
          "There's no text recognition (OCR), so text in the PDF can't be selected or searched. If you need the words from a photo, use 'Image to Text (OCR)' separately.",
          "Skewed scans and shadows aren't straightened automatically. Lay the paper flat and shoot straight down for the cleanest pages.",
          "If the list includes an image your browser can't open (for example, iPhone HEIC photos in Chrome), creating the PDF may fail. Convert those first with 'HEIC to JPG'.",
        ]],
      ],
      faq: [
        ["My PDF is too large.", "Very large images are scaled so the long side is 2500px, but many pages can still add up. Shrink them first with 'Compress Image'."],
        ["Is it OK if my images are different sizes?", "Yes. With 'Fit to image' each page matches its photo; with 'A4' every image, whatever its size, is fitted onto the same A4 page."],
        ["Can I put several images on one page?", "No — one image becomes one page. If you want, say, the front and back of an ID card on one page, combine them into a single image first."],
        ["Can I password-protect the PDF?", "This tool doesn't add passwords. The PDF it creates is a regular file anyone can open, so take care with how you send sensitive documents."],
      ],
      tips: [
        "Choose 'A4' for documents you'll print or submit.",
        "Images are stored as JPG inside the PDF, so transparent areas become white.",
        "The list order is the page order — check it with ▲▼ before creating.",
      ],
    },
  },

  "merge-pdf": {
    ko: {
      intro: [
        "PDF 파일 여러 개를 원하는 순서대로 이어 붙여 하나의 PDF로 만드는 도구예요. 계약서와 첨부 서류 합치기, 여러 장으로 나뉜 스캔본 정리에 쓰면 돼요.",
        "페이지를 그림으로 바꾸지 않고 그대로 옮겨 붙이는 방식이라 글자 선택·검색이 그대로 되고 화질도 바뀌지 않아요. A4 페이지와 가로 페이지처럼 크기가 다른 페이지가 섞여 있어도, 각 페이지는 원래 크기와 방향 그대로 들어가요.",
        "파일을 올리면 목록에 번호와 쪽수가 붙고, ▲▼로 순서를 바꾸거나 ✕로 뺄 수 있어요. 결과는 '합친_PDF.pdf'라는 이름으로 저장돼요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "입사·입학 지원처럼 '파일 하나로 올려 주세요'라는 곳에 이력서, 자기소개서, 증명서 PDF를 제출 순서대로 묶어 낼 수 있어요.",
          "스캐너가 몇 장씩 나눠 스캔해서 파일이 여러 개로 쪼개졌을 때, 순서대로 이어 붙여 원래 서류 한 부로 되돌릴 수 있어요.",
          "매달 받는 청구서·명세서 PDF를 분기나 연도별로 한 파일에 모아 두면 찾기도 보관하기도 쉬워요.",
          "발표 자료, 참고 문서, 부록을 하나로 합쳐 메일 한 번에 보내고 싶을 때도 좋아요.",
        ]],
        ["순서와 결과 미리 정하는 법", [
          "목록의 번호가 곧 합쳐지는 순서예요. 첫 번째 파일의 첫 쪽이 결과 PDF의 1쪽이 되고, 각 파일 안의 페이지는 원래 순서 그대로 이어져요.",
          "파일 안의 페이지 순서까지 바꾸고 싶다면 합친 뒤 'PDF 페이지 편집'에서 정리하면 돼요. 일부 페이지만 넣고 싶을 때는 먼저 'PDF 나누기'로 필요한 쪽만 뽑은 다음 합치세요.",
          "같은 파일을 두 번 올리면 두 번 들어가요. 안내 페이지를 여러 번 넣을 때는 쓸모가 있지만, 실수로 겹치지 않았는지 목록의 쪽수를 더해 결과와 한 번 비교해 보세요.",
        ]],
        ["다른 방법과 비교", [
          "PDF 편집 프로그램으로도 합칠 수 있지만, 따로 설치하거나 구입해야 하는 경우가 있어요. 이 도구는 설치·회원가입 없이 브라우저에서 바로 쓰고, 파일이 서버로 가지 않아요.",
          "PDF를 각각 인쇄한 뒤 다시 스캔해서 하나로 만드는 방법은 화질이 떨어지고 글자 검색도 안 돼요. 여기서 합치면 원본 페이지를 그대로 옮기기 때문에 그런 손실이 없어요.",
        ]],
        ["주의할 점·한계", [
          "열 때 암호를 묻는 PDF는 물론, 열 때는 암호를 묻지 않지만 인쇄·편집 제한 같은 보안 설정이 걸린 PDF도 '열 수 없는 PDF'로 표시될 수 있어요. 보안 설정을 풀 권한이 있다면 해제한 뒤 다시 올려 주세요.",
          "원본 PDF의 책갈피(목차)는 결과 파일로 옮겨지지 않아요. 긴 문서를 책갈피로 이동하며 보던 경우라면 알아 두세요.",
          "입력란(서식 필드)이 있는 PDF는 합친 뒤 입력란이 제대로 동작하지 않을 수 있어요. 내용을 다 채운 상태로 합치고, 결과를 열어 잘 보이는지 확인하세요.",
          "올린 파일을 모두 메모리에 올려 한 번에 합치기 때문에, 아주 큰 파일을 여러 개 합치면 기기에 따라 느려지거나 실패할 수 있어요.",
        ]],
      ],
      faq: [
        ["가로 페이지와 세로 페이지가 섞여도 되나요?", "네. 각 페이지는 원래 크기와 방향 그대로 들어가서, 가로로 된 표 페이지가 세로로 눌리거나 잘리지 않아요."],
        ["순서를 잘못 넣고 합쳤어요.", "합친 뒤에도 목록은 그대로 남아 있어요. ▲▼로 순서를 고친 다음 'PDF 합치기'를 다시 누르면 새 파일이 만들어져요."],
        ["합친 파일 이름을 정할 수 있나요?", "파일은 '합친_PDF.pdf'라는 이름으로 받아져요. 받은 뒤 원하는 이름으로 바꾸거나, 브라우저 설정에서 다운로드할 때마다 저장 위치를 묻게 해 두면 저장하면서 이름을 정할 수 있어요."],
      ],
      tips: [
        "파일을 올리면 각 파일의 쪽수가 옆에 표시돼요. '열 수 없는 PDF'로 나오면 암호를 먼저 풀어 주세요.",
        "합친 뒤 일부 페이지만 필요하면 'PDF 나누기'로 뽑아낼 수 있어요.",
        "결과 용량은 원본들을 더한 정도예요. 너무 크면 'PDF 용량 줄이기'를 써 보세요.",
      ],
    },
    en: {
      intro: [
        "This tool joins multiple PDF files into one, in the order you want. Use it to combine a contract with its attachments or tidy up scans split across files.",
        "Pages are copied as they are rather than turned into images, so text stays selectable and searchable and quality doesn't change. If the files mix page sizes — A4 alongside landscape pages, say — each page keeps its original size and orientation.",
        "Each file you add gets a number and a page count in the list; reorder with ▲▼ or remove with ✕. The result downloads as 'merged.pdf'.",
      ],
      sections: [
        ["When it comes in handy", [
          "Job or school applications that ask for 'a single file' — combine your résumé, cover letter and certificates in the order they want.",
          "When a scanner splits a long document into several files, stitch them back together into one copy in the right order.",
          "Gather monthly bills or statements into one PDF per quarter or year, so they're easy to find and archive.",
          "Bundle slides, reference documents and appendices into one attachment for a single email.",
        ]],
        ["Planning the order", [
          "The numbers in the list are the merge order. Page 1 of the first file becomes page 1 of the result, and pages inside each file stay in their original order.",
          "To rearrange pages within a file, merge first and then tidy up in 'Organize PDF'. If you only need some pages from a file, pull them out with 'Split PDF' before merging.",
          "Adding the same file twice includes it twice. That can be useful for a repeated cover sheet, but it's worth adding up the page counts in the list and checking them against the result.",
        ]],
        ["How it compares to other options", [
          "PDF editors can merge files too, but some need to be installed or bought. This tool runs right in your browser with no install or sign-up, and your files never go to a server.",
          "Printing each PDF and scanning them back in as one loses quality and makes the text unsearchable. Merging here copies the original pages, so nothing is lost.",
        ]],
        ["Things to keep in mind", [
          "PDFs that ask for a password to open can't be merged — and neither, often, can PDFs that open freely but carry security restrictions such as no printing or editing. These show up as 'Can't open'. If you're allowed to, remove the security settings and add the file again.",
          "Bookmarks (the outline or table of contents) from the original files aren't carried over to the merged PDF. Worth knowing if you navigate long documents that way.",
          "PDFs with fillable form fields may not have working fields after merging. Fill them in first, then merge and check that everything shows up in the result.",
          "All files are loaded into memory and merged in one go, so combining several very large PDFs may be slow or fail on some devices.",
        ]],
      ],
      faq: [
        ["Can I mix landscape and portrait pages?", "Yes. Every page keeps its original size and orientation, so a landscape table page won't be squashed or cut off."],
        ["I merged them in the wrong order.", "The list is still there after merging. Fix the order with ▲▼ and click 'Merge PDF' again to create a new file."],
        ["Can I choose the file name?", "The file downloads as 'merged.pdf'. Rename it afterwards, or set your browser to ask where to save each download so you can name it as you save."],
      ],
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
      intro: [
        "PDF의 모든 페이지를 한 장씩 JPG나 PNG 이미지로 바꾸는 도구예요. PDF 자료를 카톡·SNS에 올리거나, 발표 자료 일부를 이미지로 쓰거나, 상세페이지에 넣을 때 편해요.",
        "변환이 끝나면 페이지별 미리보기가 나오고, 한 장씩 받거나 ZIP으로 한 번에 받을 수 있어요. 파일 이름에는 '원래이름_001.jpg'처럼 쪽 번호가 세 자리로 붙어서, 폴더에서 이름순으로 정렬해도 페이지 순서가 그대로 유지돼요.",
        "페이지는 브라우저 안의 PDF 엔진(pdf.js)으로 그려서 이미지로 저장하고, PDF 파일은 어디로도 보내지 않아요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "PDF로 받은 행사 안내문이나 포스터를 인스타그램처럼 PDF를 올릴 수 없는 곳에 올리거나, 단톡방에서 바로 보이게 공유하고 싶을 때 이미지로 바꾸면 돼요.",
          "발표 슬라이드를 PDF로 저장한 뒤 이미지로 바꾸면 블로그 글이나 카드뉴스에 한 장씩 넣기 좋아요.",
          "이미지 파일만 첨부할 수 있는 사이트에 계약서나 증명서의 특정 페이지를 내야 할 때 써요.",
          "전자책·자료집 PDF의 표지를 썸네일이나 홍보 이미지로 쓰고 싶을 때도 첫 페이지 이미지만 받으면 돼요.",
        ]],
        ["화질·형식 고르는 법", [
          "'보통'은 PDF 원래 크기의 1.5배(약 108dpi), '고화질'은 3배(약 216dpi)로 그려요. A4 페이지라면 '보통'은 약 892×1262픽셀, '고화질'은 약 1785×2525픽셀이 돼요.",
          "JPG는 품질 92로 저장돼서 사진이 많은 페이지도 용량이 적당해요. PNG는 압축으로 화질이 깎이지 않아 글자 가장자리가 깔끔하지만, 사진이 많은 페이지는 파일이 꽤 커질 수 있어요.",
          "페이지는 흰 바탕을 깔고 그리기 때문에 PNG로 받아도 배경은 흰색이에요. 투명 배경이 필요한 로고·도형을 뽑는 용도에는 맞지 않아요.",
        ]],
        ["다른 방법과 비교", [
          "화면 캡처로도 PDF를 이미지로 만들 수 있지만, 화면에 보이는 크기만큼만 담겨서 해상도가 들쭉날쭉하고 페이지가 많으면 일일이 캡처해야 해요. 이 도구는 모든 페이지를 같은 배율로 한 번에 바꾸고 쪽 번호 순서로 이름을 붙여 줘요.",
          "PDF 편집 프로그램에 이미지 내보내기 기능이 있다면 그것도 방법이에요. 이 도구는 설치 없이 브라우저에서 바로 쓸 수 있고, 파일이 서버로 가지 않는다는 점이 달라요.",
        ]],
        ["주의할 점·한계", [
          "한 번에 PDF 한 개씩 변환해요. 여러 PDF를 바꾸려면 하나가 끝난 뒤 '다른 PDF'를 눌러 이어서 하세요.",
          "암호가 걸린 PDF는 열리지 않아요. 암호를 입력하는 칸이 없으니, 암호를 푼 PDF로 다시 올려 주세요.",
          "페이지를 골라 변환하는 기능은 없고 항상 모든 페이지를 바꿔요. 수백 쪽짜리 PDF를 '고화질'로 바꾸면 시간이 오래 걸리고 기기 메모리를 많이 쓸 수 있어요.",
          "이미지로 바꾼 뒤에는 글자를 선택·검색할 수 없고, PDF 안의 링크도 눌러지지 않아요. 글자가 필요하면 원본 PDF에서 복사하세요.",
        ]],
      ],
      faq: [
        ["'보통'과 '고화질'은 얼마나 다른가요?", "'고화질'은 '보통'보다 가로세로가 2배 커요. 대신 파일 용량도 커지고 변환 시간이 더 걸려요."],
        ["'모두 다운로드'를 눌렀더니 ZIP 파일이 받아졌어요.", "모든 페이지를 한 번에 받을 수 있게 ZIP 하나에 담아 드려요. ZIP 파일의 압축을 풀면 페이지별 이미지가 나와요. 한두 장만 필요하면 미리보기 아래 버튼으로 따로 받으세요."],
        ["이미지 크기를 픽셀 단위로 정할 수 있나요?", "화질은 '보통'과 '고화질' 두 단계만 있어요. 특정 픽셀 크기가 필요하면 변환한 뒤 '이미지 크기 조절'에서 가로 크기를 맞추세요."],
        ["글자 모양이 원본과 조금 달라 보여요.", "PDF에 특수한 글꼴이 들어 있으면 브라우저의 PDF 엔진이 원본 프로그램과 조금 다르게 그릴 수 있어요. 미리보기로 확인하고, 계속 문제가 되면 하단 문의 메일로 알려 주세요."],
      ],
      tips: [
        "각 미리보기 아래에 이미지 픽셀 크기가 적혀 있어서 결과 크기를 바로 확인할 수 있어요.",
        "페이지가 많으면 변환에 시간이 걸려요. 진행 표시가 끝날 때까지 기다려 주세요.",
        "필요한 페이지만 이미지로 바꾸려면 'PDF 나누기'로 먼저 뽑은 뒤 변환하세요.",
      ],
    },
    en: {
      intro: [
        "This tool turns every page of a PDF into a JPG or PNG image. It's handy for posting PDF content on social media, reusing slides as images, or adding pages to a web page.",
        "When it's done you'll see a preview of each page and can download them one by one or all at once as a ZIP. Files are named like 'name_001.jpg' with a three-digit page number, so sorting by name in a folder keeps the pages in order.",
        "Pages are drawn by the PDF engine inside your browser (pdf.js) and saved as images; the PDF itself is never sent anywhere.",
      ],
      sections: [
        ["When it comes in handy", [
          "Sharing a flyer or poster you received as a PDF on Instagram, which doesn't take PDFs, or in a group chat where you want everyone to see it at a glance.",
          "Saving a slide deck as PDF and converting it, so you can drop individual slides into a blog post or a carousel.",
          "Submitting a particular page of a contract or certificate to a site that only accepts image files.",
          "Using the cover of an ebook or guide as a thumbnail or promo image — just take the first page.",
        ]],
        ["Choosing quality and format", [
          "'Normal' renders at 1.5× the PDF's own size (about 108 dpi) and 'High' at 3× (about 216 dpi). For an A4 page that's roughly 892×1262 pixels on Normal and 1785×2525 on High.",
          "JPG is saved at quality 92, which keeps photo-heavy pages at a reasonable size. PNG isn't lossy, so text edges stay crisp, but pages full of photos can produce large files.",
          "Pages are drawn on a white background, so PNGs come out with a white background too. It isn't the right tool for pulling out logos or shapes with a transparent background.",
        ]],
        ["How it compares to other options", [
          "You could take screenshots instead, but you only capture what fits on screen, the resolution varies, and long documents mean a lot of screenshots. This tool converts every page at the same scale in one go and names the files in page order.",
          "If your PDF editor can export images, that works too. The difference here is that there's nothing to install and your file stays on your device.",
        ]],
        ["Things to keep in mind", [
          "One PDF at a time. To convert another, click 'Another PDF' when the first one finishes.",
          "Password-protected PDFs won't open, and there's no box to enter a password. Remove the password and add the file again.",
          "You can't choose specific pages — every page is converted. A PDF with hundreds of pages on 'High' takes a while and can use a lot of memory.",
          "Once converted, text can't be selected or searched and links can't be clicked. Copy any text you need from the original PDF.",
        ]],
      ],
      faq: [
        ["How different are 'Normal' and 'High'?", "'High' is twice the width and height of 'Normal'. Files are larger and conversion takes longer."],
        ["'Download all' gave me a ZIP file.", "All pages are bundled into one ZIP so you can grab them in one go. Extract the ZIP to get an image for each page. If you only need one or two, use the button under each preview instead."],
        ["Can I set an exact pixel size?", "There are just two levels, Normal and High. If you need a specific size, convert first and then set the width in 'Resize Image'."],
        ["The text looks slightly different from the original.", "If a PDF uses unusual embedded fonts, the browser's PDF engine may draw them a little differently from the program that made it. Check the previews, and if it's a real problem, let us know via the email link at the bottom."],
      ],
      tips: [
        "The pixel size of each image is shown under its preview.",
        "Long PDFs take a while — wait until the progress bar finishes.",
        "To convert only certain pages, extract them first with 'Split PDF'.",
      ],
    },
  },

  "compress-pdf": {
    ko: {
      intro: [
        "스캔본이나 사진이 많은 PDF의 용량을 줄이는 도구예요. 메일 첨부·서류 제출 용량 제한에 걸렸을 때 효과가 커요.",
        "각 페이지를 이미지로 다시 그려 JPG로 압축한 뒤 새 PDF로 만드는 방식이에요. 페이지 수와 각 페이지의 크기·방향은 원본과 같게 유지되고, 압축 강도는 강하게·보통·약하게 세 가지예요.",
        "결과 화면에서 전후 용량과 몇 % 줄었는지를 바로 보여 주고, 파일은 '원래이름_compressed.pdf'로 저장돼요. 모든 과정이 내 브라우저 안에서 이뤄져서 서류가 밖으로 나가지 않아요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "복합기나 휴대폰 스캔 앱으로 스캔한 서류가 너무 커서 메일에 첨부되지 않을 때 좋아요.",
          "입사·입학 지원이나 관공서 민원처럼 '첨부 파일은 ○MB 이하'라는 조건이 있는 곳에 서류를 낼 때 써요.",
          "사진이 가득한 카탈로그·포트폴리오 PDF를 메신저로 보내거나 다운로드용으로 올릴 때, 받는 사람이 빨리 열 수 있게 가볍게 만들 수 있어요.",
          "여러 서류를 '하나의 PDF, 전체 ○MB 이하'로 내야 할 때는 'PDF 합치기'로 먼저 한 파일로 묶은 다음 이 도구로 줄이면 두 조건을 한 번에 맞출 수 있어요.",
          "휴대폰에 저장해 두고 자주 꺼내 보는 스캔 서류(계약서 사본, 보험 서류 등)를 가볍게 만들어 저장 공간을 아끼고 싶을 때도 좋아요.",
        ]],
        ["압축 강도 고르는 법", [
          "'강하게'는 PDF 원래 크기의 약 1.1배(약 79dpi)로 그려 JPG 품질 50으로 저장해요. 용량은 가장 작지만 작은 글씨가 뭉개질 수 있어서, 사진 위주 자료나 화면으로만 볼 문서에 맞아요.",
          "'보통'(추천)은 1.5배(약 108dpi)에 품질 65예요. 일반 서류를 화면에서 읽는 용도로 무난한 설정이에요.",
          "'약하게'는 2배(약 144dpi)에 품질 80이에요. 작은 글씨나 도표가 많거나 나중에 인쇄할 수도 있다면 이걸 고르세요.",
          "어느 강도를 골라도 페이지 수와 페이지 크기는 그대로라서, 인쇄했을 때 종이에 찍히는 크기는 원본과 같아요.",
        ]],
        ["다른 방법과 비교", [
          "PDF 편집 프로그램의 최적화 기능은 글자는 그대로 두고 그림만 골라 줄일 수 있어서, 글자 검색을 꼭 살려야 하는 문서라면 그쪽이 더 맞을 수 있어요. 이 도구는 페이지 전체를 이미지로 바꾸는 단순한 방식이라, 원래 글자 정보가 없는 스캔본에 특히 잘 맞아요.",
          "스캔할 때 해상도를 낮게 설정하면 처음부터 작은 파일을 만들 수도 있어요. 이미 만들어진 큰 PDF를 다시 스캔하기 어려울 때 이 도구가 편해요.",
        ]],
        ["주의할 점·한계", [
          "압축된 PDF에서는 링크, 책갈피(목차), 입력란(서식 필드), 주석 같은 기능이 사라지고 보이는 모습만 남아요. 입력란이 있는 서류라면 압축본을 열어 내용이 제대로 보이는지 꼭 확인하세요.",
          "글자가 이미지로 바뀌기 때문에 크게 확대하면 원본보다 글자 가장자리가 흐릿해 보여요.",
          "암호가 걸린 PDF는 열리지 않아요. 암호를 푼 뒤 다시 올려 주세요.",
          "페이지가 많은 PDF는 한 쪽씩 차례로 처리해서 시간이 걸려요. 진행 표시에 몇 쪽째인지 나오니 끝날 때까지 탭을 닫지 마세요.",
        ]],
      ],
      faq: [
        ["결과가 원본보다 크면 어떻게 되나요?", "압축본이 더 크면 원본 파일을 그대로 받게 되고, 더 줄어들지 않았다는 안내가 나와요."],
        ["압축한 PDF를 한 번 더 압축하면 더 줄어드나요?", "크게 줄지 않을 수 있고, 화질은 다시 깎여요. 이미 압축한 파일을 또 압축하기보다 원본 PDF로 돌아가 강도를 한 단계 올려서 다시 하는 게 나아요."],
        ["몇 MB 이하로 맞춰 주는 기능이 있나요?", "목표 용량을 직접 정하는 기능은 없어요. 강도를 바꿔도 조건에 안 맞으면 'PDF 페이지 편집'으로 필요 없는 페이지를 뺀 뒤 압축하거나, 'PDF 나누기'로 파일을 둘로 나눠 보내는 방법이 있어요."],
      ],
      tips: [
        "처음에는 '보통'으로 해 보고, 그래도 크면 '강하게'로 다시 해 보세요.",
        "압축된 PDF는 글자 선택·검색과 링크가 사라져요. 원본은 꼭 따로 보관하세요.",
        "글자만 있는 PDF는 원래 작아서 이 방식으로는 잘 안 줄어요.",
      ],
    },
    en: {
      intro: [
        "This tool shrinks scanned and image-heavy PDFs. It works especially well when you hit email or upload size limits.",
        "Each page is redrawn as an image, compressed as JPG and rebuilt into a new PDF. The number of pages and each page's size and orientation stay the same as the original. Choose Strong, Medium or Light.",
        "The result screen shows the before and after size and the percentage saved, and the file downloads as 'name_compressed.pdf'. Everything happens inside your browser, so your documents never leave your device.",
      ],
      sections: [
        ["When it comes in handy", [
          "When a document from a copier or a phone scanning app is too big to attach to an email.",
          "When an application form or government portal says attachments must be under a certain number of MB.",
          "When you want a photo-heavy catalog or portfolio to open quickly for people downloading it or receiving it in a chat app.",
          "When several documents must go in as 'one PDF under X MB', combine them with 'Merge PDF' first, then shrink the result here to meet both requirements at once.",
          "Slimming down scanned documents you keep on your phone for reference — contract copies, insurance papers and the like — to save storage space.",
        ]],
        ["Choosing a compression level", [
          "'Strong' renders pages at about 1.1× their size (around 79 dpi) and saves them as JPG at quality 50. It gives the smallest file, but small print can get mushy, so it suits photo-led material or documents that will only be read on screen.",
          "'Medium' (recommended) uses 1.5× (around 108 dpi) at quality 65 — a sensible setting for everyday documents read on screen.",
          "'Light' uses 2× (around 144 dpi) at quality 80. Pick it when there's lots of small text or detailed charts, or the document might be printed later.",
          "Whatever level you choose, the page count and page sizes don't change, so it prints at the same size as the original.",
        ]],
        ["How it compares to other options", [
          "The optimize feature in a PDF editor can shrink just the images and leave the text alone, which may suit documents where searchable text really matters. This tool takes the simpler route of turning whole pages into images, which makes it a particularly good fit for scans that never had real text in the first place.",
          "Choosing a lower resolution when scanning gives you a smaller file from the start. This tool is the easy fix when the large PDF already exists and rescanning isn't practical.",
        ]],
        ["Things to keep in mind", [
          "Links, bookmarks, form fields and comments are lost — only what you see on the page remains. If your document has fill-in fields, open the compressed copy and check that everything still shows.",
          "Because text becomes part of an image, it looks softer than the original when you zoom in a long way.",
          "Password-protected PDFs won't open. Remove the password and add the file again.",
          "Long PDFs are processed one page at a time, so they take a while. The progress bar shows which page it's on — keep the tab open until it's done.",
        ]],
      ],
      faq: [
        ["What if the result is bigger?", "If compression doesn't help, you get the original file back with a note saying it didn't get smaller."],
        ["Will compressing it again make it smaller?", "Not necessarily by much, and quality drops again each time. Rather than recompressing a compressed file, go back to the original and try the next level up."],
        ["Can I set a target size in MB?", "There's no target-size setting. If the levels don't get you under the limit, remove unneeded pages with 'Organize PDF' before compressing, or use 'Split PDF' to send it as two files."],
      ],
      tips: [
        "Start with 'Medium' and switch to 'Strong' if it's still too large.",
        "Compressed PDFs lose selectable text, search and links — keep your original.",
        "Text-only PDFs are already small and usually won't shrink this way.",
      ],
    },
  },

  "video-to-mp3": {
    ko: {
      intro: [
        "동영상 파일에서 소리만 뽑아 MP3로 저장하는 도구예요. 강의·회의 녹화본을 오디오로 들을 때, 브이로그 배경 소리를 따로 쓸 때 편해요.",
        "음질은 96·128·192·320kbps 중에서 고를 수 있고(기본 128kbps), 변환이 끝나면 페이지에서 바로 들어 보고 받을 수 있어요. 오디오 파일을 올려 MP3로 바꾸는 것도 돼요.",
        "브라우저가 영상의 소리를 읽어 들인 뒤, MP3 인코더(lamejs)가 내 컴퓨터 안에서 바로 MP3를 만들어요. 영상은 어디로도 올라가지 않고, 결과 파일은 원래 이름에 확장자만 .mp3로 바뀌어 저장돼요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "온라인 강의나 세미나 녹화본을 출퇴근길에 소리로만 듣고 싶을 때, 영상보다 가벼운 MP3로 바꿔 휴대폰에 넣어 두면 좋아요.",
          "회의 녹화 파일에서 소리만 뽑아 두면 녹취록을 쓰거나 받아쓰기 도구에 넣기 편해요. 시간이 붙은 자막까지 필요하다면 '영상 자막 만들기'를 바로 써도 돼요.",
          "직접 찍은 영상 속 현장 소리나 공연 연습 녹화의 음악을 따로 저장해 두고 싶을 때 써요.",
          "녹음 앱에서 받은 M4A 같은 오디오 파일을 MP3만 받는 곳에 올려야 할 때도, 브라우저가 읽을 수 있는 형식이라면 MP3로 바꿀 수 있어요.",
        ]],
        ["음질(비트레이트) 고르는 법", [
          "MP3는 고른 음질(비트레이트)로 일정하게 저장돼서 용량을 미리 가늠할 수 있어요. 1분 기준으로 96kbps는 약 0.7MB, 128kbps는 약 1MB, 192kbps는 약 1.4MB, 320kbps는 약 2.4MB예요. 1시간짜리 강의를 128kbps로 받으면 60MB 가까이 돼요.",
          "원본 영상의 소리가 이미 낮은 음질이라면 320kbps를 골라도 소리가 더 좋아지지는 않고 용량만 커져요. 원본보다 높은 음질을 고를 필요는 없어요.",
          "소리는 44.1kHz로 맞춰 저장돼요. 음악·음성 파일에서 흔히 쓰는 값이라 대부분의 기기와 앱에서 문제없이 재생돼요.",
        ]],
        ["다른 방법과 비교", [
          "영상 편집 프로그램이나 변환 프로그램으로도 소리를 뽑을 수 있지만, 설치가 필요하고 메뉴를 찾는 데 시간이 걸려요. 이 도구는 파일을 올리고 음질만 고르면 바로 MP3가 나와요.",
          "영상을 틀어 놓고 녹음 앱으로 다시 녹음하는 방법은 영상 길이만큼 기다려야 하고 주변 소음이 섞일 수 있어요. 여기서는 파일 안의 소리를 그대로 꺼내기 때문에 영상을 재생하며 기다릴 필요가 없어요.",
        ]],
        ["주의할 점·한계", [
          "구간을 골라 뽑는 기능은 없어서 영상 전체의 소리가 MP3가 돼요. 일부만 필요하면 '동영상 자르기'로 먼저 자른 뒤 올리세요.",
          "브라우저가 소리를 읽지 못하는 형식이나 코덱(일부 MKV·AVI 등)은 '소리를 읽지 못했어요'라는 안내가 나와요. 이럴 땐 '동영상 형식 변환'으로 MP4로 바꾼 뒤 다시 해 보세요.",
          "MP3에는 제목·가수 같은 태그 정보가 들어가지 않아요. 음악 앱에서 정리하려면 받은 뒤 태그를 따로 넣어 주세요.",
          "한 번에 파일 한 개씩 변환해요. 여러 개라면 하나가 끝난 뒤 '다른 영상'을 눌러 이어서 하세요.",
        ]],
      ],
      faq: [
        ["유튜브 영상 주소로도 되나요?", "아니요. 내 컴퓨터나 휴대폰에 있는 영상 파일만 올릴 수 있어요. 저작권이 있는 콘텐츠는 권리자의 허락 범위 안에서만 써 주세요."],
        ["음질을 바꾸려면 다시 올려야 하나요?", "네. 음질은 변환을 시작할 때 정해져요. 다른 음질로 받고 싶다면 '다른 영상'을 누르고 음질을 바꾼 뒤 같은 파일을 다시 올려 주세요."],
        ["MP3 말고 WAV나 M4A로 받을 수 있나요?", "아니요. 이 도구는 MP3로만 저장해요. MP3는 거의 모든 기기와 앱에서 재생되는 무난한 형식이에요."],
        ["소리가 없는 영상을 올리면 어떻게 되나요?", "소리 트랙이 없는 영상은 '소리를 읽지 못했어요'라는 안내가 나오고 MP3가 만들어지지 않아요. 화면 녹화처럼 소리 없이 찍힌 영상인지 먼저 확인해 보세요."],
      ],
      tips: [
        "말소리 위주라면 96~128kbps, 음악이라면 192kbps 이상이 좋아요.",
        "스테레오까지 저장돼요. 채널이 더 많은 영상은 앞의 두 채널만 들어가요.",
        "긴 영상은 소리를 한꺼번에 메모리에 읽어서 느릴 수 있어요. 다른 프로그램을 닫고 해 보세요.",
      ],
    },
    en: {
      intro: [
        "This tool extracts the audio from a video file and saves it as MP3. It's handy for listening to recorded lectures or meetings, or reusing the sound from a vlog.",
        "Choose 96, 128, 192 or 320 kbps (128 is the default), then play the result right on the page and download it. Audio files can be converted to MP3 too.",
        "Your browser reads the soundtrack, and an MP3 encoder (lamejs) builds the file on your own device. The video is never uploaded, and the MP3 keeps the original file name with a .mp3 extension.",
      ],
      sections: [
        ["When it comes in handy", [
          "Turning a recorded course or webinar into a lighter MP3 you can listen to on your phone during the commute.",
          "Pulling the audio out of a meeting recording so it's easier to write up notes or feed into a transcription tool. If you want timed captions, 'Video to Subtitles' can work from the video directly.",
          "Keeping the ambient sound from a clip you filmed, or the music from a rehearsal recording, as a separate file.",
          "Converting audio files such as M4A from a voice recorder app for a site that only takes MP3 — as long as your browser can read the format.",
        ]],
        ["Choosing the bitrate", [
          "The MP3 is encoded at a constant bitrate, so you can estimate the size in advance. Per minute, 96 kbps is about 0.7 MB, 128 kbps about 1 MB, 192 kbps about 1.4 MB and 320 kbps about 2.4 MB. An hour-long lecture at 128 kbps comes to nearly 60 MB.",
          "If the video's audio is low quality to begin with, choosing 320 kbps won't make it sound better — it just makes the file bigger. There's no need to go above the quality of the source.",
          "Audio is saved at 44.1 kHz, a standard sample rate for music and speech that plays back fine on practically any device or app.",
        ]],
        ["How it compares to other options", [
          "Video editors and converter apps can extract audio as well, but they need installing and a bit of hunting through menus. Here you add the file, pick a bitrate and get an MP3.",
          "Playing the video while recording it with a voice recorder takes as long as the video itself and can pick up background noise. This tool takes the sound straight from the file, so there's no waiting for playback.",
        ]],
        ["Things to keep in mind", [
          "There's no option to pick a section — the whole soundtrack becomes the MP3. If you only need part of it, cut it first with 'Trim Video'.",
          "Formats or codecs your browser can't decode (some MKV or AVI files, for example) show a 'Couldn't read audio' message. Convert the video to MP4 with 'Convert Video', then try again.",
          "No tags such as title or artist are added to the MP3. Add them afterwards if you organize files in a music app.",
          "Files are converted one at a time. For more, click 'Another video' when the first one finishes.",
        ]],
      ],
      faq: [
        ["Can I use a YouTube link?", "No. Only video files on your own device can be added. Use copyrighted content only as the rights holder allows."],
        ["Do I need to re-add the file to change the bitrate?", "Yes. The bitrate is set when conversion starts. Click 'Another video', change the setting and add the same file again."],
        ["Can I save as WAV or M4A instead?", "No — this tool only saves MP3, which plays on almost every device and app."],
        ["What happens with a video that has no sound?", "If the video has no audio track, you'll see the 'Couldn't read audio' message and no MP3 is made. Check whether it was recorded without sound, as some screen recordings are."],
      ],
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
      intro: [
        "글을 붙여넣으면 공백 포함·제외 글자 수, 단어 수, 문단·줄 수, 원고지(200자) 매수, 바이트, 읽는 시간을 바로 세 주는 도구예요. 자기소개서·과제·블로그 글처럼 분량 기준이 있는 글을 쓸 때 편해요.",
        "글자를 쓰거나 지울 때마다 숫자가 바로 바뀌어서, 문장을 다듬으며 분량을 맞추기 좋아요. 목표 글자 수를 적으면 몇 자 남았는지, 또는 몇 자 넘었는지와 함께 진행 막대가 보여요.",
        "쓴 글은 서버로 보내지 않고 이 브라우저 안에서만 세요. 다 쓴 글은 '복사' 버튼으로 한 번에 복사해서 지원서 입력 칸에 바로 붙여넣을 수 있어요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "채용 사이트의 자기소개서 문항마다 '1,000자 이내' 같은 제한이 있을 때, 입력 칸에 바로 쓰기보다 여기서 먼저 쓰고 분량을 맞춘 뒤 옮기면 글이 잘리는 일을 줄일 수 있어요.",
          "대학 과제나 독후감에 '원고지 ○매' 기준이 있을 때 대략적인 매수를 가늠할 수 있어요.",
          "블로그 글이 너무 짧지 않은지, SNS 글이 글자 제한에 걸리지 않는지 올리기 전에 확인할 때 써요.",
          "발표 대본을 쓸 때 읽는 시간을 보면 몇 분짜리 분량인지 감을 잡을 수 있어요.",
        ]],
        ["숫자 읽는 법: 무엇을 어떻게 세나요", [
          "'공백 포함'은 띄어쓰기와 줄바꿈까지 모두 한 글자로 세요. '공백 제외'는 띄어쓰기·탭·줄바꿈을 모두 빼고 남은 글자만 세요. 여러 문자가 합쳐진 일부 이모지는 하나로 보여도 2자 이상으로 셀 수 있어요.",
          "단어 수는 띄어쓰기로 나뉜 덩어리의 개수예요. 그래서 '안녕하세요 반갑습니다'는 2단어로 세요.",
          "문단은 빈 줄로 나뉜 덩어리 수이고, 줄은 줄바꿈으로 나뉜 줄 수(빈 줄 포함)예요.",
          "원고지 매수는 공백 포함 글자 수를 200으로 나눠 올림한 값이에요. 실제 원고지는 문단 첫 칸 띄우기나 줄바꿈으로 남는 칸까지 쓰기 때문에, 손으로 옮겨 쓰면 매수가 더 나올 수 있어요.",
        ]],
        ["다른 방법과 비교", [
          "MS 워드는 아래쪽 상태 표시줄에 단어 수가 보이고, 그걸 누르면 글자 수·문단 수·줄 수 같은 자세한 통계를 볼 수 있어요. 문서 프로그램을 이미 쓰고 있다면 그걸로도 충분해요. 이 도구는 프로그램 없이 웹에서 바로 쓸 수 있고, 일부 채용 사이트에서 쓰는 바이트 기준(한글 2바이트·3바이트)과 원고지 매수를 함께 보여 준다는 점이 달라요.",
          "채용 사이트 입력 칸에 자체 글자 수 표시가 있다면 최종 기준은 그 사이트의 숫자예요. 여기서 맞춘 뒤 붙여넣고, 사이트에 표시된 숫자와 한 번 더 비교해 보세요.",
        ]],
        ["주의할 점·한계", [
          "줄바꿈은 한 글자로 세요. 사이트마다 줄바꿈을 세는 방식이 다를 수 있어서, 문단을 많이 나눈 글은 몇 자 차이가 날 수 있어요.",
          "'바이트 (한글 2)'는 영문·숫자·기본 기호를 1바이트, 그 밖의 문자를 모두 2바이트로 센 값이에요. 시스템마다 계산 방식이 완전히 같지 않을 수 있으니 제한에 딱 맞추기보다 여유를 두세요.",
          "임시 저장은 이 브라우저에만 돼요. 다른 기기나 다른 브라우저에서는 보이지 않고, 브라우저 사이트 데이터를 지우면 함께 사라져요. 중요한 글은 따로 저장해 두세요.",
          "맞춤법 검사 기능은 없어요. 분량을 맞춘 뒤 맞춤법은 따로 확인하세요.",
        ]],
      ],
      faq: [
        ["읽는 시간은 어떻게 계산하나요?", "공백을 뺀 글자 수를 1분에 약 500자 읽는다고 보고 계산한 대략적인 값이에요."],
        ["목표 글자 수를 공백 제외 기준으로 볼 수 있나요?", "목표 막대는 공백 포함 기준으로만 계산돼요. 공백 제외 기준이 필요하면 위쪽 '공백 제외' 숫자를 직접 보면서 맞춰 주세요."],
        ["띄어쓰기를 두 번 하면 두 글자로 세나요?", "네. '공백 포함'에서는 띄어쓰기 하나하나를 모두 한 글자로 세요. 실수로 들어간 연속 띄어쓰기나 문장 끝 공백도 글자 수에 들어가니, 분량이 빠듯하면 확인해 보세요."],
        ["영어 글도 셀 수 있나요?", "네. 단어 수는 띄어쓰기 기준이라 영어 글에도 잘 맞아요. 다만 한국어 페이지의 읽는 시간은 한국어 기준(1분 약 500자)으로 계산돼서, 영어 글의 읽는 시간은 영어 페이지(1분 약 200단어 기준)에서 보는 게 더 맞아요."],
      ],
      tips: [
        "목표 글자 수는 '공백 포함' 기준으로 계산돼요.",
        "쓴 글은 이 브라우저에만 임시로 남아요. 공용 컴퓨터라면 다 쓴 뒤 '지우기'를 눌러 주세요.",
        "바이트 제한이 있는 곳은 사이트마다 기준이 달라요. 두 가지 바이트 값 중 해당하는 쪽을 보세요.",
      ],
    },
    en: {
      intro: [
        "Paste your text to instantly see characters with and without spaces, words, sentences, paragraphs, lines, bytes and reading time. It's handy for essays, assignments and posts with length limits.",
        "The numbers update with every keystroke, so you can trim and polish while watching the count. Set a target length and you'll see how many characters are left — or how far over you are — along with a progress bar.",
        "Your text is counted inside this browser and never sent to a server. When you're done, the 'Copy' button copies the whole text so you can paste it straight into an application form.",
      ],
      sections: [
        ["When it comes in handy", [
          "Application and scholarship essays with limits like '500 words' or '2,000 characters' — draft here first and paste in once you're within the limit, so nothing gets cut off by the form.",
          "School assignments with a minimum or maximum word count.",
          "Checking a blog post isn't too thin, or that a social post fits the platform's character limit, before you publish.",
          "Writing a talk or video script — the reading time gives you a feel for how many minutes it will run.",
        ]],
        ["What each number means", [
          "'Characters' counts everything, including spaces and line breaks. 'No spaces' leaves out spaces, tabs and line breaks. Some emoji that are built from several characters may count as two or more even though they look like one.",
          "Words are chunks of text separated by spaces, so 'well-known' counts as one word and 'well known' as two.",
          "Sentences are counted by ending punctuation (. ! ?) or line ends. Paragraphs are blocks separated by a blank line, and lines are counted at every line break, blank lines included.",
          "Reading time is a rough guide for silent reading. Reading aloud — a speech or a voiceover — usually takes longer, so allow extra time for scripts.",
        ]],
        ["How it compares to other options", [
          "Microsoft Word shows the word count in the status bar at the bottom, and clicking it opens detailed stats such as characters, paragraphs and lines. If you're already in Word, that's all you need. This tool works in any browser with nothing to open, keeps a running target bar, and also shows byte counts that some forms use.",
          "If the form you're filling in shows its own counter, that's the number that counts in the end. Get close here, paste it in, and compare with the form's figure.",
        ]],
        ["Things to keep in mind", [
          "A line break counts as one character. Forms don't all count line breaks the same way, so text with lots of paragraphs may come out a few characters different.",
          "'Bytes (2/CJK)' counts basic Latin letters, digits and symbols as 1 byte and every other character as 2. 'Bytes (UTF-8)' is the actual encoded size. Systems don't all calculate bytes identically, so leave a little headroom.",
          "The draft is saved only in this browser. It won't appear on another device or browser, and it's deleted if you clear site data. Save anything important elsewhere.",
          "There's no spelling or grammar check — just counting.",
        ]],
      ],
      faq: [
        ["Can the target bar use characters without spaces?", "The target is always measured in characters including spaces. If your limit excludes spaces, keep an eye on the 'No spaces' figure instead."],
        ["Do double spaces count twice?", "Yes. Every space counts as a character, including accidental double spaces and trailing spaces at the end of lines — worth tidying up when you're right at the limit."],
        ["Does it work for Korean or other languages?", "Character counts work for any language. Word counts rely on spaces, so languages that don't separate words with spaces won't give meaningful word counts. For Korean text, the Korean version of this page also shows manuscript-sheet counts and a reading time based on characters."],
      ],
      tips: [
        "The target length is measured in characters including spaces.",
        "Your draft is kept only in this browser. On a shared computer, click 'Clear' when you're done.",
        "Byte limits differ between sites — check which of the two byte counts applies.",
      ],
    },
  },

  "qr-code": {
    ko: {
      intro: [
        "링크·글·와이파이 정보를 담은 QR코드를 만드는 도구예요. 명함, 전단지, 매장 테이블, 행사 안내문에 넣기 좋아요.",
        "코드 색과 배경 색을 바꿀 수 있고, PNG(256·512·1024·2048px)나 인쇄용 SVG로 받을 수 있어요. 입력하는 동안 미리보기가 바로 바뀌어서, 결과를 보면서 내용을 고치면 돼요.",
        "내용이 코드 안에 직접 들어가서 따로 서버를 거치지 않아요. 그래서 이 사이트가 없어지더라도 이미 만든 QR코드는 그대로 작동해요.",
      ],
      sections: [
        ["이럴 때 쓰면 좋아요", [
          "카페·매장 테이블에 와이파이 QR을 붙여 두면 손님이 비밀번호를 묻거나 받아 적지 않아도 돼요.",
          "명함이나 전단지에 홈페이지·예약 페이지·카카오톡 채널 링크를 QR로 넣으면, 받는 사람이 주소를 직접 칠 필요가 없어요.",
          "행사장 안내판이나 포스터에 신청서·설문 링크를 넣어 현장에서 바로 참여하게 할 수 있어요.",
          "링크가 아니라 짧은 안내문이나 연락처 같은 글도 그대로 담을 수 있어요. 찍었을 때 글이 어떻게 보이는지는 휴대폰 카메라 앱마다 조금씩 달라요.",
        ]],
        ["설정 고르는 법", [
          "이 도구는 QR코드 표준의 오류 복원 단계 중 'M'(약 15%까지 복원)을 써요. 인쇄물이 조금 긁히거나 더러워져도 읽히는 데 도움이 되지만, 코드 위에 로고나 스티커를 크게 덮으면 읽히지 않을 수 있어요.",
          "PNG는 256·512·1024·2048px 중에서 고르고 기본값은 1024px이에요. 웹페이지나 메신저에 올릴 때는 512px나 1024px면 충분하고, 현수막처럼 아주 크게 쓰거나 디자인 프로그램에 넣을 때는 SVG가 좋아요.",
          "코드 둘레에는 칸 4개 너비의 여백이 자동으로 들어가요. QR 규격에서 정한 여백이라, 디자인에 넣을 때도 이 여백을 남겨 두세요.",
          "와이파이 탭에서는 보안 방식을 WPA/WPA2, WEP, 없음 중에서 골라요. 공유기에 설정된 방식과 같게 골라야 연결되니, 만든 뒤 꼭 휴대폰으로 찍어서 연결되는지 확인하세요.",
        ]],
        ["다른 방법과 비교", [
          "안드로이드 휴대폰은 설정의 네트워크 및 인터넷 > 인터넷에서 연결된 와이파이를 고르고 '공유'를 누르면 그 자리에서 QR코드를 보여 줘요(기종에 따라 메뉴 이름이 다를 수 있어요). 옆 사람에게 바로 보여 줄 때는 그쪽이 빠르고, 매장에 붙여 둘 인쇄용 QR 파일이 필요하면 이 도구가 편해요.",
          "아이폰은 기본 카메라 앱으로 QR코드를 비추면 화면에 링크가 나타나요. 인쇄하기 전에 아이폰과 안드로이드 둘 다로 찍어 보면 더 안심이에요.",
          "유료 QR 서비스 중에는 중간 주소를 거치게 해서 나중에 연결 링크를 바꾸거나 스캔 횟수를 보여 주는 '동적 QR'을 제공하는 곳이 있어요. 이 도구는 중간 주소 없이 내용을 그대로 담는 '정적 QR'이라 기한이나 구독이 없는 대신, 나중에 내용을 바꾸거나 스캔 수를 볼 수는 없어요.",
        ]],
        ["주의할 점·한계", [
          "담을 수 있는 양에 한계가 있어요. 이 설정(오류 복원 M)에서 QR 규격상 최대치는 영문 기준 약 2,300자, 한글은 한 글자가 3바이트라 약 770자예요. 그보다 짧아도 내용이 길수록 코드가 촘촘해져 작게 인쇄하면 잘 안 찍히니, 긴 글은 링크로 바꿔 넣는 게 좋아요.",
          "코드 가운데에 로고를 넣는 기능은 없어요.",
          "와이파이 QR에는 비밀번호가 그대로 들어가요. QR 스캐너 앱에 따라 비밀번호가 글자로 보일 수 있으니, 손님용 와이파이를 따로 만들어 그 정보를 넣는 게 안전해요. 이름을 숨긴 와이파이(숨김 네트워크) 설정은 지원하지 않아요.",
        ]],
      ],
      faq: [
        ["만든 QR코드를 나중에 수정할 수 있나요?", "아니요. 내용이 코드 안에 직접 들어가서, 바꾸려면 새로 만들어야 해요. 인쇄하기 전에 휴대폰으로 꼭 한 번 찍어 보세요."],
        ["QR코드를 찍으려면 앱이 따로 필요한가요?", "요즘 휴대폰은 대부분 기본 카메라 앱으로 QR코드를 읽어요. 아이폰은 카메라 앱이나 제어 센터의 코드 스캐너로 찍을 수 있어요."],
        ["스캔 횟수를 알 수 있나요?", "아니요. 중간에 거치는 서버가 없어서 누가 몇 번 찍었는지 기록되지 않아요. 방문 수를 보고 싶다면 QR에 넣는 링크 자체를 방문 통계를 볼 수 있는 주소로 만들어 넣어야 해요."],
        ["PNG 배경을 투명하게 할 수 있나요?", "배경은 항상 고른 배경 색으로 채워져요. 투명 배경이 필요하면 SVG를 받아 디자인 프로그램에서 배경 사각형을 지우면 돼요."],
      ],
      tips: [
        "와이파이 QR은 대부분의 휴대폰에서 카메라로 찍기만 하면 비밀번호를 입력하지 않고 연결돼요.",
        "링크가 길수록 코드가 촘촘해져요. 작게 인쇄할 거라면 짧은 주소를 쓰세요.",
        "코드 주변 흰 여백은 인식에 필요하니 잘라내지 마세요.",
      ],
    },
    en: {
      intro: [
        "This tool creates QR codes for links, text or Wi-Fi details. They're great for business cards, flyers, café tables and event signs.",
        "Change the code and background colors, and download a PNG (256, 512, 1024 or 2048px) or an SVG for print. The preview updates as you type, so you can adjust the content while you watch.",
        "The content is encoded directly in the code, with no server in between — so codes you've made keep working even if this site ever went away.",
      ],
      sections: [
        ["When it comes in handy", [
          "A Wi-Fi QR code on café or shop tables means customers don't have to ask for the password or type it in.",
          "Put your website, booking page or social profile on business cards and flyers as a QR code so people don't have to type the address.",
          "Add sign-up or survey links to event signs and posters so people can join in on the spot.",
          "It can hold plain text too, like a short note or contact details. How the text appears after scanning varies a little between phone camera apps.",
        ]],
        ["Choosing the settings", [
          "Codes use error correction level 'M' from the QR standard, which can recover from roughly 15% damage. That helps a printed code survive scuffs and smudges, but covering a large part of it with a logo or sticker can stop it scanning.",
          "PNG comes in 256, 512, 1024 or 2048px, with 1024px as the default. For web pages and chats, 512px or 1024px is plenty; for very large prints like banners, or for use in design software, SVG is best.",
          "A margin four modules wide is added around the code automatically. It's the quiet zone the QR standard calls for, so keep it when you place the code in a design.",
          "On the Wi-Fi tab, choose WPA/WPA2, WEP or None. It has to match your router's setting to connect, so scan the code with a phone afterwards to make sure it joins.",
        ]],
        ["How it compares to other options", [
          "On many Android phones you can open Settings > Network & internet > Internet, tap your Wi-Fi network and tap Share to show a QR code on screen (menu names vary by phone). That's quickest for showing someone next to you; for a printable code to stick on the wall, this tool gives you a file.",
          "On iPhone, pointing the built-in Camera app at a QR code shows the link on screen. Before printing, it's reassuring to test with both an iPhone and an Android phone.",
          "Some paid QR services offer 'dynamic' codes that route through a short redirect link, letting you change the destination later or see scan counts. This tool makes 'static' codes that hold the content directly — no expiry and no subscription, but no editing or scan stats either.",
        ]],
        ["Things to keep in mind", [
          "There's a limit to how much fits. At this error correction level the QR standard allows up to about 2,300 characters of plain English text (fewer for characters that take more bytes). Well before that, longer content makes a denser code that struggles when printed small, so use a link for anything long.",
          "There's no option to add a logo in the middle.",
          "A Wi-Fi code contains the password as is, and some QR scanner apps display it as text. A separate guest network is the safer thing to share. Hidden networks aren't supported.",
        ]],
      ],
      faq: [
        ["Can I edit a QR code later?", "No. The content is inside the code itself, so you'll need to make a new one. Always test-scan with a phone before printing."],
        ["Do people need an app to scan it?", "Most modern phones read QR codes with the built-in camera app. On iPhone you can use the Camera app or the Code Scanner in Control Center."],
        ["Can I see how many times it was scanned?", "No. There's no server in the middle, so scans aren't recorded. If you want visit stats, put a link in the code that you can track on your own website or analytics."],
        ["Can the PNG have a transparent background?", "The background is always filled with your chosen color. For transparency, download the SVG and delete the background rectangle in a design app."],
      ],
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
