// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { workGetMock } from './__fixtures__/work'

export const baseUrl = import.meta.env.VITE_API_GATEWAY_ENDPOINT
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  http.get(`${baseUrl}/api/v1/work`, () => {
    return HttpResponse.json(workGetMock)
  })
]