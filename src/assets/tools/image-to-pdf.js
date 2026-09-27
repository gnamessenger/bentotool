import { TU, orderedTool, field, select, loadImage, toCanvas } from "../common.js";

const pageSize = select([["fit", TU.fit], ["a4", TU.a4]]);
const MAX_SIDE = 2500;   // 너무 큰 사진은 줄여서 PDF 용량을 관리
const A4 = [595.28, 841.89];
const MARGIN = 24;

orderedTool({
  accept: "image/*",
  options: [field(TU.pageSize, pageSize)],
  buttonLabel: TU.make,
  outName: `${TU.outName}.pdf`,
  async build(files) {
    const { jsPDF } = window.jspdf;
    let doc = null;
    for (const file of files) {
      const img = await loadImage(file);
      const s = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const w = Math.round(img.width * s), hgt = Math.round(img.height * s);
      const data = toCanvas(img, w, hgt, "#FFFFFF").toDataURL("image/jpeg", 0.9);

      if (pageSize.value === "fit") {
        const pw = img.width * 0.75, ph = img.height * 0.75;   // px → pt (96dpi)
        const orient = pw > ph ? "l" : "p";
        if (!doc) doc = new jsPDF({ unit: "pt", format: [pw, ph], orientation: orient });
        else doc.addPage([pw, ph], orient);
        doc.addImage(data, "JPEG", 0, 0, pw, ph);
      } else {
        const [pw, ph] = A4;
        if (!doc) doc = new jsPDF({ unit: "pt", format: "a4", orientation: "p" });
        else doc.addPage("a4", "p");
        const k = Math.min((pw - MARGIN * 2) / w, (ph - MARGIN * 2) / hgt);
        const dw = w * k, dh = hgt * k;
        doc.addImage(data, "JPEG", (pw - dw) / 2, (ph - dh) / 2, dw, dh);
      }
    }
    return doc.output("blob");
  },
});
