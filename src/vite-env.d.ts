/// <reference types="vite/client" />

interface MockAuthSession {
  tokens: {
    accessToken: {
      payload: {
        'cognito:groups': string[]
      }
    }
  }
}

interface Window {
  __MOCK_SESSION__?: MockAuthSession
  __MOCK_SESSION__PLAYWRIGHT__?: MockAuthSession
  __MOCK_COGNITO_PAYLOAD__?: unknown
  __store__?: unknown
  getUser?: unknown
}
