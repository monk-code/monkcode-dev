# monkcode.dev — Good-Site Checklist

What a small freelance lead-gen site must get right. Each item is verified by the reviewer
team (agents) and/or automated tests; status is updated after every review round.

Legend: ✅ pass · ⚠️ warn (accepted or minor) · ❌ fail (must fix) · 🤖 = enforced by automated test

## 1. SEO & discoverability

- [ ] Unique, descriptive `<title>` + meta description per page and locale
- [ ] Canonical URL on every page
- [ ] hreflang alternates (en, nl-BE, x-default) on both locales 🤖
- [ ] Valid JSON-LD (`Person` + `ProfessionalService`) 🤖
- [ ] Sitemap lists every indexable page; robots.txt links it 🤖
- [ ] OpenGraph + Twitter card meta with a working, branded og-image 🤖
- [ ] Complete favicon set + web app manifest with valid icon paths
- [ ] Exactly one `<h1>`; logical heading order (no skipped levels)
- [ ] Descriptive anchor texts (no bare "click here")
- [ ] `lang` attribute correct per locale (en / nl-BE)

## 2. Copy & content

- [ ] Grounded, natural voice — no cringe metaphors, no marketing fluff
- [ ] Every claim traces to the verified fact base (spec §3) 🤖 (fact-guard tests)
- [ ] NL is native-quality Flemish, consistent u-form
- [ ] EN/NL structural parity 🤖
- [ ] No typos or grammar errors in either locale
- [ ] Consistent terminology across sections (missions/opdrachten, etc.)
- [ ] Clear primary CTA above the fold; contact email visible as text
- [ ] Availability expectation set honestly (small missions, next to day job)

## 3. Accessibility

- [ ] WCAG AA contrast in BOTH themes (yellow never meaning-bearing on light)
- [ ] Landmarks: header/nav/main/footer; sections labelled by headings
- [ ] All images have meaningful alt text
- [ ] Full keyboard navigation; visible focus states
- [ ] Accessible names contain visible label text (WCAG 2.5.3)
- [ ] Mobile menu: `aria-expanded`/`aria-controls` wired
- [ ] `prefers-reduced-motion` disables all animation 🤖 (CSS + visual tests)
- [ ] Touch targets comfortably sized on mobile

## 4. Layout & responsiveness

- [ ] No horizontal scrolling at any width (320–1920) 🤖 (Playwright, 3 viewports)
- [ ] Visual regression baselines at 375/768/1440, both locales 🤖
- [ ] Readable measure (max-w-prose) for body text
- [ ] Images keep aspect ratio; explicit dimensions (no CLS)
- [ ] Sticky header never covers anchor targets (`scroll-mt`)
- [ ] Dark AND light theme fully styled; no flash of wrong theme

## 5. Animations & interaction

- [ ] Entrance/scroll animations subtle; no jank, no layout shift
- [ ] All animation disabled under `prefers-reduced-motion`
- [ ] Hover/focus states on every interactive element
- [ ] Theme toggle works and persists; language switch preserves context

## 6. Performance

- [ ] Lighthouse mobile ≥ 95 on all categories, both locales
- [ ] LCP < 2.5 s (lab, throttled); CLS ≈ 0
- [ ] Images as WebP with srcset widths; hero image eager, rest lazy
- [ ] Fonts self-hosted, subset; no third-party requests at all
- [ ] Long-cache immutable headers for hashed assets
- [ ] Near-zero JS: only the two Vue islands hydrate

## 7. Technical hygiene & security

- [ ] Security headers: nosniff, X-Frame-Options DENY, referrer-policy, permissions-policy
- [ ] HTTPS everywhere; www + apex both serve
- [ ] Zero browser console errors 🤖 (Lighthouse errors-in-console)
- [ ] Branded 404 page per locale
- [ ] No dead links (internal anchors + external URLs)
- [ ] CI green: typecheck, astro check, biome, unit, build smoke 🤖
- [ ] Repo docs current (README, CLAUDE.md, spec revision notes)

## 8. Conversion & trust

- [ ] Real, linkable work (live client sites) shown with fresh screenshots
- [ ] Direct reply promise ("within two working days")
- [ ] LinkedIn + GitHub linked for verification
- [ ] Post-launch backlog tracked (testimonials, branded email, Search Console, KBO/VAT)
