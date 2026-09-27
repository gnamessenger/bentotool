import { TU, orderedTool } from "../common.js";

const { PDFDocument } = window.PDFLib;

orderedTool({
  accept: "application/pdf,.pdf",
  buttonLabel: TU.make,
  outName: `${TU.outName}.pdf`,
  minFiles: 2,
  minMsg: TU.needTwo,
  async meta(file) {
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      return `${doc.getPageCount()} ${TU.pages}`;
    } catch {
      return TU.encrypted;
    }
  },
  async build(files) {
    const merged = await PDFDocument.create();
    for (const file of files) {
      let src;
      try {
        src = await PDFDocument.load(await file.arrayBuffer());
      } catch {
        throw new Error(`${file.name} — ${TU.encrypted}`);
      }
      const pages = await merged.copyPages(src, src.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }
    return new Blob([await merged.save()], { type: "application/pdf" });
  },
});
