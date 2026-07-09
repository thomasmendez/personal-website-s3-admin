import { Page } from '@playwright/test';

export async function mockAmplifySession(page: Page, groups: string[]) {
  await page.addInitScript((mockGroups) => {
    // Wait for the app module system to load, then patch Amplify
    // This works if your bundler (Vite/Webpack) exposes modules globally,
    // OR you use the window-patch approach below in your app entry point
    (window as any).__MOCK_SESSION__PLAYWRIGHT__ = {
      tokens: {
        accessToken: {
          payload: {
            'cognito:groups': mockGroups,
          },
        },
      },
    };
    console.log('Mocking Amplify session for Playwright', mockGroups)
  }, groups);
}