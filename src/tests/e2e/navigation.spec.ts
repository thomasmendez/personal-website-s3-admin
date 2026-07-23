import { test, expect } from '@playwright/test'
import mockProjects from '../../mocks/__fixtures__/projects'
import { mockAmplifySession } from '../helpers/mockAmplify';

// Header links must be client-side (react-router Link), not full page loads —
// a full reload wipes the Redux cache and refetches everything from Lambda.
test('header navigation is client-side and keeps prefetched data', async ({ page }) => {
  await mockAmplifySession(page, []);

  await page.goto('http://localhost:5173/')

  // marker on window: survives client-side nav, wiped by a full page reload
  await page.evaluate(() => { (window as Window & { __spaMarker?: boolean }).__spaMarker = true })

  // two "Projects" links exist (desktop nav + drawer); use the desktop one
  await page.getByRole('link', { name: 'Projects' }).first().click()

  await expect(page.locator('h1')).toContainText('Projects')
  await expect(page.getByTestId('projects-0-sort-value-read')).toContainText(mockProjects[0].sortValue)

  const marker = await page.evaluate(() => (window as Window & { __spaMarker?: boolean }).__spaMarker)
  expect(marker).toBe(true)
})
