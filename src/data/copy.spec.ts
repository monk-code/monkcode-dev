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
          ? Object.fromEntries(
              Object.keys(o as object)
                .sort()
                .map((k) => [k, shape((o as Record<string, unknown>)[k])]),
            )
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
    // assembled at runtime so this guard does not trip on its own source
    const deadEmail = ['gdseck', 'monk-code.dev'].join('@')
    for (const file of walk('src')) {
      expect(readFileSync(file, 'utf8'), file).not.toContain(deadEmail)
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
