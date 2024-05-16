import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axiosGetProjects } from '../../services/personalWebsiteApi'
import Projects from './Projects'

const mocks = vi.hoisted(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
}))

vi.mock('axios', async(importActual) => {
    const actual = await importActual<typeof import ('axios')>()
    const mockAxios = {
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                ...actual.default.create(),
                get: mocks.get,
                post: mocks.post,
                put: mocks.put,
            }))
        }
    }
    return mockAxios
})

describe('Projects API', () => {
    it('mocks projects api', async() => {
        mocks.get.mockResolvedValueOnce({
            data: {}
        })

        // act
        await axiosGetProjects()

        // assert
        expect(mocks.get).toHaveBeenCalledTimes(1)
    })
})
