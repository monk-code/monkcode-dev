# monkcode.dev Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Gregory Deseck's freelance website (EN + NL) to https://monkcode.dev with zero user input.

**Architecture:** Static Astro 5 site, Tailwind 4 CSS-first theming with MONKCODE brand tokens, typed per-locale copy modules rendered by shared section components, two Vue 3 islands (theme toggle, mobile nav). Deployed to Vercel (team `monkcode`), repo under GitHub org `monk-code`.

**Tech Stack:** Astro ^5, Tailwind CSS ^4 (@tailwindcss/vite), Vue ^3.5, TypeScript ^5.8 (strict), Biome ^2, Vitest ^3 + Testing Library, GitHub Actions, Vercel CLI.

**Spec:** `docs/superpowers/specs/2026-07-05-monkcode-dev-website-design.md` — the copy in Task 3 is FINAL (spec §6); never paraphrase it. Facts must stay within spec §3.

**Working directory for all tasks:** `/Users/personal/Development/monkcode/code/monkcode-dev` (repo already git-initialized on `main`; `brand/` assets and `docs/` already present). No worktree needed — this is a fresh repo with no other work in flight.

---

### Task 0: Verify prerequisites (read-only)

- [ ] **Step 1: Verify toolchain + auth**

Run:
```bash
node --version && pnpm --version && gh auth status && vercel whoami
```
Expected: node ≥ v22, pnpm ≥ 10, `Logged in to github.com account gdseck`, vercel user `gdeseck`. All were verified true on 2026-07-05. If any fails, STOP and report — do not attempt interactive logins.

- [ ] **Step 2: Verify domain + org access**

Run:
```bash
vercel domains ls --scope monkcode | grep monkcode.dev && gh api orgs/monk-code --jq .login
```
Expected: `monkcode.dev` listed; `monk-code` printed.

---

### Task 1: Project scaffold and tooling

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `biome.json`, `vercel.json`, `.gitignore`, `.nvmrc`, `vitest.config.ts`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "monkcode-dev",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22" },
  "scripts": {
    "dev": "astro dev --port 4321",
    "build": "astro build",
    "preview": "astro preview",
    "astro:check": "astro check",
    "types:check": "tsc --noEmit",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "test": "vitest run --exclude test/build.spec.ts",
    "test:watch": "vitest",
    "test:build": "vitest run test/build.spec.ts",
    "check": "pnpm types:check && pnpm astro:check && pnpm lint && pnpm test",
    "og:generate": "node scripts/generate-og.mjs"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.4.1",
    "@astrojs/vue": "^5.1.0",
    "astro": "^5.10.2",
    "vue": "^3.5.17"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@biomejs/biome": "^2.0.6",
    "@fontsource/inter": "^5.2.5",
    "@fontsource/jetbrains-mono": "^5.2.5",
    "@fontsource/montserrat": "^5.2.5",
    "@tailwindcss/vite": "^4.0.0",
    "@testing-library/vue": "^8.1.0",
    "@vue/test-utils": "^2.4.6",
    "happy-dom": "^18.0.1",
    "sharp": "^0.34.2",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.8.3",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Write `astro.config.mjs`**

```js
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://monkcode.dev',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    vue(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', nl: 'nl-BE' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
})
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strictest",
  "compilerOptions": {
    "types": ["vitest/globals"],
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src", "test", "scripts"],
  "exclude": ["dist", "node_modules"]
}
```

- [ ] **Step 4: Write `biome.json`**

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.6/schema.json",
  "files": { "includes": ["**", "!dist/**", "!node_modules/**", "!brand/**", "!.astro/**", "!pnpm-lock.yaml"] },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2, "lineWidth": 100 },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "asNeeded", "trailingCommas": "all" }
  },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true, "suspicious": { "noExplicitAny": "error" } }
  }
}
```

- [ ] **Step 5: Write `vercel.json`** (headers per spec §7; no third-party CSP entries)

```json
{
  "framework": "astro",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

- [ ] **Step 6: Write `.gitignore`, `.nvmrc`, `vitest.config.ts`**

`.gitignore`:
```
node_modules/
dist/
.astro/
.vercel/
coverage/
.DS_Store
*.log
```
`.nvmrc`:
```
22
```
`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts', 'test/**/*.spec.ts'],
  },
})
```

- [ ] **Step 7: Install and verify**

Run: `pnpm install`
Expected: lockfile created, no errors (sharp postinstall ok).

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: scaffold astro project with tooling"
```
(The `brand/` assets and `docs/` are already committed on `main`.)

---

### Task 2: Brand theme, fonts, global styles

**Files:**
- Create: `src/styles/global.css`
- Move: `brand/logos` → `src/assets/logos`, `brand/images` → `src/assets/images` (git mv), `brand/favicon/*` → `public/` (git mv)

- [ ] **Step 1: Relocate brand assets**

```bash
mkdir -p src/assets public
git mv brand/logos src/assets/logos
git mv brand/images src/assets/images
git mv brand/favicon/apple-touch-icon.png brand/favicon/favicon.ico brand/favicon/favicon.svg brand/favicon/favicon-96x96.png brand/favicon/site.webmanifest brand/favicon/web-app-manifest-192x192.png brand/favicon/web-app-manifest-512x512.png public/
git rm -r brand
```

- [ ] **Step 2: Write `src/styles/global.css`** (Tailwind 4 CSS-first tokens; dark default)

```css
@import 'tailwindcss';
@import '@fontsource/montserrat/600.css';
@import '@fontsource/montserrat/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/jetbrains-mono/400.css';

@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));

@theme {
  --color-monk-yellow: #ffde0a;
  --color-code-black: #121212;
  --color-silent-white: #f5f5f5;
  --color-rhythm-grey: #888888;
  --font-display: 'Montserrat', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

:root {
  color-scheme: dark;
  --surface: var(--color-code-black);
  --ink: var(--color-silent-white);
  --ink-muted: var(--color-rhythm-grey);
  --accent: var(--color-monk-yellow);
}
[data-theme='light'] {
  color-scheme: light;
  --surface: var(--color-silent-white);
  --ink: var(--color-code-black);
  --ink-muted: #4a4a4a;
}

body {
  background: var(--surface);
  color: var(--ink);
  font-family: var(--font-body);
}
h1, h2, h3 { font-family: var(--font-display); }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

Accessibility constraints (binding for all later styling): Monk Yellow only as accent on dark surfaces or as background with Code Black text — never yellow text on white; all text contrast ≥ AA.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: brand theme tokens, fonts, global styles"
```

---

### Task 3: Typed copy layer with fact-guard tests (TDD)

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/copy.en.ts`, `src/data/copy.nl.ts`, `src/data/index.ts`
- Test: `src/data/copy.spec.ts`

- [ ] **Step 1: Write the failing tests** — `src/data/copy.spec.ts`

```ts
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCopy, locales } from './index'
import { site } from './site'

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

describe('locale parity', () => {
  it('exposes en and nl', () => {
    expect(locales).toEqual(['en', 'nl'])
  })
  it('has identical structure across locales', () => {
    const shape = (o: unknown): unknown =>
      Array.isArray(o)
        ? o.map(shape)
        : o && typeof o === 'object'
          ? Object.fromEntries(Object.keys(o as object).sort().map((k) => [k, shape((o as Record<string, unknown>)[k])]))
          : typeof o
    expect(shape(getCopy('nl'))).toEqual(shape(getCopy('en')))
  })
  it('shows 4 work items and 3 services in both locales', () => {
    for (const l of locales) {
      expect(getCopy(l).work.items).toHaveLength(4)
      expect(getCopy(l).services.items).toHaveLength(3)
    }
  })
})

describe('fact guards (spec §3)', () => {
  it('never references the dead email anywhere in src/', () => {
    for (const file of walk('src')) {
      expect(readFileSync(file, 'utf8')).not.toContain('gdseck@monk-code.dev')
    }
  })
  it('uses the verified contact channels', () => {
    expect(site.email).toBe('gdseck@protonmail.com')
    expect(site.linkedin).toBe('https://be.linkedin.com/in/gregorydeseck')
    expect(site.github).toBe('https://github.com/monk-code')
  })
  it('links only verified project urls', () => {
    const allowed = [
      'https://www.groepspraktijkpaviljoen.be',
      'https://www.dietistehannevannuffel.be',
      'https://www.bricsys.com/247',
      'https://bright-energy.eu',
    ]
    for (const l of locales) {
      expect(getCopy(l).work.items.map((i) => i.url)).toEqual(allowed)
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — cannot resolve `./index` / `./site`.

- [ ] **Step 3: Write `src/data/types.ts`**

```ts
export type Locale = 'en' | 'nl'

export type WorkItem = {
  name: string
  tag: string
  description: string
  url: string
  image: string
}

export type PageCopy = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; sub: string; badge: string; ctaPrimary: string; ctaSecondary: string }
  services: { heading: string; items: { title: string; body: string }[] }
  method: { heading: string; intro: string; items: { title: string; body: string }[] }
  work: { heading: string; items: WorkItem[]; footnote: string }
  about: { heading: string; body: string }
  contact: { heading: string; body: string; location: string }
  nav: { services: string; method: string; work: string; about: string; contact: string }
  notFound: { title: string; body: string; cta: string }
}
```

- [ ] **Step 4: Write `src/data/site.ts`**

```ts
export const site = {
  name: 'MONKCODE',
  tagline: 'We Code with Rhythm',
  url: 'https://monkcode.dev',
  owner: 'Gregory Deseck',
  email: 'gdseck@protonmail.com',
  linkedin: 'https://be.linkedin.com/in/gregorydeseck',
  github: 'https://github.com/monk-code',
  location: 'Ghent, Belgium',
} as const
```

- [ ] **Step 5: Write `src/data/copy.en.ts`** — copy verbatim from spec §6.1 into the `PageCopy` shape:

```ts
import type { PageCopy } from './types'

export const en: PageCopy = {
  meta: {
    title: 'MONKCODE — Freelance web development & AI automation, Ghent',
    description:
      'Senior frontend developer in Ghent taking on small freelance missions: websites for small businesses, web apps, and responsible AI automation. Enterprise discipline, small-business scale.',
  },
  hero: {
    eyebrow: 'MONKCODE · Freelance developer — Ghent, Belgium',
    title: 'Enterprise-grade code. Small-business scale.',
    sub: "I'm Gregory — a senior frontend developer with 10+ years building large-scale applications. As a freelancer I bring that same discipline to small missions: websites, web apps, and practical AI automation for businesses like yours.",
    badge: 'Open for small missions',
    ctaPrimary: 'Tell me about your project',
    ctaSecondary: 'See my work',
  },
  services: {
    heading: 'What I can do for you',
    items: [
      {
        title: 'A website that works for you',
        body: "Fast, findable, and easy to update yourself — no developer needed for a text change. I've built exactly this for a group practice and an independent dietitian, and both teams edit their own sites today. From first sketch to live site, hosting included.",
      },
      {
        title: 'Web apps & frontend engineering',
        body: 'Senior Vue.js and TypeScript work: a new feature, a performance rescue, a codebase audit, or extra capacity your team can trust. Well-scoped missions with a clear start and finish.',
      },
      {
        title: 'AI, done responsibly',
        body: 'Practical automation for your business, and AI-assisted development workflows for teams: code-review routines, guardrails, and testing discipline that make AI genuinely faster — not sloppier.',
      },
    ],
  },
  method: {
    heading: 'Fast, without the slop',
    intro:
      "AI has changed how quickly software can be built. It hasn't changed what good software is. My workflow uses AI for speed and engineering discipline for trust:",
    items: [
      {
        title: 'AI-accelerated, human-verified',
        body: 'I build with AI tooling wired into a strict workflow: automated code review, validation hooks, and tests that catch mistakes before they ship. The speed is real; so are the guardrails.',
      },
      {
        title: 'Fewer hours, same senior quality',
        body: 'Because the routine work goes faster, a small mission costs fewer billable hours than it would the traditional way. You get a fixed, honest quote up front.',
      },
      {
        title: 'Test-driven, always',
        body: "Every feature is backed by tests. That's what makes the speed sustainable — and what makes handovers painless.",
      },
      {
        title: 'Small missions, finished properly',
        body: 'I deliberately take on one or two missions at a time, next to my day job as a frontend engineer at an energy scale-up. Small scope, full attention, done means done.',
      },
    ],
  },
  work: {
    heading: 'Selected work',
    items: [
      {
        name: 'Groepspraktijk Paviljoen',
        tag: 'Small business',
        description:
          'Website for a group practice for dietetics and therapy. The team manages its own content, pricing, and staff pages — no developer needed.',
        url: 'https://www.groepspraktijkpaviljoen.be',
        image: 'groepspraktijk-paviljoen',
      },
      {
        name: 'Dietiste Hanne Van Nuffel',
        tag: 'Small business',
        description:
          'Personal-brand site for an independent dietitian, with a content editor she updates herself and automated visual tests guarding every change.',
        url: 'https://www.dietistehannevannuffel.be',
        image: 'dietiste-hanne-van-nuffel',
      },
      {
        name: 'Bricsys 24/7',
        tag: 'Enterprise',
        description:
          'Cloud collaboration platform for the construction industry: real-time document workflows and 3D model viewing at enterprise scale.',
        url: 'https://www.bricsys.com/247',
        image: 'bricsys-247',
      },
      {
        name: 'Bright Energy',
        tag: 'Enterprise',
        description:
          "Energy-management platform for smart batteries and energy trading — my current day job, where I also built the team's AI-assisted development workflow.",
        url: 'https://bright-energy.eu',
        image: 'bright-energy',
      },
    ],
    footnote: 'Side project: Stoic Companion, an offline-first web app — because craft needs practice.',
  },
  about: {
    heading: 'The monk and the rhythm',
    body: "MONKCODE is named after Thelonious Monk: disciplined craft, played with feeling. That's the kind of software I like to build — structured enough to trust, human enough to enjoy using. I studied history before I found code, and I've spent the last decade building frontends for products from construction platforms to energy systems. Off the clock: jazz, a bit of piano, Nassim Taleb books, and losing gracefully at Dark Souls.",
  },
  contact: {
    heading: 'Have a project in mind?',
    body: 'Tell me what you\'re trying to build — in plain language, no spec required. I\'ll reply within two working days with honest advice, even if that advice is "you don\'t need a developer for this."',
    location: 'Based in Ghent · working across Belgium, remote-friendly',
  },
  nav: { services: 'Services', method: 'How I work', work: 'Work', about: 'About', contact: 'Contact' },
  notFound: {
    title: 'Off the record',
    body: "This page doesn't exist — a rare wrong note. Let's get you back to the theme.",
    cta: 'Back to the homepage',
  },
}
```

- [ ] **Step 6: Write `src/data/copy.nl.ts`** — copy verbatim from spec §6.2, same structure:

```ts
import type { PageCopy } from './types'

export const nl: PageCopy = {
  meta: {
    title: 'MONKCODE — Freelance webdeveloper & AI-automatisering, Gent',
    description:
      'Senior frontend developer in Gent voor kleine freelance opdrachten: websites voor kleine ondernemingen, webapps en verantwoorde AI-automatisering. Enterprise-discipline op kmo-maat.',
  },
  hero: {
    eyebrow: 'MONKCODE · Freelance developer — Gent',
    title: 'Enterprise-kwaliteit. Op maat van uw zaak.',
    sub: 'Ik ben Gregory — senior frontend developer met 10+ jaar ervaring in grootschalige applicaties. Als freelancer breng ik diezelfde discipline naar kleine opdrachten: websites, webapps en praktische AI-automatisering voor ondernemingen zoals de uwe.',
    badge: 'Beschikbaar voor kleine opdrachten',
    ctaPrimary: 'Vertel me over uw project',
    ctaSecondary: 'Bekijk mijn werk',
  },
  services: {
    heading: 'Wat ik voor u kan doen',
    items: [
      {
        title: 'Een website die voor u werkt',
        body: 'Snel, vindbaar en zelf aan te passen — geen developer nodig voor een tekstwijziging. Ik bouwde dit al voor een groepspraktijk en een zelfstandige diëtiste; beide teams beheren vandaag zelf hun site. Van eerste schets tot livegang, hosting inbegrepen.',
      },
      {
        title: 'Webapps & frontend engineering',
        body: 'Senior Vue.js- en TypeScript-werk: een nieuwe feature, een performance-redding, een audit van uw codebase, of extra capaciteit waar uw team op kan bouwen. Duidelijk afgebakende opdrachten met een begin en een einde.',
      },
      {
        title: 'AI, verantwoord ingezet',
        body: 'Praktische automatisering voor uw zaak, en AI-ondersteunde ontwikkelworkflows voor teams: review-routines, vangrails en testdiscipline die AI écht sneller maken — niet slordiger.',
      },
    ],
  },
  method: {
    heading: 'Snel, zonder brokken',
    intro:
      'AI heeft veranderd hoe snel software gebouwd kan worden. Niet wat goede software is. Mijn workflow gebruikt AI voor snelheid en engineering-discipline voor vertrouwen:',
    items: [
      {
        title: 'AI-versneld, door mensen gecontroleerd',
        body: 'Ik bouw met AI-tooling in een strikte workflow: geautomatiseerde code review, validatiechecks en tests die fouten tegenhouden vóór ze live gaan. De snelheid is echt; de vangrails ook.',
      },
      {
        title: 'Minder uren, dezelfde seniorkwaliteit',
        body: 'Omdat routinewerk sneller gaat, kost een kleine opdracht minder factureerbare uren dan op de klassieke manier. U krijgt vooraf een vaste, eerlijke prijs.',
      },
      {
        title: 'Altijd testgedreven',
        body: 'Elke feature is gedekt door tests. Dat maakt de snelheid houdbaar — en een overdracht pijnloos.',
      },
      {
        title: 'Kleine opdrachten, netjes afgewerkt',
        body: 'Ik neem bewust één à twee opdrachten tegelijk aan, naast mijn vaste job als frontend engineer bij een energie-scale-up. Kleine scope, volle aandacht, af is af.',
      },
    ],
  },
  work: {
    heading: 'Een greep uit mijn werk',
    items: [
      {
        name: 'Groepspraktijk Paviljoen',
        tag: 'Kleine onderneming',
        description:
          'Website voor een groepspraktijk voor diëtetiek en therapie. Het team beheert zelf inhoud, tarieven en teampagina’s — zonder developer.',
        url: 'https://www.groepspraktijkpaviljoen.be',
        image: 'groepspraktijk-paviljoen',
      },
      {
        name: 'Dietiste Hanne Van Nuffel',
        tag: 'Kleine onderneming',
        description:
          'Persoonlijke merksite voor een zelfstandige diëtiste, met een editor die ze zelf gebruikt en automatische visuele tests die elke wijziging bewaken.',
        url: 'https://www.dietistehannevannuffel.be',
        image: 'dietiste-hanne-van-nuffel',
      },
      {
        name: 'Bricsys 24/7',
        tag: 'Enterprise',
        description:
          'Cloudplatform voor samenwerking in de bouwsector: realtime documentworkflows en 3D-modelweergave op enterprise-schaal.',
        url: 'https://www.bricsys.com/247',
        image: 'bricsys-247',
      },
      {
        name: 'Bright Energy',
        tag: 'Enterprise',
        description:
          'Energiemanagementplatform voor slimme batterijen en energiehandel — mijn huidige vaste job, waar ik ook de AI-ondersteunde ontwikkelworkflow van het team bouwde.',
        url: 'https://bright-energy.eu',
        image: 'bright-energy',
      },
    ],
    footnote: 'Zijproject: Stoic Companion, een offline-first webapp — want vakmanschap vraagt oefening.',
  },
  about: {
    heading: 'De monnik en het ritme',
    body: 'MONKCODE is genoemd naar Thelonious Monk: gedisciplineerd vakmanschap, gespeeld met gevoel. Zo bouw ik ook graag software — gestructureerd genoeg om op te vertrouwen, menselijk genoeg om graag te gebruiken. Ik studeerde geschiedenis voor ik bij code belandde, en bouwde het voorbije decennium frontends voor producten van bouwplatformen tot energiesystemen. Naast het werk: jazz, een beetje piano, boeken van Nassim Taleb, en gracieus verliezen in Dark Souls.',
  },
  contact: {
    heading: 'Een project in gedachten?',
    body: 'Vertel me wat u wil bouwen — in gewone taal, geen lastenboek nodig. U krijgt binnen twee werkdagen antwoord met eerlijk advies, ook als dat advies is: "hiervoor hebt u geen developer nodig."',
    location: 'Gevestigd in Gent · actief in heel België, remote-vriendelijk',
  },
  nav: { services: 'Diensten', method: 'Zo werk ik', work: 'Werk', about: 'Over mij', contact: 'Contact' },
  notFound: {
    title: 'Naast de plaat',
    body: 'Deze pagina bestaat niet — een zeldzame valse noot. We brengen u terug naar het thema.',
    cta: 'Terug naar de homepagina',
  },
}
```

- [ ] **Step 7: Write `src/data/index.ts`**

```ts
import { en } from './copy.en'
import { nl } from './copy.nl'
import type { Locale, PageCopy } from './types'

export const locales: Locale[] = ['en', 'nl']
export const getCopy = (locale: Locale): PageCopy => (locale === 'nl' ? nl : en)
export type { Locale, PageCopy, WorkItem } from './types'
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `pnpm test`
Expected: PASS (all parity + fact-guard tests green).

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: typed bilingual copy layer with fact-guard tests"
```

---

### Task 4: Layout, SEO head, JSON-LD

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Seo.astro`, `src/components/JsonLd.astro`

- [ ] **Step 1: Write `src/components/Seo.astro`**

```astro
---
import { site } from '@/data/site'
import type { Locale } from '@/data/types'

type Props = { title: string; description: string; locale: Locale; path: string }
const { title, description, locale, path } = Astro.props
const canonical = new URL(path, site.url).href
const enUrl = new URL(path.replace(/^\/nl\/?/, '/'), site.url).href
const nlPath = path.startsWith('/nl') ? path : `/nl${path === '/' ? '/' : path}`
const nlUrl = new URL(nlPath, site.url).href
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<link rel="alternate" hreflang="en" href={enUrl} />
<link rel="alternate" hreflang="nl-BE" href={nlUrl} />
<link rel="alternate" hreflang="x-default" href={enUrl} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={new URL('/og/og-image.png', site.url).href} />
<meta property="og:locale" content={locale === 'nl' ? 'nl_BE' : 'en_US'} />
<meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 2: Write `src/components/JsonLd.astro`**

```astro
---
import { site } from '@/data/site'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.owner,
    jobTitle: 'Freelance Frontend Developer',
    email: `mailto:${site.email}`,
    url: site.url,
    address: { '@type': 'PostalAddress', addressLocality: 'Ghent', addressCountry: 'BE' },
    sameAs: [site.linkedin, site.github],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    email: site.email,
    founder: site.owner,
    areaServed: 'Belgium',
    address: { '@type': 'PostalAddress', addressLocality: 'Ghent', addressCountry: 'BE' },
  },
]
---
<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} is:inline />
```

- [ ] **Step 3: Write `src/layouts/BaseLayout.astro`** (favicons, theme no-flash, global css)

```astro
---
import '@/styles/global.css'
import JsonLd from '@/components/JsonLd.astro'
import Seo from '@/components/Seo.astro'
import type { Locale } from '@/data/types'

type Props = { title: string; description: string; locale: Locale; path: string }
const { title, description, locale, path } = Astro.props
---
<!doctype html>
<html lang={locale === 'nl' ? 'nl-BE' : 'en'} data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#121212" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <script is:inline>
      const stored = localStorage.getItem('theme')
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
      document.documentElement.dataset.theme = stored ?? (prefersLight ? 'light' : 'dark')
    </script>
    <Seo {title} {description} {locale} {path} />
    <JsonLd />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Verify types/lint**

Run: `pnpm types:check && pnpm lint`
Expected: PASS (astro:check runs after pages exist).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: base layout with seo, hreflang, json-ld, theme bootstrap"
```

---

### Task 5: Theme-toggle island (TDD) and mobile nav island

**Files:**
- Create: `src/components/islands/ThemeToggle.vue`, `src/components/islands/MobileNav.vue`
- Test: `src/components/islands/theme-toggle.spec.ts`

- [ ] **Step 1: Write the failing test** — `src/components/islands/theme-toggle.spec.ts`

```ts
import { render, screen } from '@testing-library/vue'
import { beforeEach, describe, expect, it } from 'vitest'
import ThemeToggle from './ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
  })

  it('renders an accessible switch', async () => {
    render(ThemeToggle)
    expect(screen.getByRole('button', { name: /theme/i })).toBeTruthy()
  })

  it('toggles the html data-theme and persists it', async () => {
    const { getByRole } = render(ThemeToggle)
    getByRole('button', { name: /theme/i }).click()
    await Promise.resolve()
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test`
Expected: FAIL — ThemeToggle.vue not found.

- [ ] **Step 3: Write `src/components/islands/ThemeToggle.vue`**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const theme = ref(document.documentElement.dataset.theme ?? 'dark')

const toggle = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <button
    type="button"
    :aria-label="`Switch theme (current: ${theme})`"
    class="rounded-full p-2 text-(--ink-muted) transition hover:text-(--accent)"
    @click="toggle"
  >
    <span v-if="theme === 'dark'" aria-hidden="true">☀</span>
    <span v-else aria-hidden="true">☾</span>
  </button>
</template>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 5: Write `src/components/islands/MobileNav.vue`** (hamburger toggle; links passed as props; closes on link click)

```vue
<script setup lang="ts">
import { ref } from 'vue'

const { links } = defineProps<{ links: { href: string; label: string }[] }>()
const open = ref(false)
</script>

<template>
  <div class="md:hidden">
    <button
      type="button"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      aria-label="Menu"
      class="p-2"
      @click="open = !open"
    >
      <span aria-hidden="true">{{ open ? '✕' : '☰' }}</span>
    </button>
    <nav v-if="open" id="mobile-menu" class="absolute inset-x-0 top-full bg-(--surface) p-6 shadow-lg">
      <ul class="flex flex-col gap-4">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="font-display text-lg" @click="open = false">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: theme toggle and mobile nav islands with tests"
```

---

### Task 6: Section components and pages (baseline, semantic)

**Files:**
- Create: `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`,
  `src/components/sections/Hero.astro`, `Services.astro`, `Method.astro`, `Work.astro`,
  `About.astro`, `Contact.astro` (all under `src/components/sections/`),
  `src/pages/index.astro`, `src/pages/nl/index.astro`, `src/pages/404.astro`, `src/pages/nl/404.astro`

Baseline rule: every section takes `copy` (its `PageCopy` slice) and `locale` as props — **zero hardcoded copy in components**. Semantic contract (binding): one `<h1>` (hero); each section is `<section id>` with an `<h2>`; header nav links to `#services #method #work #about #contact`; language switcher links `/` ↔ `/nl/` preserving no anchors; external links get `rel="noopener"`; work images from `src/assets/images/{item.image}_800_450.webp` via `astro:assets` `<Image>` with `alt` = item name; hero CTA = `mailto:` from `site.email`; contact section shows the email as visible text (small-business owners forward it), plus LinkedIn/GitHub links.

- [ ] **Step 1: Write `src/components/SiteHeader.astro`**

```astro
---
import MobileNav from '@/components/islands/MobileNav.vue'
import ThemeToggle from '@/components/islands/ThemeToggle.vue'
import type { Locale, PageCopy } from '@/data/types'

type Props = { copy: PageCopy['nav']; locale: Locale }
const { copy, locale } = Astro.props
const links = [
  { href: '#services', label: copy.services },
  { href: '#method', label: copy.method },
  { href: '#work', label: copy.work },
  { href: '#about', label: copy.about },
  { href: '#contact', label: copy.contact },
]
const altLocaleHref = locale === 'nl' ? '/' : '/nl/'
---
<header class="sticky top-0 z-40 border-b border-(--ink-muted)/20 bg-(--surface)/90 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
    <a href={locale === 'nl' ? '/nl/' : '/'} aria-label="MONKCODE home">
      <img src="/logo-horizontal.svg" alt="MONKCODE" class="h-8 w-auto" />
    </a>
    <nav class="hidden items-center gap-6 md:flex" aria-label="Main">
      {links.map((l) => <a href={l.href} class="text-sm text-(--ink-muted) transition hover:text-(--ink)">{l.label}</a>)}
    </nav>
    <div class="flex items-center gap-2">
      <a href={altLocaleHref} class="font-mono text-sm text-(--ink-muted) hover:text-(--accent)" aria-label={locale === 'nl' ? 'English version' : 'Nederlandse versie'}>
        {locale === 'nl' ? 'EN' : 'NL'}
      </a>
      <ThemeToggle client:load />
      <MobileNav client:visible {links} />
    </div>
  </div>
</header>
```
Also copy the horizontal logo into `public/`: `cp src/assets/logos/svg/logo-horizontal.svg public/logo-horizontal.svg` (header references it directly; the SVG must render on both themes — if it contains hardcoded dark fills, inline it instead and use `currentColor`).

- [ ] **Step 2: Write the six section components.** Each follows this exact pattern (Hero shown in full; the others repeat it with their own slice — headings from `copy.heading`, items mapped into cards/list items, no invented text):

`src/components/sections/Hero.astro`:
```astro
---
import { Image } from 'astro:assets'
import portrait from '@/assets/images/me-no-background.webp'
import { site } from '@/data/site'
import type { PageCopy } from '@/data/types'

type Props = { copy: PageCopy['hero'] }
const { copy } = Astro.props
---
<section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-[3fr_2fr]">
  <div>
    <p class="font-mono text-sm text-(--ink-muted)">{copy.eyebrow}</p>
    <h1 class="mt-4 text-4xl font-bold md:text-6xl">{copy.title}</h1>
    <p class="mt-6 max-w-prose text-lg text-(--ink-muted)">{copy.sub}</p>
    <p class="mt-6 inline-flex items-center gap-2 rounded-full border border-(--accent) px-3 py-1 text-sm">
      <span class="size-2 rounded-full bg-(--accent)" aria-hidden="true"></span>{copy.badge}
    </p>
    <div class="mt-8 flex flex-wrap gap-4">
      <a href={`mailto:${site.email}`} class="rounded-md bg-(--accent) px-6 py-3 font-display font-semibold text-(--color-code-black)">{copy.ctaPrimary}</a>
      <a href="#work" class="rounded-md border border-(--ink-muted) px-6 py-3 font-display font-semibold">{copy.ctaSecondary}</a>
    </div>
  </div>
  <Image src={portrait} alt="Illustrated portrait of Gregory Deseck" class="mx-auto w-64 md:w-full" loading="eager" />
</section>
```

`Services.astro`: `<section id="services">` → `<h2>{copy.heading}</h2>` → 3-column card grid mapping `copy.items` (`<h3>{item.title}</h3><p>{item.body}</p>`).
`Method.astro`: `<section id="method">` → h2 + `<p>{copy.intro}</p>` + ordered 2×2 grid of `copy.items` with `01`–`04` mono numerals.
`Work.astro`: `<section id="work">` → h2 + 2×2 card grid; each card: `<Image>` from the images glob, `tag` pill, `<h3>{item.name}</h3>`, description, external link to `item.url` with `rel="noopener"`; below the grid `<p class="font-mono text-sm">{copy.footnote}</p>`. Resolve images with:
```ts
const images = import.meta.glob<{ default: ImageMetadata }>('@/assets/images/*_800_450.webp', { eager: true })
const imageFor = (key: string) => Object.entries(images).find(([p]) => p.includes(key))?.[1].default
```
`About.astro`: `<section id="about">` → h2 + `<p>{copy.body}</p>` (max-w-prose).
`Contact.astro`: `<section id="contact">` → h2 + body + large mailto button showing `site.email` verbatim + LinkedIn/GitHub links + `<p>{copy.location}</p>`.

- [ ] **Step 3: Write `src/components/SiteFooter.astro`**

```astro
---
import { site } from '@/data/site'
---
<footer class="border-t border-(--ink-muted)/20 py-10">
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-sm text-(--ink-muted)">
    <img src="/logo-horizontal.svg" alt="MONKCODE" class="h-6 w-auto" />
    <p class="font-mono">{site.tagline}</p>
    <p>© 2026 {site.name} · {site.owner}</p>
  </div>
</footer>
```

- [ ] **Step 4: Write the pages.** `src/pages/index.astro`:

```astro
---
import SiteFooter from '@/components/SiteFooter.astro'
import SiteHeader from '@/components/SiteHeader.astro'
import About from '@/components/sections/About.astro'
import Contact from '@/components/sections/Contact.astro'
import Hero from '@/components/sections/Hero.astro'
import Method from '@/components/sections/Method.astro'
import Services from '@/components/sections/Services.astro'
import Work from '@/components/sections/Work.astro'
import { getCopy } from '@/data'
import BaseLayout from '@/layouts/BaseLayout.astro'

const copy = getCopy('en')
---
<BaseLayout title={copy.meta.title} description={copy.meta.description} locale="en" path="/">
  <SiteHeader copy={copy.nav} locale="en" />
  <main>
    <Hero copy={copy.hero} />
    <Services copy={copy.services} />
    <Method copy={copy.method} />
    <Work copy={copy.work} />
    <About copy={copy.about} />
    <Contact copy={copy.contact} />
  </main>
  <SiteFooter />
</BaseLayout>
```
`src/pages/nl/index.astro`: identical with `getCopy('nl')`, `locale="nl"`, `path="/nl/"`.
`src/pages/404.astro` and `src/pages/nl/404.astro`: BaseLayout + centered `notFound` copy (h1 = `notFound.title`, body, CTA link to `/` resp. `/nl/`) + logomark. (Astro serves only root `404.html` on Vercel; the NL 404 page is linked-to nowhere but keeps parity — acceptable.)

- [ ] **Step 5: Build and check**

Run: `pnpm check && pnpm build`
Expected: all green; `dist/index.html`, `dist/nl/index.html`, `dist/404.html` exist.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: landing pages en/nl with section components and 404"
```

---

### Task 7: robots.txt and OG image

**Files:**
- Create: `public/robots.txt`, `scripts/generate-og.mjs`, output `public/og/og-image.png`

- [ ] **Step 1: Write `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://monkcode.dev/sitemap-index.xml
```

- [ ] **Step 2: Write `scripts/generate-og.mjs`** (brand-styled 1200×630 PNG via sharp)

```js
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const logo = readFileSync('src/assets/logos/svg/logo-stacked.svg', 'utf8')
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}`

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#121212"/>
  <rect x="0" y="610" width="1200" height="20" fill="#FFDE0A"/>
  <image href="${logoDataUri}" x="400" y="115" width="400" height="300"/>
  <text x="600" y="500" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#F5F5F5">Freelance web development &amp; AI automation — Ghent</text>
</svg>`

mkdirSync('public/og', { recursive: true })
const sharp = (await import('sharp')).default
const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync('public/og/og-image.png', png)
console.log('og-image.png written', png.length, 'bytes')
```

- [ ] **Step 3: Generate and eyeball**

Run: `pnpm og:generate`
Expected: `og-image.png written <n> bytes`. Open/Read the PNG to confirm the logo renders (if the stacked SVG fails to rasterize inside sharp, fall back to drawing "MONKCODE" as `<text>` in Montserrat-less system bold, yellow on black — still on-brand).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: robots.txt and generated og image"
```

---

### Task 8: Design polish pass (frontend-design skill)

- [ ] **Step 1: Invoke the `frontend-design:frontend-design` skill** with this brief:

> Elevate the visual design of this Astro landing page (all files in `src/components/`, `src/styles/global.css`) within HARD constraints: brand colors ONLY Monk Yellow #FFDE0A (accents/CTAs — never body text on light), Code Black #121212, Silent White #F5F5F5, Rhythm Grey #888888; fonts Montserrat (headings) / Inter (body) / JetBrains Mono (accents), already loaded via Fontsource. Dark theme default + light theme via `[data-theme]` custom properties `--surface/--ink/--ink-muted/--accent` — style with these vars so both themes work. Aesthetic: "the Monk and the Rhythm" — disciplined editorial grid, generous whitespace, large Montserrat display type, with ONE recurring syncopated-jazz motif (e.g. staggered yellow heading ticks or an off-beat divider rhythm). Bento-style cards for services/work, subtle scroll-reveal (CSS only, honor prefers-reduced-motion), polished hover states. DO NOT: change any copy string, add JS frameworks or libraries, break section ids/anchors, remove semantic elements, or violate WCAG AA contrast.

- [ ] **Step 2: Verify nothing broke**

Run: `pnpm check && pnpm build`
Expected: PASS — fact-guard and island tests still green.

- [ ] **Step 3: Visual verification.** Start `pnpm dev`, then screenshot (preview tools or agent-browser) at 375px and 1440px, for `/` and `/nl/`, in dark AND light (`document.documentElement.dataset.theme='light'`). Check: no overflow, contrast holds, yellow used sparingly, portrait not distorted, mobile nav works.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: design polish pass within brand constraints"
```

---

### Task 9: Build-output smoke tests (TDD-on-dist)

**Files:**
- Test: `test/build.spec.ts`

- [ ] **Step 1: Write `test/build.spec.ts`**

```ts
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (p: string) => readFileSync(p, 'utf8')

describe('built output (run pnpm build first)', () => {
  it('emits both locales and 404', () => {
    for (const f of ['dist/index.html', 'dist/nl/index.html', 'dist/404.html']) {
      expect(existsSync(f), f).toBe(true)
    }
  })
  it('has hreflang alternates on both locales', () => {
    for (const f of ['dist/index.html', 'dist/nl/index.html']) {
      const html = read(f)
      expect(html).toContain('hreflang="en"')
      expect(html).toContain('hreflang="nl-BE"')
      expect(html).toContain('rel="canonical"')
    }
  })
  it('has parseable JSON-LD with Person and ProfessionalService', () => {
    const html = read('dist/index.html')
    const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)
    expect(match).toBeTruthy()
    const data = JSON.parse(match?.[1] ?? '')
    expect(data.map((d: { '@type': string }) => d['@type'])).toEqual(['Person', 'ProfessionalService'])
  })
  it('lists both locales in the sitemap', () => {
    expect(existsSync('dist/sitemap-index.xml')).toBe(true)
    const sitemap = read('dist/sitemap-0.xml')
    expect(sitemap).toContain('https://monkcode.dev/')
    expect(sitemap).toContain('https://monkcode.dev/nl/')
  })
  it('ships the og image and robots.txt', () => {
    expect(existsSync('dist/og/og-image.png')).toBe(true)
    expect(read('dist/robots.txt')).toContain('sitemap-index.xml')
  })
  it('keeps the dead email out of the built site', () => {
    for (const f of ['dist/index.html', 'dist/nl/index.html']) {
      expect(read(f)).not.toContain('gdseck@monk-code.dev')
      expect(read(f)).toContain('gdseck@protonmail.com')
    }
  })
})
```

- [ ] **Step 2: Run against a fresh build**

Run: `pnpm build && pnpm test:build`
Expected: PASS. If sitemap file naming differs (e.g. only `sitemap-index.xml` with inlined urls), adjust the test to read whichever `dist/sitemap*.xml` exists — assert content, not filename trivia.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "test: build-output smoke suite"
```

---

### Task 10: CI, README, repo CLAUDE.md

**Files:**
- Create: `.github/workflows/ci.yml`, `README.md`, `CLAUDE.md`

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm build
      - run: pnpm test:build
```

- [ ] **Step 2: Write `README.md`** — short: what the site is, live URL, `pnpm dev/check/build`, stack list, pointer to `docs/superpowers/` for spec/plan, note that copy changes go in `src/data/copy.{en,nl}.ts` and must keep the fact-guard tests green.

- [ ] **Step 3: Write `CLAUDE.md`** — repo working agreement (mirrors the owner's standard): TDD for behavior changes; `pnpm check` must pass before any commit; copy lives only in `src/data/`, facts limited to spec §3; brand rules (yellow=accent only, AA contrast, both themes verified); no new runtime dependencies without justification; deploys go through Vercel git integration after v1.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: ci workflow, readme, repo claude.md"
```

---

### Task 11: GitHub repo creation and push

- [ ] **Step 1: Create the public org repo and push**

Run:
```bash
gh repo create monk-code/monkcode-dev --public --source . --push \
  --description "Source for monkcode.dev — Gregory Deseck, freelance web development & AI automation (Ghent)" \
  --homepage "https://monkcode.dev"
```
Expected: repo created, `main` pushed, remote `origin` set.

- [ ] **Step 2: Verify CI goes green**

Run: `gh run watch --repo monk-code/monkcode-dev --exit-status` (or poll `gh run list`)
Expected: `CI / verify` succeeds. If it fails, fix locally, commit, push, re-verify — do not proceed to deploy with red CI.

---

### Task 12: Vercel deploy and domain cutover

- [ ] **Step 1: Link a fresh project in the monkcode team**

Run:
```bash
vercel link --yes --scope monkcode --project monkcode-dev
```
Expected: `.vercel/project.json` created (already gitignored), project `monkcode-dev` created in team `monkcode`.

- [ ] **Step 2: Preview deploy and verify**

Run:
```bash
vercel deploy --yes --scope monkcode
```
Expected: preview URL printed. Then:
```bash
curl -sf -o /dev/null -w "%{http_code}" <preview-url>/          # expect 200
curl -sf -o /dev/null -w "%{http_code}" <preview-url>/nl/       # expect 200
curl -s <preview-url>/ | grep -c 'hreflang'                     # expect ≥ 3
```
(Preview deployments may require Vercel auth for browsers; curl status 401 with `x-robots-tag` means protection is on — in that case rely on prod verification in Step 4.)

- [ ] **Step 3: Production deploy + attach domain**

Run:
```bash
vercel deploy --prod --yes --scope monkcode
vercel domains add monkcode.dev monkcode-dev --scope monkcode
vercel domains add www.monkcode.dev monkcode-dev --scope monkcode
```
Expected: prod URL live; domain attach succeeds (domain is in this team; currently pointing at a dead deployment, so no downtime risk). If `domains add` reports the domain is linked to the old `website` project, run `vercel domains rm monkcode.dev --scope monkcode --yes` is NOT needed — instead detach via `vercel project` is unavailable in CLI; use `vercel alias set <prod-deployment-url> monkcode.dev --scope monkcode` which overrides the assignment. Do NOT delete the domain itself under any circumstances (it's the registered asset).

- [ ] **Step 4: Verify production**

Run:
```bash
curl -sI https://monkcode.dev | head -5                    # expect HTTP/2 200
curl -sf https://monkcode.dev/nl/ -o /dev/null -w "%{http_code}\n"   # expect 200
curl -s https://monkcode.dev/robots.txt | grep Sitemap     # expect sitemap line
curl -sI https://www.monkcode.dev | head -3                # expect 200 or 307/308 to apex
```

- [ ] **Step 5: Connect git for future auto-deploys**

Run:
```bash
vercel git connect https://github.com/monk-code/monkcode-dev --yes --scope monkcode
```
Expected: `Connected GitHub repository monk-code/monkcode-dev`.

---

### Task 13: Post-deploy audit and wrap-up

- [ ] **Step 1: Lighthouse audit** — run the `lighthouse-audit` skill against `https://monkcode.dev` (both locales). Target ≥95 performance/a11y/best-practices/SEO. Fix concrete findings (oversized image, contrast, missing meta) if any, commit, push (auto-deploys via git integration now), re-verify.

- [ ] **Step 2: Final screenshots** — capture `/` and `/nl/`, dark + light, mobile + desktop, for the completion report.

- [ ] **Step 3: Report** — summarize to the user: live URLs, repo URL, CI status, Lighthouse scores, and the post-launch backlog from spec §10 (branded email, contact form, Search Console, KBO/VAT footer, testimonials, analytics — each needs Gregory).

---

## Self-Review Notes

- **Spec coverage:** §4 brand → Tasks 2/8; §5 IA → Task 6; §6 copy → Task 3 (verbatim); §7 stack/tests/CI → Tasks 1/3/5/9/10; §8 contact → Tasks 3/6 (mailto, no form); §9 deploy → Tasks 11/12; §10 backlog → Task 13 report. §3 fact guards → automated in Tasks 3/9.
- **Known simplifications:** section components other than Hero are specified by contract + pattern rather than full markup (visual layer is intentionally delegated to Task 8's design skill within binding semantic/brand constraints); NL 404 is best-effort (Vercel serves a single 404.html).
- **Type consistency check:** `PageCopy`/`Locale`/`WorkItem` defined once (Task 3 Step 3) and imported everywhere; `getCopy`/`locales` from `src/data/index.ts`; CSS vars `--surface/--ink/--ink-muted/--accent` used consistently in Tasks 2/5/6/8.
