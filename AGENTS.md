# AGENTS.md — Intelligent Meeting Management System (IMMS)

Repo instructions for coding agents. Keep it simple, consistent, and safe.

---

## 0) Prime Directive (Non‑Negotiables)

1) Client-direct transcription only
- Live audio is handled strictly in the browser.
- Flow: Browser (AudioWorklet/Media) → Google STT WebSocket.
- Backend/services must never proxy raw live audio streams.

2) Server responsibilities
- Data + orchestration + post‑meeting intelligence (summaries, action items, RAG indexing, reports).
- No live audio processing.

3) Taglish-first
- Preserve Taglish as spoken.
- Do NOT “correct” Tagalog into English unless explicitly asked.
- When improving clarity, do it in summaries, not by rewriting the raw transcript.

4) Appwrite is the source of truth
- Appwrite Databases/Auth/Teams/Permissions govern access.
- If a user edits transcript text, the latest stored version is authoritative.

5) Security
- Never commit secrets.
- Never log raw tokens / API keys.
- LLM calls must run server-side (functions/service), never from the browser.

---

## 1) Commands (Frontend)

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

Before “done”:
- Run `npm run typecheck` + `npm run lint` + `npm run build` (fix relevant failures only).

---

## 2) Repo Map (Current + Planned)

Current:
```
root/
├── src/
│   ├── app/              # Next.js App Router (route groups)
│   │   ├── (app)/        # Main app routes (dashboard, meetings, etc.)
│   │   ├── (auth)/       # Auth routes (login)
│   │   ├── (fullscreen)/ # Full-screen experiences (meeting-room, recording)
│   │   └── (marketing)/  # Landing/marketing pages
│   ├── components/
│   │   ├── features/     # Feature-specific components
│   │   ├── providers/    # Context providers (theme, etc.)
│   │   ├── shared/       # App shell, nav, banners
│   │   ├── shell/        # Layout primitives (Screen, Panel, PrimaryAction)
│   │   └── ui/           # shadcn-style UI primitives
│   ├── features/         # Business logic + feature pages
│   ├── hooks/            # Cross-feature hooks (use-mobile, use-swipe, etc.)
│   └── lib/              # Utilities
├── public/               # Static assets, PWA manifest, service worker
├── docs/                 # Documentation (MOBILE_TESTING.md, etc.)
├── notes/                # Reference materials
└── AGENTS.md
```

Planned (when backend code starts):
```
root/
├── src/                  # (unchanged)
├── services/
│   ├── ai/               # Agno multi-agent workflows (Python)
│   ├── appwrite/         # provisioning + server-only helpers
│   └── conferencing/     # plugNMeet integration (future)
├── scripts/
│   └── appwrite/         # provision/migrations
└── ...
```

Rule:
- Never put backend/service code inside `src/`.

---

## 3) Frontend Structure (Anti‑Clutter)

- Keep `src/app/**` route files thin (composition only).
- Business UI/logic lives in `src/features/**`.
- Shared shell/navigation stays in `src/components/shared/**` (keep it small).
- UI primitives in `src/components/ui/**` (shadcn style).
- Layout primitives in `src/components/shell/**` (Screen, Panel, PrimaryAction).
- Feature-specific components in `src/components/features/**`.
- Context providers in `src/components/providers/**`.
- Cross-feature hooks: `src/hooks/**`.
- Utilities: `src/lib/**`.

Route groups:
- `(app)/` — Main authenticated app routes
- `(auth)/` — Authentication flows
- `(fullscreen)/` — Immersive experiences (meeting room, recording)
- `(marketing)/` — Landing and public pages

Do not add React Router. Use Next App Router only.

---

## 4) Appwrite (Mandatory Usage Rules)

Appwrite permissions + roles are the access control system. Use teams/roles and document permissions. :contentReference[oaicite:0]{index=0}

### SDK usage
- All Appwrite calls must go through wrappers in `src/lib/appwrite/*`.
- No direct Appwrite SDK calls scattered across features.

### Schema strategy (Versioned collections)
- Never change a “live” collection schema in-place.
- Any schema change => create a new collection version:
  - `meetings_v1` → `meetings_v2`
- Keep old versions read-only for legacy reads/migrations.

### Immutable content rule (important)
- Do not overwrite raw transcripts/summaries.
- Use versioning:
  - `transcript_versions_v1` with `supersedesId`, `version`, `isCurrent`
  - `summary_versions_v1` same idea
- Allowed in-place updates: `status`, `processingState`, timestamps, error info.

### Permission patterns (required)
- Meeting documents: readable by meeting members/team; writable by organizers/admins.
- Role-based summaries: each user summary document must be readable only by:
  - that user (+ optionally org admin) via document permissions.

---

## 5) Meeting Lifecycle (Contracts)

Meeting statuses (suggested):
- `scheduled` → `recording` → `processing` → `ready` (or `failed`)

At end of meeting:
- Client finalizes transcript segments upload.
- Client sets meeting `status=processing`.
- Server pipeline generates:
  - meeting summary
  - action items / decisions
  - report output (if requested)
  - series state update (if in series)

---

## 6) Mobile + PWA (Required)

Baseline:
- Every screen must work at 360×640 without horizontal scroll.
- Touch targets >= 44×44px; inputs font-size >= 16px on mobile.

No duplicated routes:
- Do not create `/mobile` routes. One route tree only.

Required layout primitives (already implemented in `src/components/shell/`):
- `Screen` — safe-area + scroll + spacing
- `PrimaryAction` — mobile FAB / desktop button
- `Panel` — mobile sheet / desktop side panel

Additional UI primitives (in `src/components/ui/`):
- `ResponsiveTable` — desktop table / mobile cards

Cross-feature hooks (in `src/hooks/`):
- `use-mobile` — responsive breakpoint detection
- `use-swipe` — touch gesture handling
- `use-long-press` — long-press gesture
- `use-viewport` — viewport dimensions
- `use-user-media` — camera/microphone access

### Connectivity reality (mobile)
- When internet drops, live transcription stops (WebSocket). UX must show this clearly.

Offline strategy (choose one, be explicit):
A) Strict privacy mode (default)
- No offline audio storage.
- If offline, show “Transcription paused — internet required”. User may continue meeting but transcript will have a gap marker.

B) Resilient mode (opt-in)
- Temporarily buffer audio chunks in IndexedDB while offline.
- On reconnect, upload only missing chunks for post-meeting “gap recovery” transcription.
- Auto-delete buffered audio after successful recovery.
- Never cache audio via service worker.

---

## 7) AI / Agents (Agno)

We use Agno for multi-agent workflows (agents/teams/workflows, memory/knowledge, etc.). :contentReference[oaicite:1]{index=1}

Rules:
- LLM calls happen server-side only (services/functions).
- All outputs must be stored with provenance:
  - model id
  - prompt/version
  - inputs used (meeting id + series id + chunk ids)
- Do not rewrite raw transcript; produce “normalized” views separately if needed.

### Agent roles (planned)
- Transcript QA Agent: validates segments, flags low-confidence spans, adds gap markers.
- Entity Resolver Agent: maps speaker names to org directory (Appwrite users/teams) without altering raw text.
- Summarizer Agent: produces meeting summary + decisions + action items.
- Series Memory Agent: updates rolling series state.
- Template Selector Agent (RAG): selects best report template from stored templates.
- Role Personalizer Agent: generates per-user summary views (permissions enforced).

---

## 8) Meeting Series (Required)

- Support manual series linking (must-have).
- Optionally auto-suggest series by:
  title similarity + participant overlap + time pattern.

Series state:
- Rolling summary, open action items, decision log, topic threads.

---

## 9) Plug‑N‑Meet (Future Integration)

Plug‑N‑Meet is a self-hostable open-source web conferencing system. :contentReference[oaicite:2]{index=2}

Rules:
- Treat conferencing as a provider module (`services/conferencing/*`).
- Meeting record stores `conferenceProvider` + `roomId` + join metadata.
- Conferencing must not be required for transcription/summarization to function.

---

## 10) Quality Bar

A change is done when:
- It respects Prime Directive.
- It does not introduce new 800–1000 line pages (split into feature modules).
- It updates docs/contracts if flows change.
- It passes lint/typecheck/build for frontend.
