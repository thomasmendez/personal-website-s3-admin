import { Work } from './../types/workTypes';
import { SkillsTools } from './../types/skillsToolsTypes';
import { Project } from './../types//projectTypes';
import axios from 'axios'

export const baseUrl = import.meta.env.VITE_PERSONAL_WEBSITE_SERVICE

const axiosInstance = axios.create()

const options = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
    }
}

export const axiosGetWork = () => {
    return axiosInstance.get(`${baseUrl}/api/v1/work`, options)
}

export const axiosPostWork = (newWork: Work) => {
    return axiosInstance.post(`${baseUrl}/api/v1/work}`, newWork, options)
}

export const axiosPutWork = (updateWork: Work) => {
    return axiosInstance.put(`${baseUrl}/api/v1/work`, updateWork, options)
}

export const axiosGetSkillsTools = () => {
    return axiosInstance.get(`${baseUrl}/api/v1/skillsTools`, options)
}

export const axiosPostSkillsTools = (newSkillsTools: SkillsTools) => {
    return axiosInstance.post(`${baseUrl}/api/v1/skillsTools}`, newSkillsTools, options)
}

export const axiosPutSkillsTools = (newSkillsTools: SkillsTools) => {
    return axiosInstance.put(`${baseUrl}/api/v1/skillsTools`, newSkillsTools, options)
}

export const axiosGetProjects = () => {
    return axiosInstance.get(`${baseUrl}/api/v1/projects`, options)
}

export const axiosPostProject = (newProject: Project) => {
    return axiosInstance.post(`${baseUrl}/api/v1/projects`, newProject, options)
}

export const axiosPutProject = (updateProject: Project) => {
    return axiosInstance.put(`${baseUrl}/api/v1/project`, updateProject, options)
}