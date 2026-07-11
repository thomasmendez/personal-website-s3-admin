import { apiRequest } from './apiRequest'
import { Work } from './../types/workTypes'
import { SkillsTools } from './../types/skillsToolsTypes'
import { Project, projectToFormData } from './../types/projectTypes'
import { ProjectComponent } from '../store/projectsApiSlice.ts'

export const baseUrl = import.meta.env.VITE_API_GATEWAY_ENDPOINT

// ============================================
// Work
// ============================================
export async function axiosGetWork() {
  return apiRequest.get<Work[]>(`${baseUrl}/api/v1/work`)
}

export async function axiosPostWork(newWork: Work) {
  return apiRequest.post<Work>(`${baseUrl}/api/v1/work`, newWork)
}

export async function axiosPutWork(updateWork: Work) {
  return apiRequest.put<Work>(`${baseUrl}/api/v1/work`, updateWork)
}

export async function axiosDeleteWork(deleteWork: Work) {
  return apiRequest.delete(`${baseUrl}/api/v1/work`, { data: deleteWork })
}

// ============================================
// Skills & Tools
// ============================================
export async function axiosGetSkillsTools() {
  return apiRequest.get<SkillsTools[]>(`${baseUrl}/api/v1/skillsTools`)
}

export async function axiosPostSkillsTools(newSkillsTools: SkillsTools) {
  return apiRequest.post<SkillsTools>(`${baseUrl}/api/v1/skillsTools`, newSkillsTools)
}

export async function axiosPutSkillsTools(newSkillsTools: SkillsTools) {
  return apiRequest.put<SkillsTools>(`${baseUrl}/api/v1/skillsTools`, newSkillsTools)
}

export async function axiosDeleteSkillsTools(deleteSkillsTools: SkillsTools) {
  return apiRequest.delete(`${baseUrl}/api/v1/skillsTools`, { data: deleteSkillsTools })
}

// ============================================
// Projects
// ============================================
export async function axiosGetProjects() {
  return apiRequest.get<Project[]>(`${baseUrl}/api/v1/projects`)
}

export async function axiosPostProject(newProject: ProjectComponent) {
  if (newProject.image !== null) {
    const formData = projectToFormData(newProject)
    return apiRequest.post(`${baseUrl}/api/v1/projects`, formData)
  }
  return apiRequest.post(`${baseUrl}/api/v1/projects`, newProject)
}

export async function axiosPutProject(updateProject: ProjectComponent) {
  if (updateProject.image !== null) {
    const formData = projectToFormData(updateProject)
    // NOTE: preserved from the original — this was a POST even in the
    // "put" function when an image is present. Worth double-checking
    // this was intentional and not a copy/paste artifact.
    return apiRequest.post(`${baseUrl}/api/v1/projects`, formData)
  }
  return apiRequest.put(`${baseUrl}/api/v1/projects`, updateProject)
}

export async function axiosDeleteProject(deleteProject: Project) {
  return apiRequest.delete(`${baseUrl}/api/v1/projects`, { data: deleteProject })
}
