import { Amplify } from 'aws-amplify'
import { fetchAuthSession } from 'aws-amplify/auth';
import { Work } from './../types/workTypes';
import { SkillsTools } from './../types/skillsToolsTypes';
import { Project, projectToFormData } from './../types/projectTypes';
import config from '../auth/config.ts'
import { ProjectComponent } from '../store/projectsApiSlice.ts';

export const baseUrl = import.meta.env.VITE_API_GATEWAY_ENDPOINT

Amplify.configure(config)

async function fetchSessionToken() {
  const session = await fetchAuthSession();
  const sessionToken = session.tokens?.idToken?.toString()
  return sessionToken
}

// ponytail: returns { data } and throws { response: { data } } to keep the
// axios shapes the store slices already consume
async function request(method: string, path: string, body?: object | FormData) {
    const sessionToken = await fetchSessionToken()
    const isFormData = body instanceof FormData
    const headers: Record<string, string> = {
        "Authorization": `Bearer ${sessionToken}`,
    }
    if (body && !isFormData) headers["Content-Type"] = "application/json"
    const response = await fetch(`${baseUrl}${path}`, {
        method,
        headers,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    })
    const text = await response.text()
    // ponytail: fall back to raw text for non-JSON bodies, matching axios behavior
    let data
    try {
        data = text ? JSON.parse(text) : null
    } catch {
        data = text
    }
    if (!response.ok) {
        throw Object.assign(new Error(`${method} ${path} failed with status ${response.status}`), { response: { data } })
    }
    return { data }
}

export async function apiGetWork() {
    return request('GET', '/api/v1/work')
}

export async function apiPostWork(newWork: Work) {
    return request('POST', '/api/v1/work', newWork)
}

export async function apiPutWork(updateWork: Work) {
    return request('PUT', '/api/v1/work', updateWork)
}

export async function apiDeleteWork(deleteWork: Work) {
    return request('DELETE', '/api/v1/work', deleteWork)
}

export async function apiGetSkillsTools() {
    return request('GET', '/api/v1/skillsTools')
}

export async function apiPostSkillsTools(newSkillsTools: SkillsTools) {
    return request('POST', '/api/v1/skillsTools', newSkillsTools)
}

export async function apiPutSkillsTools(newSkillsTools: SkillsTools) {
    return request('PUT', '/api/v1/skillsTools', newSkillsTools)
}

export async function apiDeleteSkillsTools(deleteSkillsTools: SkillsTools) {
    return request('DELETE', '/api/v1/skillsTools', deleteSkillsTools)
}

export async function apiGetProjects() {
    return request('GET', '/api/v1/projects')
}

export async function apiPostProject(newProject: ProjectComponent) {
    if (newProject.image !== null) {
        return request('POST', '/api/v1/projects', projectToFormData(newProject))
    }
    return request('POST', '/api/v1/projects', newProject)
}

export async function apiPutProject(updateProject: ProjectComponent) {
    if (updateProject.image !== null) {
        // matches previous behavior: image updates are sent as POST form-data
        return request('POST', '/api/v1/projects', projectToFormData(updateProject))
    }
    return request('PUT', '/api/v1/projects', updateProject)
}

export async function apiDeleteProject(deleteProject: Project) {
    return request('DELETE', '/api/v1/projects', deleteProject)
}
