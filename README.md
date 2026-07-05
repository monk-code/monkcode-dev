# monkcode.dev

Source for [monkcode.dev](https://monkcode.dev) — the freelance website of Gregory Deseck
(MONKCODE): web development & responsible AI automation, Ghent.

Bilingual (EN at `/`, NL at `/nl/`), dark-first, static.

## Stack

Astro 5 · Tailwind CSS 4 (CSS-first theme) · Vue 3 islands · TypeScript (strictest) ·
Biome · Vitest + Testing Library · GitHub Actions · Vercel.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm check        # typecheck + astro check + lint + unit tests
pnpm build        # static build to dist/
pnpm test:build   # smoke tests against dist/
```

## Editing content

All copy lives in `src/data/copy.en.ts` and `src/data/copy.nl.ts` — components contain no
text. Facts on the site are limited to the verified fact base in the design spec
(`docs/superpowers/specs/`); the fact-guard tests in `src/data/copy.spec.ts` enforce the
contact channels and project URLs. Keep them green.

## Docs

Design spec and the implementation plan this site was built from live in
`docs/superpowers/`.
