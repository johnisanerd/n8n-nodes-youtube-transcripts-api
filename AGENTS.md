# AGENTS.md

Guidance for AI coding agents working in this repository lives in [CLAUDE.md](CLAUDE.md).

In short: this is the **`n8n-nodes-youtube-transcripts-api`** community node, which runs the Apify YouTube Transcript & Subtitles Scraper Actor (`zPumutvB61fpEsglh`). Build and lint with **Node 22** (`nvm use 22`); `npm run build`, `npm run dev`, `npm run lint`. Only `dist/` ships to npm; keep runtime `dependencies` empty. See [CLAUDE.md](CLAUDE.md) for the Actor's input/output schema, the `Output` modes, and node conventions.
