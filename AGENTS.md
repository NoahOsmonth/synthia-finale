# AGENTS.md — Intelligent Meeting Management System (IMMS)

This file tells coding agents how to work in this repo: structure, rules, and the frontend contract that must not be broken.

---

## 0) Prime Directive (Non‑Negotiables)

1) **Client-direct transcription only**
- Live audio is handled strictly in the browser.
- Flow: **Browser (AudioWorklet) → Google STT WebSocket**
- Backend must **never** proxy raw audio streams.

2) **Backend is Intelligence + Data Management**
- Summarization, action items, RAG (vector search), CRUD, orchestration.
- No live audio processing.

3) **Taglish-first**
- Preserve Taglish as spoken.
- Do **not** “correct” Tagalog into English unless explicitly asked.

4) **Supabase is the source of truth**
- If a transcript is edited in UI, DB state overrides caches/derived results.

5) **Security**
- Never introduce secrets into code or commits.
- Never log raw access tokens / API keys.

---

## 1) Commands Agents Should Use

### Frontend (root Next.js app)
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

### “Before you say done”
- Frontend changes: run `npm run typecheck` + `npm run lint` + `npm run build` (fix only relevant failures).

---

## 2) Repo Map (Root Next.js Frontend)

```text
root/
├── src/                          # Next.js App Router + feature modules
├── public/                       # static assets (logos, videos, etc.)
├── legacy/                       # archived code (do not extend)
│   └── frontend-vite/            # legacy Vite frontend (slated for removal)
├── backend/                      # legacy backend folder (out of scope here)
├── package.json
└── AGENTS.md
```

---

## 3) Frontend Structure (Anti‑Clutter Rules)

### Goal: route files are thin; feature code is grouped (avoid “flat dumping”)

**Keep `src/app/**` thin**
- Route files should mostly compose feature modules (no giant pages).
- Prefer: `src/app/(app)/dashboard/page.tsx` → `src/features/dashboard/dashboard-page.tsx`

**Feature-first organization**
- Page/domain logic: `src/features/<feature>/...`
- Feature internals (when a feature grows): `src/features/<feature>/{components,hooks,lib,types}/...`
- Shared layout/navigation: `src/components/shared/...` (keep this small: shell, header, sidebar)
- UI primitives (shadcn-style): `src/components/ui/...`
- Reusable hooks (cross-feature): `src/hooks/...`
- Utilities: `src/lib/...`

**Do not re-introduce React Router**
- Navigation is Next.js App Router only (`next/link`, `next/navigation`).

---

## 4) Transcription Contract (Client ↔ Backend)

### Client responsibilities
- Capture audio, stream directly to Google STT.
- Convert interim results to finalized transcript “segments”.
- Send only finalized segments to backend for persistence.

### Backend responsibilities
- Store segments, associate with meeting/session.
- Trigger post-processing: summarization, action items, embeddings + pgvector indexing for RAG.

### Prohibited changes
- Do not add server-side audio streaming/proxying.
- Do not auto-translate Taglish transcripts.

## 5) Mobile + PWA (Mandatory)

### Mobile-first baseline
- Every new screen must work at **360×640** without horizontal scroll.
- Primary actions must be reachable on mobile (bottom/within thumb zone).
- Avoid desktop-only patterns on mobile:
  - Sidebars → **bottom tabs** or **sheet (drawer) nav**
  - Large tables → **stacked cards** or **row details sheet**
  - Dialogs → **full-screen sheet** on mobile
- Always respect notches: use safe-area padding (`env(safe-area-inset-*)`) in shells/footers.

### Navigation rule (no duplicated pages)
- Do NOT create separate “/mobile” routes.
- Use one App Router tree; mobile vs desktop differences live in the **shell/navigation components** only.

### Transcription on mobile (high-risk UX)
- Must handle: mic permission, interruptions, network drops, screen lock.
- UI must show a persistent “Recording/Transcribing” state (banner or docked bar).
- If a browser cannot support the required streaming path, show a clear “unsupported” UX.
- NEVER route raw audio through backend as a mobile workaround.

### Performance + usability
- Lists must be virtualized when large.
- Don’t trap users in modals; back/close must be obvious and reachable.
- Avoid sticky stacks that consume screen height on mobile (header+tabs+filters+banner).

### PWA requirements
- Keep app installable: `manifest.webmanifest`, icons, theme color, `display: standalone`.
- Add a service worker for:
  - shell caching
  - offline fallback screen for library browsing
- Never cache or store raw audio; transcripts/summaries only.