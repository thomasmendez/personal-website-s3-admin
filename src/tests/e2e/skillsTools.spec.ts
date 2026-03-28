import { test, expect } from '@playwright/test'
import SkillsToolsMock from '../../mocks/__fixtures__/skillsTools'
import { mockAmplifySession } from '../helpers/mockAmplify';
import { AdminUser } from '../../mocks/__fixtures__/users'

test.beforeEach('Open start URL', async () => {
  console.log(`Running ${test.info().title}`);

  // await page.goto('http://localhost:5173/skills-tools')
});

test('skills tools page', async ( { page }) => {

  await page.goto('http://localhost:5173/skills-tools')

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

test('skills tools page admin', async ( { page }) => {

  await mockAmplifySession(page, AdminUser.groups);

  await page.goto('http://localhost:5173/skills-tools')

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
    await expect(page.getByTestId(`skills-tools-${index}-edit-button-default`)).toBeVisible()
    await expect(page.getByTestId(`skills-tools-${index}-add-button`)).toBeVisible()
    await expect(page.getByTestId(`skills-tools-${index}-delete-button`)).toBeVisible()
  }
})