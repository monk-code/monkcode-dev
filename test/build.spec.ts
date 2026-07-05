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
    expect(data.map((d: { '@type': string }) => d['@type'])).toEqual([
      'Person',
      'ProfessionalService',
    ])
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
    const deadEmail = ['gdseck', 'monk-code.dev'].join('@')
    for (const f of ['dist/index.html', 'dist/nl/index.html']) {
      expect(read(f)).not.toContain(deadEmail)
      expect(read(f)).toContain('gdseck@protonmail.com')
    }
  })
})
