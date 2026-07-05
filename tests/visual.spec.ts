import { expect, test } from '@playwright/test'

const pages = [
  { path: '/', name: 'home-en' },
  { path: '/nl/', name: 'home-nl' },
]

for (const { path, name } of pages) {
  test.describe(`Visual verification — ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)
    })

    test('matches visual baseline', async ({ page }, testInfo) => {
      await expect(page).toHaveScreenshot(`${name}-${testInfo.project.name.toLowerCase()}.png`, {
        fullPage: true,
        animations: 'disabled',
      })
    })

    test('has no horizontal scrolling', async ({ page }) => {
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bodyScrollWidth: document.body.scrollWidth,
      }))
      expect(overflow.scrollWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(
        overflow.innerWidth,
      )
      expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.innerWidth)
    })

    test('core elements are visible', async ({ page }) => {
      await expect(page.locator('main h1').first()).toBeVisible()
      await expect(page.locator('main')).toBeVisible()
      await expect(page.locator('#contact')).toBeVisible()
    })
  })
}
