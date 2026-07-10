import { test, expect, Page } from '@playwright/test'
import mockWork from '../../mocks/__fixtures__/work'
import { formatDateToMonthYear } from '../../utils/dateFormat'
import { mockAmplifySession } from '../helpers/mockAmplify';
import { AdminUser } from '../../mocks/__fixtures__/users'
import { Work } from '../../types/workTypes';

test.beforeEach('Open start URL', async () => {
  console.log(`Running ${test.info().title}`);

  // await page.goto('http://localhost:5173/work')
});

test.describe('work page', () => {

  test('read only', async ( { page }) => {

    await mockAmplifySession(page, []);

    await page.goto('http://localhost:5173/work')

    await page.locator('h1')

    const title = page.locator('h1')
    expect(title).toContainText('Where I Worked')

    for (const [index, item] of mockWork.entries()) {
      await validateWorkResponse(page, index, item)
      await validateButtonsExist(page, index, false)
    }
  })

  test('admin default view', async ( { page }) => {

    await mockAmplifySession(page, AdminUser.groups);

    await page.goto('http://localhost:5173/work')

    await page.locator('h1')

    const title = page.locator('h1')
    expect(title).toContainText('Where I Worked')

    for (const [index, item] of mockWork.entries()) {
      await validateWorkResponse(page, index, item)
      await validateButtonsExist(page, index, true)
    }
  })

  test('admin edit fields', async ( { page }) => {

    await mockAmplifySession(page, AdminUser.groups);

    await page.goto('http://localhost:5173/work')

    await page.locator('h1')

    const title = page.locator('h1')
    expect(title).toContainText('Where I Worked')

    for (const [index, item] of mockWork.entries()) {
      await validateWorkResponse(page, index, item)
      await validateButtonsExist(page, index, true)

      await page.getByTestId(`work-${index}-edit-button-default`).click()
      await page.getByTestId(`work-${index}-job-title-input-field`).fill(`New Job Title ${index}`)
      await page.getByTestId(`work-${index}-company-input-field`).fill(`New Company ${index}`)
      await page.getByTestId(`work-${index}-city-input-field`).fill(`New City ${index}`)
      await page.getByTestId(`work-${index}-state-input-field`).fill(`New State ${index}`)
      await page.getByTestId(`work-${index}-start-date-input-field`).fill(`2020-08-22`)
      await page.getByTestId(`work-${index}-end-date-input-field`).fill(`2026-03-24`)
      await page.getByTestId(`work-${index}-job-role-input-field`).fill(`New Job Role ${index}`)
      for (const [listIndex] of item.jobDescription.entries()) {
        await page.getByTestId(`work-${index}-job-description-${listIndex}-input-field`).fill(`New Job Description ${listIndex}`)
      }
    }
  })
})

async function validateWorkResponse(page: Page, index: number, item: Work) {
  await expect(page.getByTestId(`work-${index}-job-title-read`)).toContainText(item.jobTitle)
  await expect(page.getByTestId(`work-${index}-company-read`)).toContainText(item.company)
  await expect(page.getByTestId(`work-${index}-city-read`)).toContainText(item.location.city)
  await expect(page.getByTestId(`work-${index}-state-read`)).toContainText(item.location.state)
  await expect(page.getByTestId(`work-${index}-start-date-read`)).toContainText(formatDateToMonthYear(item.startDate))
  await expect(page.getByTestId(`work-${index}-end-date-read`)).toContainText(formatDateToMonthYear(item.endDate))
  await expect(page.getByTestId(`work-${index}-job-role-read`)).toContainText(item.jobRole)
  for (const [listIndex, listValue] of item.jobDescription.entries()) {
    await expect(page.getByTestId(`work-${index}-job-description-${listIndex}-read`)).toContainText(listValue)
  }
}

async function validateButtonsExist(page: Page, index: number, isVisible: boolean) {
  if (isVisible) {
    await expect(page.getByTestId(`work-${index}-edit-button-default`)).toBeVisible()
    await expect(page.getByTestId(`work-${index}-add-button`)).toBeVisible()
    await expect(page.getByTestId(`work-${index}-delete-button`)).toBeVisible()
  } else {
    await expect(page.getByTestId(`work-${index}-edit-button-default`)).not.toBeVisible()
    await expect(page.getByTestId(`work-${index}-add-button`)).not.toBeVisible()
    await expect(page.getByTestId(`work-${index}-delete-button`)).not.toBeVisible()
  }
}
