# monkcode.dev — Freelance Website Design Spec

**Date:** 2026-07-05
**Status:** Approved for one-shot implementation (user pre-authorized autonomous execution)
**Revision note (2026-07-05, post-launch):** §6 copy was revised on Gregory's feedback — the
jazz-metaphor headings/404 were replaced with plainer, grounded wording. The live copy source
of truth is `src/data/copy.{en,nl}.ts`; §3's fact base remains binding and unchanged.
**Repo:** `monk-code/monkcode-dev` (public) · **Domain:** monkcode.dev (Vercel-registered, monkcode team)

---

## 1. Goal & Success Metric

Rebuild Gregory Deseck's personal website as a **freelance lead-generation site**. The old site
(monk-code/website) was a portfolio aimed at enterprise credibility; the new site sells **small
freelance missions** to small businesses and teams — Gregory keeps his day job at Bright Energy
and takes on part-time, well-scoped work for extra income.

**Success metric:** extra income generated via the site (inbound leads → paid missions).
Every design decision optimizes for: *a small-business owner or team lead lands here, trusts
Gregory within 30 seconds, and sends an email.*

## 2. Audience & Positioning

**Primary audience:** small businesses and independent professionals in Ghent/Flanders
(the proven client base: healthcare practices, solo practitioners) who need a website, a small
web app, or practical automation — and want one competent person, not an agency.

**Secondary audience:** SMEs/teams needing senior frontend capacity for a well-scoped mission
(audit, rescue, feature), or help adopting AI-assisted development responsibly.

**Positioning statement:** *Senior engineer discipline, small-business scale.* Gregory has 10+
years of enterprise frontend experience and an AI-accelerated workflow with real guardrails
(automated review, tests, validation hooks). That makes him faster than traditional freelancers
**without producing slop** — which translates into fewer billable hours for the same senior
quality.

**Pricing on the site:** no rates, no "token cost + hourly" formula (confusing for the
audience). Instead: "fixed quotes for small projects" + "AI-accelerated workflow = fewer
billable hours for the same quality." Concrete numbers stay in the quote conversation.

**Availability framing:** deliberately scarce — "I take on one or two small missions at a
time and finish them properly." Honest (after-hours capacity) and reads as quality, not
moonlighting.

## 3. Verified Fact Base (copy MUST NOT go beyond this)

Facts verified from the old repo, live sites, GitHub, and Vercel on 2026-07-05:

- **Person:** Gregory Deseck, Ghent, Belgium. Senior frontend developer, 10+ years.
  Day job: frontend dev at Bright Energy (bright-eu). Studied history before code.
- **Contact (verified working):** email `gdseck@protonmail.com`; LinkedIn
  `be.linkedin.com/in/gregorydeseck`; GitHub `github.com/gdseck` + org `github.com/monk-code`.
  ⚠️ Old email `gdseck@monk-code.dev` is DEAD (domain unregistered, no MX) — never use it.
  `monkcode.dev` has no MX either; a branded address is post-launch work (see §10).
- **Client work (live, verified):**
  - **Groepspraktijk Paviljoen** — www.groepspraktijkpaviljoen.be — website for a Ghent-area
    group practice (dietetics & contextual therapy). Astro, TinaCMS: the practice edits its own
    team, pricing, and content. Custom organic design system.
  - **Dietiste Hanne Van Nuffel** — www.dietistehannevannuffel.be — personal-brand site for an
    independent dietitian. Astro 5, Tailwind 4, TinaCMS self-editing, Playwright visual
    regression tests.
- **Enterprise work (verified from old site):**
  - **Bricsys 24/7** (bricsys.com/247) — cloud Common Data Environment for construction;
    real-time collaboration, 3D model viewing.
  - **Bright Energy** (bright-energy.eu) — energy-management platform: smart batteries,
    optimization, energy trading.
- **AI practice (his own methodology; describe generically, never leak bright-eu internals
  like repo names, hook filenames, or config):** builds AI-assisted engineering workflows —
  automated code review in CI, validation hooks that block bad patterns before they land,
  strict typed/linted codebases designed so AI output is verifiable, test-driven development.
  Has given an internal talk on AI dev setup.
- **Side project:** Stoic Companion — offline-first PWA (mention-level only).
- **Personality (from old About):** Thelonious Monk fan (hence MONKCODE), reads Nassim Taleb,
  plays a little piano, Bloodborne/Dark Souls, British comedy, IASIP/The Office.
- **NOT usable:** the `finances` repo (sensitive personal data), meemoo folder (research only),
  any bright-eu internal details, client testimonials (none collected — don't fabricate),
  VAT/KBO business number (none found — don't invent; see §10).

## 4. Brand & Design Direction

Carried over from BRANDING.md (assets already in `brand/`):

- **Colors:** Monk Yellow `#FFDE0A` (accent only), Code Black `#121212`, Silent White
  `#F5F5F5`, Rhythm Grey `#888888`.
- **Type:** Montserrat 600/700 (headings), Inter 400/500 (body), JetBrains Mono (code accents).
  Self-hosted via Fontsource, subset to latin.
- **Logos:** `brand/logos/svg/` (stacked = primary, horizontal = nav, logomark = favicon).
- **Voice:** confident not arrogant · humble & warm · responsible & clear. Plain language —
  the reader is a business owner, not a developer (except in "How I work", which may go one
  level more technical).

**Aesthetic:** dark-first (Code Black canvas, Silent White text, yellow spotlight accents)
with a light theme toggle. Disciplined grid + generous whitespace ("the Monk") with one
recurring playful motif — a syncopated rhythm element (e.g., staggered section-heading
underlines or an animated cursor-blink beat) ("the Rhythm"). Modern 2026 feel: large
type scale, bento-style cards for services/work, subtle scroll reveals, no stock imagery.
Use the existing illustrated monk portrait (`brand/images/me-no-background.webp`) in the hero
or about. Final visual execution is delegated to the frontend-design skill at build time
within these brand constraints.

## 5. Information Architecture

Single landing page per language + 404. Anchor navigation. No blog in v1 (see §10).

```
/            EN landing (default)
/nl/         NL landing (full translation, hreflang alternate)
/404         Branded 404
sitemap, robots.txt, og-image, JSON-LD (Person + ProfessionalService)
```

Page sections in order:

1. **Hero** — positioning + availability badge + primary CTA (email) + secondary (see work)
2. **Services** — 3 cards
3. **How I work** — 4 principles (the AI-without-slop differentiator)
4. **Selected work** — 4 project cards (2 client, 2 enterprise) + side-project mention
5. **About** — short bio + personality + portrait
6. **Contact** — email CTA + LinkedIn + GitHub + location
7. **Footer** — logo, tagline, language switch, © 2026 MONKCODE

## 6. Copy (final, both languages)

Copy is final as written below; the implementer must not paraphrase facts. Micro-copy
(button labels, aria-labels, 404) may be adjusted for fit but must stay within the fact base.

### 6.1 English (`/`)

**Meta title:** `MONKCODE — Freelance web development & AI automation, Ghent`
**Meta description:** `Senior frontend developer in Ghent taking on small freelance missions: websites for small businesses, web apps, and responsible AI automation. Enterprise discipline, small-business scale.`

**Hero**
- Eyebrow: `MONKCODE · Freelance developer — Ghent, Belgium`
- H1: `Enterprise-grade code. Small-business scale.`
- Sub: `I'm Gregory — a senior frontend developer with 10+ years building large-scale
  applications. As a freelancer I bring that same discipline to small missions: websites,
  web apps, and practical AI automation for businesses like yours.`
- Badge: `Open for small missions`
- CTA primary: `Tell me about your project` → mailto
- CTA secondary: `See my work` → #work

**Services** (H2: `What I can do for you`)
1. **A website that works for you** — `Fast, findable, and easy to update yourself — no
   developer needed for a text change. I've built exactly this for a group practice and an
   independent dietitian, and both teams edit their own sites today. From first sketch to
   live site, hosting included.`
2. **Web apps & frontend engineering** — `Senior Vue.js and TypeScript work: a new feature,
   a performance rescue, a codebase audit, or extra capacity your team can trust. Well-scoped
   missions with a clear start and finish.`
3. **AI, done responsibly** — `Practical automation for your business, and AI-assisted
   development workflows for teams: code-review routines, guardrails, and testing discipline
   that make AI genuinely faster — not sloppier.`

**How I work** (H2: `Fast, without the slop`)
Intro: `AI has changed how quickly software can be built. It hasn't changed what good
software is. My workflow uses AI for speed and engineering discipline for trust:`
1. **AI-accelerated, human-verified** — `I build with AI tooling wired into a strict
   workflow: automated code review, validation hooks, and tests that catch mistakes before
   they ship. The speed is real; so are the guardrails.`
2. **Fewer hours, same senior quality** — `Because the routine work goes faster, a small
   mission costs fewer billable hours than it would the traditional way. You get a fixed,
   honest quote up front.`
3. **Test-driven, always** — `Every feature is backed by tests. That's what makes the
   speed sustainable — and what makes handovers painless.`
4. **Small missions, finished properly** — `I deliberately take on one or two missions at a
   time, next to my day job as a frontend engineer at an energy scale-up. Small scope,
   full attention, done means done.`

**Selected work** (H2: `Selected work`)
- **Groepspraktijk Paviljoen** · Small business — `Website for a group practice for dietetics
  and therapy. The team manages its own content, pricing, and staff pages — no developer
  needed.` → groepspraktijkpaviljoen.be
- **Dietiste Hanne Van Nuffel** · Small business — `Personal-brand site for an independent
  dietitian, with a content editor she updates herself and automated visual tests guarding
  every change.` → dietistehannevannuffel.be
- **Bricsys 24/7** · Enterprise — `Cloud collaboration platform for the construction industry:
  real-time document workflows and 3D model viewing at enterprise scale.` → bricsys.com/247
- **Bright Energy** · Enterprise — `Energy-management platform for smart batteries and energy
  trading — my current day job, where I also built the team's AI-assisted development
  workflow.` → bright-energy.eu
- Footnote: `Side project: Stoic Companion, an offline-first web app — because craft needs
  practice.`

**About** (H2: `The monk and the rhythm`)
`MONKCODE is named after Thelonious Monk: disciplined craft, played with feeling. That's the
kind of software I like to build — structured enough to trust, human enough to enjoy using.
I studied history before I found code, and I've spent the last decade building frontends for
products from construction platforms to energy systems. Off the clock: jazz, a bit of piano,
Nassim Taleb books, and losing gracefully at Dark Souls.`

**Contact** (H2: `Have a project in mind?`)
`Tell me what you're trying to build — in plain language, no spec required. I'll reply within
two working days with honest advice, even if that advice is "you don't need a developer for
this."`
- Email button: `gdseck@protonmail.com`
- Links: LinkedIn · GitHub
- `Based in Ghent · working across Belgium, remote-friendly`

### 6.2 Nederlands (`/nl/`)

**Meta title:** `MONKCODE — Freelance webdeveloper & AI-automatisering, Gent`
**Meta description:** `Senior frontend developer in Gent voor kleine freelance opdrachten: websites voor kleine ondernemingen, webapps en verantwoorde AI-automatisering. Enterprise-discipline op kmo-maat.`

**Hero**
- Eyebrow: `MONKCODE · Freelance developer — Gent`
- H1: `Enterprise-kwaliteit. Op maat van uw zaak.`
- Sub: `Ik ben Gregory — senior frontend developer met 10+ jaar ervaring in grootschalige
  applicaties. Als freelancer breng ik diezelfde discipline naar kleine opdrachten: websites,
  webapps en praktische AI-automatisering voor ondernemingen zoals de uwe.`
- Badge: `Beschikbaar voor kleine opdrachten`
- CTA: `Vertel me over uw project` / `Bekijk mijn werk`

**Diensten** (H2: `Wat ik voor u kan doen`)
1. **Een website die voor u werkt** — `Snel, vindbaar en zelf aan te passen — geen developer
   nodig voor een tekstwijziging. Ik bouwde dit al voor een groepspraktijk en een zelfstandige
   diëtiste; beide teams beheren vandaag zelf hun site. Van eerste schets tot livegang,
   hosting inbegrepen.`
2. **Webapps & frontend engineering** — `Senior Vue.js- en TypeScript-werk: een nieuwe feature,
   een performance-redding, een audit van uw codebase, of extra capaciteit waar uw team op kan
   bouwen. Duidelijk afgebakende opdrachten met een begin en een einde.`
3. **AI, verantwoord ingezet** — `Praktische automatisering voor uw zaak, en AI-ondersteunde
   ontwikkelworkflows voor teams: review-routines, vangrails en testdiscipline die AI écht
   sneller maken — niet slordiger.`

**Zo werk ik** (H2: `Snel, zonder brokken`)
Intro: `AI heeft veranderd hoe snel software gebouwd kan worden. Niet wat goede software is.
Mijn workflow gebruikt AI voor snelheid en engineering-discipline voor vertrouwen:`
1. **AI-versneld, door mensen gecontroleerd** — `Ik bouw met AI-tooling in een strikte
   workflow: geautomatiseerde code review, validatiechecks en tests die fouten tegenhouden
   vóór ze live gaan. De snelheid is echt; de vangrails ook.`
2. **Minder uren, dezelfde seniorkwaliteit** — `Omdat routinewerk sneller gaat, kost een
   kleine opdracht minder factureerbare uren dan op de klassieke manier. U krijgt vooraf een
   vaste, eerlijke prijs.`
3. **Altijd testgedreven** — `Elke feature is gedekt door tests. Dat maakt de snelheid
   houdbaar — en een overdracht pijnloos.`
4. **Kleine opdrachten, netjes afgewerkt** — `Ik neem bewust één à twee opdrachten tegelijk
   aan, naast mijn vaste job als frontend engineer bij een energie-scale-up. Kleine scope,
   volle aandacht, af is af.`

**Werk** (H2: `Een greep uit mijn werk`) — same 4 cards, NL:
- Groepspraktijk Paviljoen · Kleine onderneming — `Website voor een groepspraktijk voor
  diëtetiek en therapie. Het team beheert zelf inhoud, tarieven en teampagina's — zonder
  developer.`
- Dietiste Hanne Van Nuffel · Kleine onderneming — `Persoonlijke merksite voor een
  zelfstandige diëtiste, met een editor die ze zelf gebruikt en automatische visuele tests
  die elke wijziging bewaken.`
- Bricsys 24/7 · Enterprise — `Cloudplatform voor samenwerking in de bouwsector: realtime
  documentworkflows en 3D-modelweergave op enterprise-schaal.`
- Bright Energy · Enterprise — `Energiemanagementplatform voor slimme batterijen en
  energiehandel — mijn huidige vaste job, waar ik ook de AI-ondersteunde ontwikkelworkflow
  van het team bouwde.`
- Voetnoot: `Zijproject: Stoic Companion, een offline-first webapp — want vakmanschap vraagt
  oefening.`

**Over mij** (H2: `De monnik en het ritme`)
`MONKCODE is genoemd naar Thelonious Monk: gedisciplineerd vakmanschap, gespeeld met gevoel.
Zo bouw ik ook graag software — gestructureerd genoeg om op te vertrouwen, menselijk genoeg
om graag te gebruiken. Ik studeerde geschiedenis voor ik bij code belandde, en bouwde het
voorbije decennium frontends voor producten van bouwplatformen tot energiesystemen. Naast het
werk: jazz, een beetje piano, boeken van Nassim Taleb, en gracieus verliezen in Dark Souls.`

**Contact** (H2: `Een project in gedachten?`)
`Vertel me wat u wil bouwen — in gewone taal, geen lastenboek nodig. U krijgt binnen twee
werkdagen antwoord met eerlijk advies, ook als dat advies is: "hiervoor hebt u geen developer
nodig."`
- Email / LinkedIn / GitHub · `Gevestigd in Gent · actief in heel België, remote-vriendelijk`

### 6.3 Form-of-address note
NL copy uses **u/uw** (professional Flemish for business audience) consistently.

## 7. Technical Architecture

**Considered:** (A) Astro 5 + Tailwind 4 + minimal Vue 3 islands · (B) Nuxt 4 SSG ·
(C) Next.js. **Chosen: A.** Rationale: content site → static-first wins on performance
(Lighthouse ≈100 is itself a sales argument); continuity with the old repo and both client
sites; Vue islands showcase his actual stack without shipping a framework runtime everywhere;
zero server cost. B is heavier for no benefit on a landing page; C is off-stack (React).

- **Stack:** Astro ^5 · Tailwind CSS ^4 (CSS-first `@theme` with brand tokens) · Vue 3
  islands only where interactivity exists (theme toggle, mobile nav) · TypeScript strict.
- **Content model:** copy, services, projects, and how-I-work items live in typed content
  collections / data files per locale — not hardcoded in components; components render either
  locale from the same structures.
- **i18n:** Astro built-in i18n routing; `/` = en (default), `/nl/` = nl; hreflang + canonical
  in head; visible language switcher preserving section anchors.
- **SEO:** per-locale meta, OpenGraph + generated OG image (1200×630, brand style), JSON-LD
  `Person` + `ProfessionalService` (areaServed: Gent/Belgium), sitemap via @astrojs/sitemap,
  robots.txt.
- **Theming:** dark default, light toggle, `prefers-color-scheme` respected, no-flash inline
  script, choice persisted in localStorage.
- **Assets:** brand files from `brand/` moved into `src/assets/` at build-out; images through
  astro:assets (sharp) with explicit dimensions; fonts self-hosted (Fontsource), preloaded.
- **Accessibility:** semantic landmarks, one h1, focus states in Monk Yellow, contrast AA+
  (yellow only on black, never as text on white), `prefers-reduced-motion` honored by all
  animations.
- **Quality tooling** (personal-repo standard, consistent with old site): Biome 2 (lint +
  format), `astro check` + `tsc --noEmit`, Vitest + Testing Library for units, single
  `pnpm check` gate mirroring the old repo's script set.
- **Tests (v1 scope):** unit tests for i18n/content utilities and Vue islands; a build-output
  smoke spec (both locales render, hreflang present, sitemap lists both, no dead internal
  links, JSON-LD parses). Playwright visual regression is post-launch (§10).
- **CI:** GitHub Actions on PR + main: install (pnpm, frozen lockfile) → biome → typecheck →
  test → build. The public repo with green CI is itself a portfolio artifact.
- **Security/headers:** vercel.json with the old site's header set (nosniff, DENY,
  referrer-policy, permissions-policy) + long-cache for immutable assets; CSP without
  third-party allowances (no web3forms in v1).

## 8. Contact Strategy (v1)

No contact form in v1. The old Web3forms key routes to an unverifiable inbox (old domain
dead) — a form that "succeeds" into a void is a silent lead-killer, and creating a new key
requires Gregory. v1 uses a prominent `mailto:gdseck@protonmail.com` CTA (with copy-to-
clipboard affordance), LinkedIn, and GitHub. Upgrade path in §10.

## 9. Deployment & Domain (autonomous, verified feasible)

Pre-verified: `gh` authed as gdseck (repo+workflow scopes, monk-code org access); `vercel`
CLI authed (user gdeseck; `monkcode` team exists); domain `monkcode.dev` registered via
Vercel in the monkcode team (expires 2027-06); currently serving 404 DEPLOYMENT_NOT_FOUND
(old `website` project stale) — reassigning it breaks nothing.

1. Create public repo `monk-code/monkcode-dev`, push main.
2. `vercel link` new project `monkcode-dev` in scope `monkcode`; preview deploy; verify.
3. Production deploy; attach `monkcode.dev` (+ `www` redirect → apex) to the new project.
4. Connect the GitHub repo to the Vercel project for auto-deploys
   (`vercel git connect`), so future pushes deploy without the CLI.
5. Post-deploy verification: HTTP 200 on / and /nl/, meta/OG/JSON-LD present, sitemap live,
   Lighthouse run (target ≥95 all categories), screenshots both themes/locales.

## 10. Out of Scope v1 → Post-launch Backlog (needs Gregory or later effort)

- **Branded email** (hello@monkcode.dev): needs a mail/forwarding provider signup → then
  swap the mailto site-wide (one constant).
- **Contact form:** new Web3forms key (or provider) on a verified inbox → add form with the
  direct email kept as fallback.
- **Google Search Console** ownership + sitemap submission (needs his Google account).
- **Legal footer info** (KBO/VAT number, terms): add once freelance registration exists —
  none was found and nothing may be invented.
- **Testimonials/case studies:** ask Paviljoen & Hanne for a quote; add a case-study page
  per client. **Blog/notes** on AI-workflow topics for SEO. **Playwright visual regression.**
  **Analytics** (Pirsch skill available) — decide privacy posture first.
- **LinkedIn/GitHub profile refresh** pointing at monkcode.dev.

## 11. Risks & Mitigations

- **Employer relations:** copy explicitly names the day job and frames freelance as small
  missions alongside it — no "available for hire full-time" signals. No bright-eu internals.
- **Copy accuracy:** every claim traces to §3; reviewer must diff claims against fact base.
- **Domain switch:** verified currently-dead domain; worst case rollback = re-alias old
  project (nothing to break).
- **Scope creep:** v1 is one landing page ×2 locales + 404. Anything more goes to §10.
