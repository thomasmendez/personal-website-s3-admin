import { test, expect } from '@playwright/test'
import SkillsToolsMock from '../../mocks/__fixtures__/skillsTools'

test.beforeEach('Open start URL', async ({ page }) => {
  console.log(`Running ${test.info().title}`);

  await page.goto('http://localhost:5173/skills-tools')
});

test('skills tools page', async ( { page }) => {

  await page.locator('h1')

  const title = page.locator('h1')
  expect(title).toContainText('Skills & Tools')

  for (const [index, item] of SkillsToolsMock.entries()) {
    await expect(page.getByTestId(`skills-tools-${index}-sort-value-read`)).toContainText(item.sortValue)
    for (const [categoryIndex, category] of item.categories.entries()) {
      await expect(page.getByTestId(`skills-tools-${index}-category-${categoryIndex}-read`)).toContainText(category.category)
      for (const [listIndex, listValue] of category.list.entries()) {
        await expect(page.getByTestId(`skills-tools-${index}-category-${categoryIndex}-list-${listIndex}-read`)).toContainText(listValue)
      }
    }
  }
})