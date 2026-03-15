import { User } from '../types/userTypes';
import { fetchAuthSession } from 'aws-amplify/auth';

export async function getSessionUser(): Promise<User> {
    const { tokens } = await fetchAuthSession();
    const groupsPayload = tokens?.accessToken?.payload['cognito:groups'];
    
    const groups: string[] = Array.isArray(groupsPayload) 
        ? groupsPayload as string[]
        : [];
    
    if (groups.includes('admin')) {
        return {groups, isAdmin: true}
    }
    
    return {groups, isAdmin: false}
}