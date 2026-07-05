# CLAUDE.md — monkcode-dev working agreement

## Non-negotiables

- **TDD for behavior changes**: failing test first, then implementation. Visual-only changes
  are exempt but require both-theme verification AND `pnpm test:visual` (Playwright suite in
  `tests/visual.spec.ts`; baselines are local-only — `pnpm test:visual:update` regenerates).
- **`pnpm check` must pass before every commit** (typecheck, astro check, biome, unit tests).
  After changing anything the build serves, also run `pnpm build && pnpm test:build`.
- **Copy lives only in `src/data/`** (`copy.en.ts`, `copy.nl.ts`, `site.ts`). Never hardcode
  user-facing text in components. Both locales change together — the parity test enforces
  structure.
- **Facts are bounded** by the spec's verified fact base
  (`docs/superpowers/specs/2026-07-05-monkcode-dev-website-design.md` §3). Never invent
  projects, claims, numbers, or contact details. The fact-guard tests are load-bearing;
  do not weaken them to make a change pass.

## Brand rules

- Monk Yellow `#FFDE0A` is an accent only: CTAs, ticks, highlights. Never yellow body text,
  never yellow-on-white for meaning-bearing elements. Contrast AA minimum.
- Style through the theme vars `--surface/--ink/--ink-muted/--accent` so dark AND light
  themes work; verify both before claiming a visual change done.
- Fonts are fixed: Montserrat (display), Inter (body), JetBrains Mono (mono).
- Honor `prefers-reduced-motion` for any new animation.

## Engineering

- No new runtime dependencies without clear justification — this site ships near-zero JS by
  design (two Vue islands).
- Vue islands must be SSR-safe: no `document`/`window` access outside `onMounted`.
- Deploys: push to `main` → Vercel git integration deploys production. Don't deploy with
  the CLI unless the git integration is broken.
