import type { ReportJson } from "./reportSchema";

export const buildUserSummaryHtml = (report: ReportJson) => `
  <section style="font-family: Inter, system-ui, sans-serif; padding: 24px;">
    <h1 style="margin-bottom: 4px;">Dikkat — User Summary</h1>
    <p style="color: #334155;">This is a performance-based assessment and not a medical diagnosis.</p>
    <h2 style="margin-top: 18px;">Executive Summary</h2>
    <p>${report.executiveSummary}</p>
    <h2 style="margin-top: 18px;">Highlights</h2>
    <ul>
      <li>Focus stability and response consistency are summarized in the CPT section.</li>
      <li>Multitasking performance is summarized in the Virtual Office section.</li>
      <li>Validity checks confirm signal quality and timing stability.</li>
    </ul>
    <h2 style="margin-top: 18px;">Recommendations</h2>
    <p>${report.recommendations}</p>
    <p style="color: #475569; margin-top: 18px;">
      If you have concerns about attention or cognitive performance, consider a professional evaluation.
    </p>
  </section>
`;
