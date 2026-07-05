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
    footnote: 'Side project: Stoic Companion, an offline-first web app for daily Stoic practice.',
  },
  about: {
    heading: "Who you'll be working with",
    body: "I'm Gregory Deseck, a frontend developer from Ghent. I studied history before I found code, and I've spent the past decade building frontends — from a collaboration platform for the construction industry to an energy management system. The name MONKCODE is a nod to Thelonious Monk: structured music with a personal touch, which is how I like to build software too. Outside work: piano, Nassim Taleb books, and the occasional Dark Souls defeat.",
  },
  contact: {
    heading: 'Have a project in mind?',
    body: "Tell me what you're trying to build — in plain language, no spec required. I'll reply within two working days with honest advice, even if that advice is \"you don't need a developer for this.\"",
    location: 'Based in Ghent · working across Belgium, remote-friendly',
  },
  nav: {
    services: 'Services',
    method: 'How I work',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
  },
  notFound: {
    title: 'Page not found',
    body: "This page doesn't exist. The homepage does.",
    cta: 'Back to the homepage',
  },
}
