// 사이트 전체 설정 — 이름·도메인·광고는 여기만 고치면 전체 페이지에 반영돼요.
export const config = {
  domain: "https://bentotool.com",   // 도메인 구매 후 확정
  name: { ko: "벤토툴", en: "BentoTool" },
  contact: "aurasalesedu@gmail.com",   // 문의 이메일 (푸터·개인정보처리방침에 표시)

  // 검색엔진 소유권 확인용 코드 (구글 서치콘솔·네이버 서치어드바이저의 "HTML 태그" content 값)
  verify: { google: "FaPamoQVMZjes4f4_X2-MeLNNxnu2NcGe6pQE8Z2KxA", naver: "5c69044b719c940fa3668f9390e518f1aadfc9d2" },

  // 구글 애드센스 승인 후 "ca-pub-..." 값을 넣으면 광고 자리에 광고가 나와요. null이면 광고 자리가 안 보여요.
  adsenseClient: "ca-pub-2722446823587481",   // 2026-09-30 애드센스 가입, 심사 대기
  adSlots: { top: "", bottom: "" },   // 애드센스에서 만든 광고 단위 ID

  // 내 상품·안내 링크. null이면 안 보여요. 도구 설명 아래(푸터 위)에 한 줄짜리 안내 문장 + 글자 링크로 나와요.
  // (애드센스 광고와 헷갈리지 않도록 버튼·배너 모양은 쓰지 않아요)
  // 예: { text: "...", cta: "자세히 보기", url: "https://..." }
  promo: {
    ko: {
      text: "🔧 이 도구 사이트, 코딩 몰라도 AI로 만들었어요",
      cta: "무료로 만드는 법 보기",
      url: "https://salesscript-mauve.vercel.app/store.html#free-list",
    },
    en: null,   // 영어 페이지는 광고만 둘 예정
  },
};
