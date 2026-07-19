import { describe, it, expect } from 'vitest'
import reducer, { getProjects } from './projectsApiSlice'
import { Project } from '../types/projectTypes'

const project = (name: string, endDate: string) => ({ name, endDate }) as Project

describe('getProjects.fulfilled', () => {
  it('sorts projects newest to oldest, Present first', () => {
    const payload = [
      project('old', '2022-03-01'),
      project('current', 'Present'),
      project('new', '2025-01-15'),
      project('legacy-format', 'Dec 2023'),
    ]
    const state = reducer(undefined, getProjects.fulfilled(payload, ''))
    expect(state.entities.map((p) => p.name)).toEqual(['current', 'new', 'legacy-format', 'old'])
  })
})
