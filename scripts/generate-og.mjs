import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const logo = readFileSync('src/assets/logos/svg/logo-stacked.svg', 'utf8')
const white = logo.replace(/fill="black"/g, 'fill="#F5F5F5"')
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(white).toString('base64')}`

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
