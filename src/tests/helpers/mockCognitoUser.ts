import { Page } from '@playwright/test';

interface MockUserOptions {
  groups: string[];
}

export async function mockCognitoUser(page: Page, { groups }: MockUserOptions) {
  // Build a fake JWT payload with the groups claim
  const fakePayload = {
    'cognito:groups': groups,
    sub: 'fake-user-id',
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  // Amplify reads fetchAuthSession from its own internals —
  // we override it on the window before any app code runs
  await page.addInitScript((payload) => {
    // @ts-ignore
    window.__MOCK_COGNITO_PAYLOAD__ = payload;
  }, fakePayload);
}