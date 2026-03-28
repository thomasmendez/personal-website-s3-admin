import { test, expect } from '@playwright/test'
import mockProjects from '../../mocks/__fixtures__/projects'
import { mockAmplifySession } from '../helpers/mockAmplify';
import { AdminUser } from '../../mocks/__fixtures__/users'

test.beforeEach('Open start URL', async () => {
  console.log(`Running ${test.info().title}`);

  // await page.goto('http://localhost:5173/work')
});

test('software engineering page', async ( { page }) => {

  await page.goto('http://localhost:5173/software-engineering')

  await page.locator('h1')

  const title = page.locator('h1')
  expect(title).toContainText('Software Engineering Projects')

  for (const [index, item] of mockProjects.entries()) {
    await expect(page.getByTestId(`projects-${index}-sort-value-read`)).toContainText(item.sortValue)
    // for (const [listIndex, listValue] of item.jobDescription.entries()) {
    //   await expect(page.getByTestId(`projects-${index}-job-description-${listIndex}-read`)).toContainText(listValue)
    // }
    await expect(page.getByTestId(`projects-${index}-edit-button-default`)).not.toBeVisible()
    await expect(page.getByTestId(`projects-${index}-add-button`)).not.toBeVisible()
    await expect(page.getByTestId(`projects-${index}-delete-button`)).not.toBeVisible()
  }
})

test('software engineering page admin', async ( { page }) => {

  await mockAmplifySession(page, AdminUser.groups);

  await page.goto('http://localhost:5173/software-engineering')

  await page.locator('h1')

  const title = page.locator('h1')
  expect(title).toContainText('Software Engineering Projects')

  for (const [index, item] of mockProjects.entries()) {
    await expect(page.getByTestId(`projects-${index}-sort-value-read`)).toContainText(item.sortValue)
    // for (const [listIndex, listValue] of item.jobDescription.entries()) {
    //   await expect(page.getByTestId(`projects-${index}-job-description-${listIndex}-read`)).toContainText(listValue)
    // }
    await expect(page.getByTestId(`projects-${index}-edit-button-default`)).toBeVisible()
    await expect(page.getByTestId(`projects-${index}-add-button`)).toBeVisible()
    await expect(page.getByTestId(`projects-${index}-delete-button`)).toBeVisible()
  }
})