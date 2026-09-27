// 사이트 전체 설정 — 이름·도메인·광고는 여기만 고치면 전체 페이지에 반영돼요.
export const config = {
  domain: "https://bentotool.com",   // 도메인 구매 후 확정
  name: { ko: "벤토툴", en: "BentoTool" },

  // 검색엔진 소유권 확인용 코드 (구글 서치콘솔·네이버 서치어드바이저의 "HTML 태그" content 값)
  verify: { google: "FaPamoQVMZjes4f4_X2-MeLNNxnu2NcGe6pQE8Z2KxA", naver: "" },

  // 구글 애드센스 승인 후 "ca-pub-..." 값을 넣으면 광고 자리에 광고가 나와요. null이면 광고 자리가 안 보여요.
  adsenseClient: null,
  adSlots: { top: "", bottom: "" },   // 애드센스에서 만든 광고 단위 ID

  // 내 상품·제휴 배너. null이면 안 보여요.
  // 예: { title: "...", text: "...", cta: "자세히 보기", url: "https://..." }
  promo: { ko: null, en: null },
};
