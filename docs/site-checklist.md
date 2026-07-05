# monkcode.dev — Good-Site Checklist

What a small freelance lead-gen site must get right. Verified by the reviewer team
(6 parallel agents: SEO, EN copy, NL copy, a11y, links, hygiene) + browser checks on
2026-07-05; statuses reflect the state after the review-fix round.

Legend: ✅ pass · ⚠️ warn (accepted/tracked) · 🤖 = enforced by automated test

## 1. SEO & discoverability

- [x] ✅ Unique, descriptive `<title>` (≤63 chars) + meta description (≤160) per page/locale
- [x] ✅ Canonical URL on indexable pages; 404s are `noindex` without canonical/hreflang
- [x] ✅ hreflang alternates (en, nl-BE, x-default) on both locales 🤖
- [x] ✅ Valid JSON-LD (`Person` + `ProfessionalService`), consistent email format 🤖
- [x] ✅ Sitemap lists both pages; robots.txt links it 🤖 (⚠️ sitemap alternates omit
      x-default — @astrojs/sitemap limitation; page-level hreflang is authoritative)
- [x] ✅ OG complete: site_name, image + width/height/alt, locale + alternate; Twitter card 🤖
      (⚠️ single EN-tagline og-image shared by both locales — polish item)
- [x] ✅ Favicon set complete and all referenced (96px now linked); manifest icons valid
- [x] ✅ One `<h1>`; logical heading order; `lang` = en / nl-BE

## 2. Copy & content

- [x] ✅ Grounded natural voice (post-naturalization + reviewer round: de-jazzed 404/About,
      "no technical brief", varied repetitions, reduced em-dash cadence)
- [x] ✅ Claims trace to spec §3 fact base 🤖 (fact-guard tests)
- [x] ✅ Native Flemish NL (fixed: performance-redding→oplossing voor performanceproblemen,
      livegang→lancering, merksite→persoonlijke website, ervaring met, compounds, curly quotes)
- [x] ✅ Client name spelled per her own brand: **Diëtiste** Hanne Van Nuffel
- [x] ✅ EN/NL structural parity 🤖
- [x] ✅ Clear CTA above the fold; email visible as text; honest availability framing
- [ ] ⚠️ Footer tagline "We Code with Rhythm" is plural on a solo-freelancer site — kept as
      locked brand asset (BRANDING.md + logo SVG); Gregory to confirm or amend brand-wide

## 3. Accessibility

- [x] ✅ AA contrast both themes: `--accent-ink` (#75630a, 5.4:1) replaces raw yellow for all
      text/outline accents in light theme; dark theme yellow = 14:1
- [x] ✅ Landmarks + labelled navs (desktop "Main", mobile localized label)
- [x] ✅ Meaningful, localized alt texts (hero portrait + "Homepage of/Homepagina van …")
- [x] ✅ Keyboard: skip link (localized), visible AA focus ring both themes, Escape closes menu
- [x] ✅ Accessible names contain visible text (lang switch "NL —…"); labels localized 🤖-adjacent
- [x] ✅ Mobile menu aria-expanded/controls valid (v-show keeps target id in DOM)
- [x] ✅ `prefers-reduced-motion` kills all animation (verified in built CSS) 🤖
- [x] ✅ Touch targets: CTAs ~48px; lang link/theme toggle padded to ≥40px

## 4. Layout & responsiveness

- [x] ✅ No horizontal scrolling — portrait-glow overflow fixed; guarded at 375/768/1024/1440 🤖
      (Laptop project added: catches desktop-mode overflow that mobile emulation hides)
- [x] ✅ Visual regression baselines: 4 viewports × 2 locales 🤖 (local-only by design, like
      the dietistehannevannuffel reference setup — run before pushing visual changes)
- [x] ✅ max-w-prose measure; aspect-ratio'd images with explicit dimensions (CLS 0)
- [x] ✅ `scroll-mt` on all anchored sections; dark default + light theme complete, no flash

## 5. Animations & interaction

- [x] ✅ One staggered hero entrance + progressive-enhancement scroll reveals; CLS 0
- [x] ✅ All animation honors reduced-motion 🤖
- [x] ✅ Hover/focus states everywhere (accent-ink aware); decorative cursor marked `content/""`
- [x] ✅ Theme toggle persists; language switch bidirectional

## 6. Performance

- [x] ✅ Lighthouse mobile (throttled): EN performance 97, LCP 2.4s, CLS 0, TBT 0ms
      (⚠️ NL measured 87 under parallel-agent CPU load — TBT noise; re-measured after deploy)
- [x] ✅ WebP images with 400/800 srcset; hero eager, work images lazy
- [x] ✅ Fonts self-hosted (Fontsource), zero third-party requests (verified by grep + curl)
- [x] ✅ Immutable 1-year cache on hashed assets (verified live)
- [x] ✅ JS = two small Vue islands only

## 7. Technical hygiene & security

- [x] ✅ Headers live: nosniff, DENY, referrer-policy, permissions-policy (+ Vercel HSTS)
- [x] ✅ HTTPS; http→https 308; www→apex 308 via vercel.json host redirect
- [x] ✅ Zero console errors (manifest icon paths fixed earlier; asset 200s verified)
- [x] ✅ Branded 404 with correct 404 status; Dutch swap for /nl/* misses; noindex
- [x] ✅ No dead links: all internal anchors/assets + 6 external URLs return 200 🤖-adjacent
- [x] ✅ CI green (typecheck, astro check, biome, unit, build smoke); pnpm pinned via
      packageManager; Playwright artifacts gitignored
- [x] ✅ Docs current: README (visual-test workflow), CLAUDE.md, spec revision notes

## 8. Conversion & trust

- [x] ✅ Live client work with fresh screenshots (captured 2026-07-05, typed-animation frozen)
- [x] ✅ Two-working-days reply promise; LinkedIn + GitHub linked
- [ ] ⚠️ Tracked for Gregory: testimonials, branded email + contact form, Search Console,
      KBO/VAT footer, analytics decision (spec §10)
