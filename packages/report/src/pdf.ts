import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { ReportJson } from "./reportSchema";

export interface PdfReportOptions {
  sessionId: string;
  protocolVersion: string;
  deviceScore: number;
  report: ReportJson;
}

export const buildPdfReport = async ({ sessionId, protocolVersion, deviceScore, report }: PdfReportOptions) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const title = "Dikkat — Clinician Report";
  page.drawText(title, { x: 50, y: 780, size: 20, font, color: rgb(0.2, 0.2, 0.4) });
  page.drawText(`Session ID: ${sessionId}`, { x: 50, y: 750, size: 12, font });
  page.drawText(`Protocol: ${protocolVersion}`, { x: 50, y: 732, size: 12, font });
  page.drawText(`Device Quality Score: ${deviceScore}`, { x: 50, y: 714, size: 12, font });

  page.drawText("Executive Summary", { x: 50, y: 680, size: 14, font, color: rgb(0.2, 0.2, 0.4) });
  page.drawText(report.executiveSummary, { x: 50, y: 660, size: 10, font, maxWidth: 500 });

  page.drawText("Interpretation (Non-diagnostic)", { x: 50, y: 620, size: 14, font, color: rgb(0.2, 0.2, 0.4) });
  page.drawText(report.interpretation, { x: 50, y: 600, size: 10, font, maxWidth: 500 });

  page.drawText("Limitations", { x: 50, y: 560, size: 14, font, color: rgb(0.2, 0.2, 0.4) });
  page.drawText(report.limitations, { x: 50, y: 540, size: 10, font, maxWidth: 500 });

  page.drawText("Recommendations", { x: 50, y: 500, size: 14, font, color: rgb(0.2, 0.2, 0.4) });
  page.drawText(report.recommendations, { x: 50, y: 480, size: 10, font, maxWidth: 500 });

  page.drawText(
    "This is a performance-based assessment and is not a medical diagnosis.",
    { x: 50, y: 440, size: 10, font, color: rgb(0.6, 0.1, 0.1) }
  );

  return await pdfDoc.save();
};
