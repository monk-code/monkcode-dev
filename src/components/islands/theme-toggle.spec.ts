import { render, screen } from '@testing-library/vue'
import { beforeEach, describe, expect, it } from 'vitest'
import ThemeToggle from './ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
  })

  const props = { label: 'Switch between dark and light theme' }

  it('renders an accessible switch', () => {
    render(ThemeToggle, { props })
    expect(screen.getByRole('button', { name: /theme/i })).toBeTruthy()
  })

  it('toggles the html data-theme and persists it', async () => {
    const { getByRole } = render(ThemeToggle, { props })
    getByRole('button', { name: /theme/i }).click()
    await Promise.resolve()
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
