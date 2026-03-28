import { test, expect } from '@playwright/test'
import mockProjects from '../../mocks/__fixtures__/projects'
import { mockAmplifySession } from '../helpers/mockAmplify';
import { AdminUser } from '../../mocks/__fixtures__/users'

test.beforeEach('Open start URL', async () => {
  console.log(`Running ${test.info().title}`);

  // await page.goto('http://localhost:5173/work')
});

test.describe('projects - software engineering', () => {
  test('read only', async ( { page }) => {

    await mockAmplifySession(page, []);

    await page.goto('http://localhost:5173/software-engineering')
  
    await page.locator('h1')
  
    const title = page.locator('h1')
    expect(title).toContainText('Software Engineering Projects')
  
    for (const [index, item] of mockProjects.entries()) {
      await expect(page.getByTestId(`projects-${index}-sort-value-read`)).toContainText(item.sortValue)
      await expect(page.getByTestId(`projects-${index}-description-read`)).toContainText(item.description)
      await expect(page.getByTestId(`projects-${index}-role-read`)).toContainText(item.role)
      for (const [listIndex, listValue] of item.tasks.entries()) {
        await expect(page.getByTestId(`projects-${index}-tasks-${listIndex}-read`)).toContainText(listValue)
      }
      if (item.teamSize) {
        await expect(page.getByTestId(`projects-${index}-team-size-read`)).toContainText(item.teamSize)
      }
      if (item.teamRoles) {
        for (const [listIndex, listValue] of item.teamRoles.entries()) {
          await expect(page.getByTestId(`projects-${index}-team-roles-${listIndex}-read`)).toContainText(listValue)
        }
      }
      if (item.cloudServices) {
        for (const [listIndex, listValue] of item.cloudServices.entries()) {
          await expect(page.getByTestId(`projects-${index}-cloud-services-${listIndex}-read`)).toContainText(listValue)
        }
      }
      if (item.tools) {
        for (const [listIndex, listValue] of item.tools.entries()) {
          await expect(page.getByTestId(`projects-${index}-tools-${listIndex}-read`)).toContainText(listValue)
        }
      }
      await expect(page.getByTestId(`projects-${index}-duration-read`)).toContainText(item.duration)
      await expect(page.getByTestId(`projects-${index}-date-read`)).toContainText(`${item.startDate} - ${item.endDate}`)
      if (item.notes) {
        await expect(page.getByTestId(`projects-${index}-notes-read`)).toContainText(item.notes)
      }
      // TODO: add link test
      // if (item.link) {
      //   await expect(page.getByTestId(`projects-${index}-link-read`)).toContainText(item.link)
      // }
      if (item.linkType) {
        await expect(page.getByTestId(`projects-${index}-link-type-read`)).toContainText(item.linkType)
      }
      // TODO: add media link test
      // if (item.mediaLink) {
      //   await expect(page.getByTestId(`projects-${index}-media-link-read`)).toContainText(item.mediaLink)
      // }

      await expect(page.getByTestId(`projects-${index}-edit-button-default`)).not.toBeVisible()
      await expect(page.getByTestId(`projects-${index}-add-button`)).not.toBeVisible()
      await expect(page.getByTestId(`projects-${index}-delete-button`)).not.toBeVisible()
    }
  })
  
  test('admin default view', async ( { page }) => {
  
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
})