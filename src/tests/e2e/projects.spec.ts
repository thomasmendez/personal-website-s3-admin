import { test, expect, Page } from '@playwright/test'
import mockProjects from '../../mocks/__fixtures__/projects'
import { mockAmplifySession } from '../helpers/mockAmplify';
import { AdminUser } from '../../mocks/__fixtures__/users'
import { Project } from '../../types/projectTypes'

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
      await validateProjectResponse(page, index, item)
      await validateButtonsExist(page, index, false)
    }
  })

  test('admin default view', async ( { page }) => {

    await mockAmplifySession(page, AdminUser.groups);

    await page.goto('http://localhost:5173/software-engineering')

    await page.locator('h1')

    const title = page.locator('h1')
    expect(title).toContainText('Software Engineering Projects')

    for (const [index, item] of mockProjects.entries()) {
      await validateProjectResponse(page, index, item)
      await validateButtonsExist(page, index, true)
    }
  })

  test('admin edit fields', async ( { page }) => {
    await mockAmplifySession(page, AdminUser.groups);

    await page.goto('http://localhost:5173/software-engineering')

    await page.locator('h1')

    const title = page.locator('h1')
    expect(title).toContainText('Software Engineering Projects')

    for (const [index, item] of mockProjects.entries()) {
      await validateProjectResponse(page, index, item)
      await validateButtonsExist(page, index, true)

      await page.getByTestId(`projects-${index}-edit-button-default`).click()
      await page.getByTestId(`projects-${index}-sort-value-input-field`).fill(`New Sort Value ${index}`)
      await page.getByTestId(`projects-${index}-description-input-field`).fill(`New Description ${index}`)
      await page.getByTestId(`projects-${index}-features-description-input-field`).fill(`New Features Description ${index}`)
      await page.getByTestId(`projects-${index}-role-input-field`).fill(`New Role ${index}`)
      for (const [listIndex, _] of item.tasks.entries()) {
        await page.getByTestId(`projects-${index}-tasks-${listIndex}-input-field`).fill(`New Task ${listIndex}`)
      }
      if (item.teamSize) {
        await page.getByTestId(`projects-${index}-team-size-input-field`).fill(`New Team Size ${index}`)
      }
      if (item.teamRoles) {
        for (const [listIndex, _] of item.teamRoles.entries()) {
          await page.getByTestId(`projects-${index}-team-roles-${listIndex}-input-field`).fill(`New Team Role ${listIndex}`)
        }
      }
      if (item.cloudServices) {
        for (const [listIndex, _] of item.cloudServices.entries()) {
          await page.getByTestId(`projects-${index}-cloud-services-${listIndex}-input-field`).fill(`New Cloud Service ${listIndex}`)
        }
      }
      if (item.tools) {
        for (const [listIndex, _] of item.tools.entries()) {
          await page.getByTestId(`projects-${index}-tools-${listIndex}-input-field`).fill(`New Tool ${listIndex}`)
        }
      }
      await page.getByTestId(`projects-${index}-duration-input-field`).fill(`New Duration ${index}`)
      await page.getByTestId(`projects-${index}-start-date-input-field`).fill(`2020-08-22`)
      await page.getByTestId(`projects-${index}-end-date-input-field`).fill(`2026-03-24`)
      if (item.notes) {
        await page.getByTestId(`projects-${index}-notes-input-field`).fill(`New Notes ${index}`)
      }
      if (item.link) {
        await page.getByTestId(`projects-${index}-link-input-field`).fill(`New Link ${index}`)
      }
      if (item.linkType) {
        await page.getByTestId(`projects-${index}-link-type-input-field`).fill(`New Link Type ${index}`)
      }
      // TODO: add media link test
      // if (item.mediaLink) {
      //   await page.getByTestId(`projects-${index}-media-link-input-field`).fill(item.mediaLink)
      // }
    }
  })

  test('admin input/textarea toggle', async ( { page }) => {
    await mockAmplifySession(page, AdminUser.groups);

    await page.goto('http://localhost:5173/software-engineering')

    await page.locator('h1')

    for (const [index] of mockProjects.entries()) {
      await page.getByTestId(`projects-${index}-edit-button-default`).click()

      await validateInputTextareaToggle(page, index, 'description')
      await validateInputTextareaToggle(page, index, 'features-description')
      await validateInputTextareaToggle(page, index, 'notes')
    }
  })
})

const SHORT_VALUE = 'Short value'
const LONG_VALUE = 'This value is deliberately longer than the input threshold'

async function validateInputTextareaToggle(page: Page, index: number, testIdSuffix: string) {
  const testId = `projects-${index}-${testIdSuffix}-input-field`

  // mock data for this field starts long, so it should render as a textarea
  await expect(page.locator(`textarea[data-testid="${testId}"]`)).toBeVisible()

  // typing a short value should swap it to a single-line input, and the new
  // element should end up focused so the user doesn't have to reselect it
  await page.locator(`textarea[data-testid="${testId}"]`).fill(SHORT_VALUE)
  await expect(page.locator(`input[data-testid="${testId}"]`)).toBeVisible()
  await expect(page.locator(`input[data-testid="${testId}"]`)).toHaveValue(SHORT_VALUE)
  await expect(page.locator(`input[data-testid="${testId}"]`)).toBeFocused()

  // typing a long value should swap it back to a textarea, again staying focused
  await page.locator(`input[data-testid="${testId}"]`).fill(LONG_VALUE)
  await expect(page.locator(`textarea[data-testid="${testId}"]`)).toBeVisible()
  await expect(page.locator(`textarea[data-testid="${testId}"]`)).toHaveValue(LONG_VALUE)
  await expect(page.locator(`textarea[data-testid="${testId}"]`)).toBeFocused()
}

async function validateProjectResponse(page: Page, index: number, item: Project) {
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
}

async function validateButtonsExist(page: Page, index: number, isVisible: boolean) {
  if (isVisible) {
    await expect(page.getByTestId(`projects-${index}-edit-button-default`)).toBeVisible()
    await expect(page.getByTestId(`projects-${index}-add-button`)).toBeVisible()
    await expect(page.getByTestId(`projects-${index}-delete-button`)).toBeVisible()
  } else {
    await expect(page.getByTestId(`projects-${index}-edit-button-default`)).not.toBeVisible()
    await expect(page.getByTestId(`projects-${index}-add-button`)).not.toBeVisible()
    await expect(page.getByTestId(`projects-${index}-delete-button`)).not.toBeVisible()
  }
}

// TODO: Add remove and add button tests for line items

// TOOD: Add date tests for project similar to work page
