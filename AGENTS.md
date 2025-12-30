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

### Breakpoints (standard)
- Mobile: `< 768px` (`md` breakpoint)
- Tablet: `768–1023px`
- Desktop: `>= 1024px`

### Touch target standards
- Minimum tap target: **44×44px** (buttons, icons, list rows, close controls).
- Critical call controls (mic/camera/leave): prefer **56px** button height on mobile.
- Inputs on mobile must be `>= 16px` font-size to prevent iOS zoom-on-focus.

### Navigation rule (no duplicated pages)
- Do NOT create separate “/mobile” routes.
- Use one App Router tree; mobile vs desktop differences live in the **shell/navigation components** only.

### Navigation patterns (implemented)
- Desktop primary navigation: left sidebar (`src/components/shared/sidebar.tsx`), visible at `md+`.
- Mobile primary navigation: bottom tabs (`src/components/shared/bottom-nav.tsx`), visible below `md`.
- Mobile secondary navigation: hamburger + drawer (`src/components/shared/nav-drawer.tsx`).
- Route files stay thin; mobile/desktop deltas happen in the shell (`src/components/shared/app-shell.tsx`) and UI components.

### Modal patterns (implemented)
- Use **Sheet** for mobile-first overlays (`src/components/ui/sheet.tsx`):
  - Mobile: full-screen slide-up sheet (`h-dvh`), safe-area aware
  - Desktop: centered dialog-style panel
- Avoid bespoke, page-local modal stacks; prefer shared primitives.

### Layout primitives (Required for all screens)

**All new screens must use standardized layout components:**

1. **Screen container** (`src/components/shell/screen.tsx`)
   - Wrap all page content in `<Screen>`
   - Use `<Screen.Header>` for page title/description
   - Use `<Screen.Content>` for main content
   - Variants: `fullWidth` (edge-to-edge), `noPadding` (custom layout)
   - **Do NOT** manually add padding/background divs

2. **Primary actions** (`src/components/shell/primary-action.tsx`)
   - Use `<PrimaryAction>` for main page actions (New, Create, Add)
   - Mobile: renders as FAB (bottom-right, above bottom-nav)
   - Desktop: renders as inline button
   - **Do NOT** create custom FABs or sticky CTAs per page

3. **Secondary surfaces** (`src/components/shell/panel.tsx`)
   - Use `<Panel>` for details, filters, settings
   - Mobile: full-screen sheet
   - Desktop: side panel (left/right, fixed/overlay)
   - **Do NOT** use raw `<Sheet>` for page-level panels (Sheet is for dialogs/modals only)

4. **Data display** (`src/components/ui/responsive-table.tsx`)
   - Use `<ResponsiveTable>` for lists/tables
   - Desktop: table layout
   - Mobile: stacked cards
   - Enable virtualization for large datasets (`virtualizeMobile={true}`)

**Enforcement:**
- Route files (`src/app/**/page.tsx`) must only import feature pages
- Feature pages (`src/features/**/`) must use these primitives
- Code reviews must reject manual layout implementation

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

### Connectivity + install UX (implemented)
- Offline indicator banner: `src/components/shared/offline-banner.tsx`
- Install prompt banner (mobile-only): `src/components/shared/install-prompt.tsx`
- Transcription banner: `src/components/features/mobile-transcription-banner.tsx`

### PWA update strategy (required behavior)
- Service worker lives at `public/sw.js` and must be treated as a **release artifact**.
- When changing offline behavior or cache policy, bump cache keys in `public/sw.js` (e.g., `synthia-shell-v2`) to force refresh.
- Expect update semantics: users may need a reload to pick up new cached assets.
- Never cache audio/video streams (and never store them offline) — this is a hard requirement.
