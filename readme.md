# Synthia (IMMS) — Frontend

Synthia is an **Intelligent Meeting Management System** UI: a mobile-first web app where meetings turn into usable outputs (summaries, action items, and searchable knowledge) without asking people to change how they talk.

This repo is the **Next.js frontend**. It focuses on the product experience (navigation, screens, PWA/offline, and the meeting UI shell) and enforces a strict transcription architecture contract.

## What this repo is

- A **Next.js App Router** application (`src/app`) with feature-first modules (`src/features`).
- A **mobile-first shell** (desktop sidebar, mobile bottom tabs, drawer nav) with safe-area support.
- A **PWA baseline**: `manifest.webmanifest`, a production-only service worker, offline route, and install prompt.
- A set of meeting-related screens (dashboard, meetings, meeting history, meeting room UI, recording UI, summaries, etc.).

## What this repo is not

- Not a production backend (there is a `backend/` folder, but it’s out of scope for this frontend).
- Not a server-side audio pipeline.
- Not a place to "just proxy audio through an API" because it’s easier.

If you’re looking for the rules we *refuse* to break (and why), read **AGENTS.md**.

## The non-negotiables (please don’t fight these)

This project has a few design constraints that are easy to accidentally violate:

1. **Client-direct transcription only**
	- Live audio must be handled strictly in the browser.
	- Intended flow: **Browser (AudioWorklet) → Google STT WebSocket**.
	- Backend must **never** proxy raw audio streams.

2. **Backend is intelligence + data management**
	- Summarization, action items, embeddings + vector search, orchestration.
	- No live audio processing.

3. **Taglish-first**
	- Preserve Taglish as spoken.
	- Don’t auto-translate or “clean up” Tagalog → English unless the user explicitly asks.

4. **Supabase is the source of truth**
	- If the transcript is edited in the UI, DB state overrides caches/derived results.

5. **Security**
	- No secrets in code or commits.
	- Never log raw access tokens / API keys.

## Quick start

Prereqs:
- Node.js **18.18+** (or newer)

Install + run:

```bash
npm install
npm run dev
```

Then open:
- http://localhost:3000

## Useful scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — start the production server (run `build` first)
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript (no emit)

## PWA + offline behavior

- Service worker lives at `public/sw.js` and registers **only in production**.
- Offline fallback route is `/offline`.
- The service worker intentionally **bypasses caching for audio/video** (we never cache or store raw media).

If you change cache policy, bump the cache keys in `public/sw.js` (example: `synthia-shell-v2`).

## Mobile-first expectations

This UI is expected to work at **360×640** without horizontal scroll.

Before calling something “done”, run through the checklist in:
- `docs/MOBILE_TESTING.md`

Navigation patterns are already set up:
- Desktop sidebar at `md+`
- Mobile bottom tabs below `md`
- Mobile drawer for secondary navigation

## Project structure (how we keep it tidy)

High-level layout:

```text
src/
  app/            # Next.js routes (keep these thin)
  features/       # feature-first pages + domain logic
  components/
	 shared/       # app shell: header/sidebar/bottom nav/offline/install banners
	 shell/        # required layout primitives (Screen/Panel/PrimaryAction)
	 ui/           # UI primitives (shadcn-style)
  hooks/
  lib/
public/
  sw.js
  manifest.webmanifest
legacy/           # archived Vite frontend (do not extend)
backend/          # legacy backend folder (out of scope here)
```

Important convention:
- Route files in `src/app/**` should mostly compose feature pages from `src/features/**`.

## Transcription UX notes

This repo includes a persistent mobile transcription banner (`src/components/features/mobile-transcription-banner.tsx`) that is designed to keep a “Recording/Transcribing” state visible.

Today, some meeting/transcription screens are **UI shells** (placeholders for real capture + streaming). That’s intentional: the contract is defined first, then the plumbing gets connected carefully.

If you implement live transcription, follow the contract:
- capture in browser
- stream directly to Google STT
- send only finalized segments to the backend for persistence + post-processing

## Contributing

If you’re adding screens or flows:

- Keep `src/app/**` thin; place real logic in `src/features/**`.
- Use the layout primitives in `src/components/shell/**` (don’t hand-roll page padding and panels).
- Avoid desktop-only interaction patterns; this is a mobile-first app.

If you’re about to do anything with audio, read **AGENTS.md** first.