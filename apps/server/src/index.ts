import express from "express";
import { SessionMetadataSchema } from "@dikkat/core";
import { ReportJsonSchema, buildPdfReport, buildUserSummaryHtml } from "@dikkat/report";

const app = express();
app.use(express.json({ limit: "5mb" }));

app.post("/session/start", (req, res) => {
  const parsed = SessionMetadataSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  return res.json({ sessionToken: `session_${Date.now()}` });
});

app.post("/session/events", (req, res) => {
  // TODO: Persist anonymized event logs + derived features.
  return res.json({ ok: true });
});

app.post("/report/generate", async (req, res) => {
  const parsed = ReportJsonSchema.safeParse(req.body.report);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const pdfBytes = await buildPdfReport({
    sessionId: req.body.sessionId ?? "demo-session",
    protocolVersion: req.body.protocolVersion ?? "v0.1",
    deviceScore: req.body.deviceScore ?? 85,
    report: parsed.data
  });

  res.setHeader("Content-Type", "application/pdf");
  res.send(Buffer.from(pdfBytes));
});

app.post("/report/summary", (req, res) => {
  const parsed = ReportJsonSchema.safeParse(req.body.report);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const html = buildUserSummaryHtml(parsed.data);
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Dikkat server running on ${port}`);
});
