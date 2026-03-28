import { User } from '../types/userTypes';
import { fetchAuthSession } from 'aws-amplify/auth';

async function getAmplifySession() {
  // Allow Playwright / test environment to inject a fake session
  if ((window as any).__MOCK_SESSION__PLAYWRIGHT__) {
    console.log("In playwright testing environment") // interecpted through page.addInitScript, runs before app bundle
    return (window as any).__MOCK_SESSION__PLAYWRIGHT__;
  }

  // Only use the mock if we're in mock mode
  if ((window as any).__MOCK_SESSION__) {
    console.log("Running local auth mock session")  // only runs if auth mocks are enabled
    return (window as any).__MOCK_SESSION__;
  }

  return fetchAuthSession();
}

export async function getSessionUser(): Promise<User> {
    const { tokens } = await getAmplifySession();
    const groupsPayload = tokens?.accessToken?.payload['cognito:groups'];
    
    const groups: string[] = Array.isArray(groupsPayload) 
        ? groupsPayload as string[]
        : [];
    
    if (groups.includes('admin')) {
        return {groups, isAdmin: true}
    }
    
    return {groups, isAdmin: false}
}