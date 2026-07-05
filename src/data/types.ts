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
  hero: {
    eyebrow: string
    title: string
    sub: string
    badge: string
    ctaPrimary: string
    ctaSecondary: string
  }
  services: { heading: string; items: { title: string; body: string }[] }
  method: { heading: string; intro: string; items: { title: string; body: string }[] }
  work: { heading: string; items: WorkItem[]; footnote: string }
  about: { heading: string; body: string }
  contact: { heading: string; body: string; location: string }
  nav: { services: string; method: string; work: string; about: string; contact: string }
  notFound: { title: string; body: string; cta: string }
}
