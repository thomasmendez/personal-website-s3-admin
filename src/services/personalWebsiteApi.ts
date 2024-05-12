import { Work } from './../types/workTypes';
import { SkillsTools } from './../types/skillsToolsTypes';
import { Project } from './../types//projectTypes';
import axios from 'axios'

export const baseUrl = import.meta.env.VITE_PERSONAL_WEBSITE_SERVICE

const axiosInstance = axios.create()

export const axiosGetWork = () => {
    return axiosInstance.get(`${baseUrl}/api/v1/work`)
}

export const axiosPostWork = (newWork: Work) => {
    return axiosInstance.post(`${baseUrl}/api/v1/work}`, newWork)
}

export const axiosPutWork = (updateWork: Work) => {
    return axiosInstance.put(`${baseUrl}/api/v1/work`, updateWork)
}

export const axiosGetSkillsTools = () => {
    return axiosInstance.get(`${baseUrl}/api/v1/skillsTools`)
}

export const axiosPostSkillsTools = (newSkillsTools: SkillsTools) => {
    return axiosInstance.post(`${baseUrl}/api/v1/skillsTools}`, newSkillsTools)
}

export const axiosPutSkillsTools = (newSkillsTools: SkillsTools) => {
    return axiosInstance.put(`${baseUrl}/api/v1/skillsTools`, newSkillsTools)
}

export const axiosGetProjects = () => {
    return axiosInstance.get(`${baseUrl}/api/v1/projects`)
}

export const axiosPostProject = (newProject: Project) => {
    return axiosInstance.post(`${baseUrl}/api/v1/project}`, newProject)
}

export const axiosPutProject = (updateProject: Project) => {
    return axiosInstance.put(`${baseUrl}/api/v1/project`, updateProject)
}