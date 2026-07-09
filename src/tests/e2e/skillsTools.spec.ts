import { test, expect, Page } from '@playwright/test'
import SkillsToolsMock from '../../mocks/__fixtures__/skillsTools'
import { mockAmplifySession } from '../helpers/mockAmplify';
import { AdminUser } from '../../mocks/__fixtures__/users'
import { SkillsTools } from '../../types/skillsToolsTypes';

test.beforeEach('Open start URL', async () => {
  console.log(`Running ${test.info().title}`);

  // await page.goto('http://localhost:5173/skills-tools')
});

test.describe('skills tools page', () => {
  test('read only', async ( { page }) => {

    await mockAmplifySession(page, []);
  
    await page.goto('http://localhost:5173/skills-tools')
  
    await page.locator('h1')
  
    const title = page.locator('h1')
    expect(title).toContainText('Skills & Tools')
  
    for (const [index, item] of SkillsToolsMock.entries()) {
      await validateSkillsToolsResponse(page, index, item)
      await validateButtonsExist(page, index, false)
    }
  })
  
  test('admin default view', async ( { page }) => {
  
    await mockAmplifySession(page, AdminUser.groups);
  
    await page.goto('http://localhost:5173/skills-tools')
  
    await page.locator('h1')
  
    const title = page.locator('h1')
    expect(title).toContainText('Skills & Tools')
  
    for (const [index, item] of SkillsToolsMock.entries()) {
      await validateSkillsToolsResponse(page, index, item)
      await validateButtonsExist(page, index, true)
    }
  })

  test('admin edit fields', async ( { page }) => {
    
    await mockAmplifySession(page, AdminUser.groups);
  
    await page.goto('http://localhost:5173/skills-tools')
  
    await page.locator('h1')
  
    const title = page.locator('h1')
    expect(title).toContainText('Skills & Tools')
  
    for (const [index, item] of SkillsToolsMock.entries()) {
      await validateSkillsToolsResponse(page, index, item)
      await validateButtonsExist(page, index, true)
  
      await page.getByTestId(`skills-tools-${index}-edit-button-default`).click()
      await page.getByTestId(`skills-tools-${index}-sort-value-input-field`).fill(`New Sort Value ${index}`)
      for (const [categoryIndex, category] of item.categories.entries()) {
        await page.getByTestId(`skills-tools-${index}-category-${categoryIndex}-input-field`).fill(`New Category ${categoryIndex}`)
        for (const [listIndex, _] of category.list.entries()) {
          await page.getByTestId(`skills-tools-${index}-category-${categoryIndex}-list-${listIndex}-input-field`).fill(`New Value ${listIndex}`)
        }
      }
    }
  })
})

async function validateSkillsToolsResponse(page: Page, index: number, item: SkillsTools) {
  await expect(page.getByTestId(`skills-tools-${index}-sort-value-read`)).toContainText(item.sortValue)
  for (const [categoryIndex, category] of item.categories.entries()) {
    await expect(page.getByTestId(`skills-tools-${index}-category-${categoryIndex}-read`)).toContainText(category.category)
    for (const [listIndex, listValue] of category.list.entries()) {
      await expect(page.getByTestId(`skills-tools-${index}-category-${categoryIndex}-list-${listIndex}-read`)).toContainText(listValue)
    }
  }
}

async function validateButtonsExist(page: Page, index: number, isVisible: boolean) {
  if (isVisible) {
    await expect(page.getByTestId(`skills-tools-${index}-edit-button-default`)).toBeVisible()
    await expect(page.getByTestId(`skills-tools-${index}-add-button`)).toBeVisible()
    await expect(page.getByTestId(`skills-tools-${index}-delete-button`)).toBeVisible()
  } else {
    await expect(page.getByTestId(`skills-tools-${index}-edit-button-default`)).not.toBeVisible()
    await expect(page.getByTestId(`skills-tools-${index}-add-button`)).not.toBeVisible()
    await expect(page.getByTestId(`skills-tools-${index}-delete-button`)).not.toBeVisible()
  }
}