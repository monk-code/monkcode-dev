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
