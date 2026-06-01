# CLAUDE.md

## Project Purpose

`n8n-nodes-youtube-transcripts-api` is an [n8n](https://n8n.io/) community node that extracts YouTube transcripts, subtitles, and captions by running the [YouTube Transcript & Subtitles Scraper](https://apify.com/johnvc/YoutubeTranscripts) Actor (`zPumutvB61fpEsglh`) on [Apify](https://apify.com). It accepts single or bulk URLs and is usable as a tool in n8n AI Agent workflows.

This repo was scaffolded from `apify/n8n-nodes-apify-template` and then customized into a single published node. It is **not** a generator — the template's generator tooling (`scripts/`) has been removed.

## Repository Structure

```
nodes/ApifyYoutubeTranscripts/
  ApifyYoutubeTranscripts.node.ts         # INodeType: metadata + execute()
  ApifyYoutubeTranscripts.properties.ts   # UI params: resource/operation, youtube_url, Output mode, field picker
  ApifyYoutubeTranscripts.node.json       # codex: categories + alias (discoverability)
  helpers/executeActor.ts                 # run the Actor, poll, shape output per Output mode
  helpers/genericFunctions.ts             # authenticated Apify API requests, polling, dataset fetch
  logo.svg                                # node icon (must be SVG)
credentials/
  ApifyApi.credentials.ts                 # API-key auth
  ApifyOAuth2Api.credentials.ts           # OAuth2 (PKCE) auth
.github/workflows/ci.yaml                 # lint -> tsc --noEmit -> build, on push/PR to main
```

## Technology Stack

- TypeScript; build with **Node 22** (Node 20 fails `n8n-node build` with `ERR_REQUIRE_ESM`).
- `@n8n/node-cli` for build/dev/lint.
- Peer dependency `n8n-workflow`. **No runtime `dependencies`** — everything is a devDependency (required for n8n verification).

## Build, Test & Run

```bash
nvm use 22                   # required; CI uses Node 22
npm install
npm run build                # n8n-node build -> dist/
npm run dev                  # launches n8n at http://localhost:5678 with this node loaded
npm run lint                 # n8n-node lint (must be clean for verification)
npm run lint:fix
```

CI (`.github/workflows/ci.yaml`) runs lint → `tsc --noEmit` → build on every push/PR to `main`, on Node 22.

## Key Facts

- **Actor:** `zPumutvB61fpEsglh` (`johnvc/YoutubeTranscripts`), hardcoded as `ACTOR_ID` in the node.
- **Input:** a single `youtube_url` field (string or array) — the Actor's only input.
- **Output modes** (the `Output` param): `Simplified` (default → `{ video_id, language, transcript }`), `Raw` (all fields), `Selected Fields` (multi-select picker). When the node runs as an AI Agent tool, Simplified is forced (see `isUsedAsAiTool`).
- **Output field keys** come from the Actor's dataset schema (`.actor/dataset_schema.json` in the Actor repo): `url, video_id, language, language_code, is_generated, is_translatable, translation_languages, total_seconds, timestamped, non_timestamped, timestamp, success, error, error_message, error_type`. `non_timestamped` is the full transcript text; Simplified mode exposes it as `transcript`.
- **Only `dist/` ships to npm** (`files: ["dist"]`).
- **Goal:** publish to npm and pass n8n's verified-community-node review.

## Conventions

- Throw `NodeApiError`/`NodeOperationError`, never raw errors; include `{ itemIndex }` for errors raised inside the execute item loop. Keep the words error/problem/failure/mistake out of user-facing messages.
- The node icon must be an SVG (`logo.svg`) — n8n lint rejects raster icons.
- Keep `dependencies` empty.
- Adjust discoverability via `categories` and `alias` in `ApifyYoutubeTranscripts.node.json`.
