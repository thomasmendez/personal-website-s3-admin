import { Amplify } from 'aws-amplify'
import { fetchAuthSession } from 'aws-amplify/auth';
import { Work } from './../types/workTypes';
import { SkillsTools } from './../types/skillsToolsTypes';
import { Project, projectToFormData } from './../types/projectTypes';
import config from '../auth/config.ts'
import axios from 'axios'
import { ProjectComponent } from '../store/projectsApiSlice.ts';

export const baseUrl = import.meta.env.VITE_API_GATEWAY_ENDPOINT

const axiosInstance = axios.create()

Amplify.configure(config)

async function fetchSessionToken() {
  const session = await fetchAuthSession();
  const sessionToken = session.tokens?.idToken?.toString()
  return sessionToken
}

async function getHeaders() {
    const sessionToken = await fetchSessionToken()
    const options = {
        headers: {
            "Authorization": `Bearer ${sessionToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        }
    }
    return options    
}

async function getHeadersFormData() {
    const sessionToken = await fetchSessionToken()
    const options = {
        headers: {
            "Authorization": `Bearer ${sessionToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "multipart/form-data",
        }
    }
    return options    
}

export async function axiosGetWork() {
    return axiosInstance.get(`${baseUrl}/api/v1/work`, await getHeaders())
}

export async function axiosPostWork(newWork: Work) {
    return axiosInstance.post(`${baseUrl}/api/v1/work}`, newWork, await getHeaders())
}

export async function axiosPutWork(updateWork: Work) {
    return axiosInstance.put(`${baseUrl}/api/v1/work`, updateWork, await getHeaders())
}

export async function axiosDeleteWork(deleteWork: Work) {
    const sessionToken = await fetchSessionToken()
    return axiosInstance.delete(`${baseUrl}/api/v1/work`, {
        headers: {
            "Authorization": `Bearer ${sessionToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        data: deleteWork
    })
}

export async function axiosGetSkillsTools() {
    return axiosInstance.get(`${baseUrl}/api/v1/skillsTools`, await getHeaders())
}

export async function axiosPostSkillsTools(newSkillsTools: SkillsTools) {
    return axiosInstance.post(`${baseUrl}/api/v1/skillsTools}`, newSkillsTools, await getHeaders())
}

export async function axiosPutSkillsTools(newSkillsTools: SkillsTools) {
    return axiosInstance.put(`${baseUrl}/api/v1/skillsTools`, newSkillsTools, await getHeaders())
}

export async function axiosDeleteSkillsTools(deleteSkillsTools: SkillsTools) {
    const sessionToken = await fetchSessionToken()
    return axiosInstance.delete(`${baseUrl}/api/v1/skillsTools`, {
        headers: {
            "Authorization": `Bearer ${sessionToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        data: deleteSkillsTools
    })
}

export async function axiosGetProjects() {
    return axiosInstance.get(`${baseUrl}/api/v1/projects`, await getHeaders())
}

export async function axiosPostProject(newProject: ProjectComponent) {
    if (newProject.image !== null) {
        const formData = projectToFormData(newProject)
        return axiosInstance.post(`${baseUrl}/api/v1/projects`, formData, await getHeadersFormData())
    }
    return axiosInstance.post(`${baseUrl}/api/v1/projects`, newProject, await getHeaders())
}

export async function axiosPutProject(updateProject: ProjectComponent) {
    if (updateProject.image !== null) {
        const formData = projectToFormData(updateProject)
        return axiosInstance.post(`${baseUrl}/api/v1/projects`, formData, await getHeadersFormData())
    }
    return axiosInstance.put(`${baseUrl}/api/v1/projects`, updateProject, await getHeaders())
}

export async function axiosDeleteProject(deleteProject: Project) {
    const sessionToken = await fetchSessionToken()
    return axiosInstance.delete(`${baseUrl}/api/v1/projects`, {
        headers: {
            "Authorization": `Bearer ${sessionToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        data: deleteProject
    })
}