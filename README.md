# Dikkat — Multimodal Attention Assessment (Web-first)

> **Non-diagnostic performance assessment.** This system provides a scientific, performance-based attention assessment for adults 17–40. It is not a medical diagnosis. It supports decision-making and encourages professional evaluation when warranted.

## Monorepo Layout
```
/apps
  /web        React + Vite client
  /server     Node + Express API
  /electron   Optional Electron wrapper
/packages
  /core       Task engine, schemas, metrics
  /sensors    Camera/gaze/rPPG/mic modules
  /report     PDF + HTML report generation
```

## Local Development
```bash
npm install
npm run dev:web
npm run dev:server
```

## Performance Notes & Browser Constraints
- Timing relies on `performance.now`, `requestAnimationFrame`, and scheduled WebAudio; frame drop metrics are logged for every block.
- rPPG and heavy computations run in Web Workers; use modern browsers (Chrome/Edge/Safari latest).
- For ultra-precise timing or clinical environments, build the Electron wrapper to reduce jitter.

## Ethics & Privacy Defaults
- **No raw video/audio stored by default.** Only derived features + anonymized event logs are retained.
- Explicit consent screens must be acknowledged before any sensor access.
- Data retention controls are exposed in the UI and through the server API.

## OpenAI API Key
Set `OPENAI_API_KEY` in the server environment to enable adaptive tuning and report narrative generation.

```bash
export OPENAI_API_KEY=sk-...
```

## Demo Mode
Development/testing can be run without camera/mic using the built-in **Demo Mode** toggle on the landing page.

## API Endpoints (Server)
- `POST /session/start` — validate session metadata + issue session token.
- `POST /session/events` — ingest derived features and event logs.
- `POST /report/generate` — generate clinician PDF report (requires Report JSON payload).
- `POST /report/summary` — generate a user-friendly HTML summary.

## Electron Wrapper (Optional)
The Electron app loads the web build and enables higher timing confidence and optional local filesystem export.

```bash
npm --workspace apps/electron run dev
```

## Disclaimer
This is a performance-based assessment only. It **does not** provide medical diagnosis.
