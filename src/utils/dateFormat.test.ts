import { expect, test } from 'vitest'
import { formatDateToMonthYear, asDateValue } from './dateFormat'

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

test('asDateValue passes through YYYY-MM-DD dates', () => {
    expect(asDateValue(mockWork[0].startDate)).toBe('2020-08-22')
    expect(asDateValue(mockWork[1].endDate)).toBe('2020-03-01')
})

test('asDateValue returns empty string for non-date values', () => {
    expect(asDateValue('Present')).toBe('')
    expect(asDateValue('YYYY-MM-DD')).toBe('') // new item placeholder
    expect(asDateValue('')).toBe('')
    expect(asDateValue('2020-8-2')).toBe('') // not zero-padded
    expect(asDateValue('August 2020')).toBe('')
})
