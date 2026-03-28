import { test, expect } from '@playwright/test'
import mockWork from '../../mocks/__fixtures__/work'
import { formatDateToMonthYear } from '../../utils/dateFormat'
import { mockAmplifySession } from '../helpers/mockAmplify';
import { AdminUser } from '../../mocks/__fixtures__/users'

test.beforeEach('Open start URL', async () => {
  console.log(`Running ${test.info().title}`);

  // await page.goto('http://localhost:5173/work')
});

test('work page', async ( { page }) => {

  await page.goto('http://localhost:5173/work')

  await page.locator('h1')

  const title = page.locator('h1')
  expect(title).toContainText('Where I Worked')

  for (const [index, item] of mockWork.entries()) {
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
})

test('work page admin', async ( { page }) => {

  await mockAmplifySession(page, AdminUser.groups);

  await page.goto('http://localhost:5173/work')

  await page.locator('h1')

  const title = page.locator('h1')
  expect(title).toContainText('Where I Worked')

  for (const [index, item] of mockWork.entries()) {
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
})