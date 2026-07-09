import { expect, test } from 'vitest'
import { formatDateToMonthYear } from './dateFormat'

import mockWork from "../mocks/__fixtures__/work"

test('format start date YYYY-MM-DD to Month Year', () => {
    const date = mockWork[0].startDate
    const formattedDate = formatDateToMonthYear(date)
    expect(formattedDate).toBe('August 2020')

    const date2 = mockWork[1].startDate
    const formattedDate2 = formatDateToMonthYear(date2)
    expect(formattedDate2).toBe('June 2019')

    const date3 = mockWork[2].startDate
    const formattedDate3 = formatDateToMonthYear(date3)
    expect(formattedDate3).toBe('June 2018')

    const date4 = mockWork[3].startDate
    const formattedDate4 = formatDateToMonthYear(date4)
    expect(formattedDate4).toBe('January 2018')
})

test('format end date YYYY-MM-DD to Month Year', () => {
    const date = mockWork[0].endDate
    const formattedDate = formatDateToMonthYear(date)
    expect(formattedDate).toBe('Present')

    const date2 = mockWork[1].endDate
    const formattedDate2 = formatDateToMonthYear(date2)
    expect(formattedDate2).toBe('March 2020')

    const date3 = mockWork[2].endDate
    const formattedDate3 = formatDateToMonthYear(date3)
    expect(formattedDate3).toBe('August 2018')

    const date4 = mockWork[3].endDate
    const formattedDate4 = formatDateToMonthYear(date4)
    expect(formattedDate4).toBe('May 2018')
})
