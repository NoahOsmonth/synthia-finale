# Mobile Testing Guide (IMMS Frontend)

This project is mobile-first. Every change must be validated on small screens and notched devices.

## Viewport Testing

Test these sizes in DevTools device emulation:
- 360×640 (small Android)
- 375×667 (iPhone SE)
- 390×844 (iPhone 12/13/14)
- 414×896 (large iPhone)
- 768×1024 (tablet breakpoint)
- Landscape orientation for phone sizes

## Interaction Checklist

- No horizontal scroll at 360px width.
- All interactive controls meet 44×44px minimum tap target.
- Bottom navigation reachable with thumb; drawer opens/closes with tap + swipe.
- Sheets/drawers are dismissible (overlay tap + ESC on desktop).
- Forms: input font-size >= 16px on mobile (prevents iOS zoom on focus).
- Sticky footers don’t cover content; safe-area padding respected.

## PWA Checklist

- `public/manifest.webmanifest` loads and includes icons.
- Install prompt appears on mobile (when installable) and is dismissible.
- Service worker registers in production and caches shell assets.
- Offline mode:
  - Visit a page while online, then go offline.
  - Navigation falls back to `/offline` when needed.
- Updates:
  - Bump cache keys in `public/sw.js` when cache policy changes.
  - Reload picks up new assets without breaking the app.

## Device Notes

- iOS Safari:
  - Verify safe-area padding (`viewport-fit=cover`) and that controls stay tappable near notches/home indicator.
  - Microphone permission prompts must be handled gracefully.
- Android Chrome:
  - Verify install flow and offline banner behavior.

## Performance Sanity

- Long lists virtualize on mobile (meeting history, tasks, notifications) when large.
- Avoid heavy components in initial render; prefer lazy-loading where possible.

