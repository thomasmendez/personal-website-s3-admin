import { http, HttpResponse } from 'msw'
import { store } from '../store/store'
import WorkMock from './__fixtures__/work'
import SkillsToolsMock from './__fixtures__/skillsTools'
import ProjectsMock from './__fixtures__/projects'
export const baseUrl = import.meta.env.VITE_API_GATEWAY_ENDPOINT

// const getStoreState() {
//   return store.getState()
// }

export const handlers = [
  // POST

  // GET
  http.get(`${baseUrl}/api/v1/work`, () => {
    return HttpResponse.json(WorkMock)
  }),

  http.get(`${baseUrl}/api/v1/skillsTools`, () => {
    return HttpResponse.json(SkillsToolsMock)
  }),

  http.get(`${baseUrl}/api/v1/projects`, () => {
    return HttpResponse.json(ProjectsMock)
  }),

  // PUT
  http.put(`${baseUrl}/api/v1/work`, () => {
    // const updatedIndex = store.getState().work.mode.indexOf('updated')
    // const work = store.getState().work.entities[updatedIndex]
    const work = "TODO"
    console.log(JSON.stringify(work))
    return HttpResponse.json(work)
  }),

  http.put(`${baseUrl}/api/v1/skillsTools`, () => {
    const updatedIndex = store.getState().skillsTools.mode.indexOf('updated')
    const skillsTools = store.getState().skillsTools.entities[updatedIndex]
    console.log(JSON.stringify(skillsTools))
    return HttpResponse.json(skillsTools)
  }),

  http.put(`${baseUrl}/api/v1/projects`, () => {
    const updatedIndex = store.getState().projects.mode.indexOf('updated')
    const projects = store.getState().projects.entities[updatedIndex]
    console.log(JSON.stringify(projects))
    return HttpResponse.json(projects)
  }),

  // DELETE
  http.delete(`${baseUrl}/api/v1/work`, () => {
    console.log("deleted")
    return HttpResponse.json(200)
  }),

  http.delete(`${baseUrl}/api/v1/skillsTools`, () => {
    console.log("deleted")
    return HttpResponse.json(200)
  }),

  http.delete(`${baseUrl}/api/v1/projects`, () => {
    console.log("deleted")
    return HttpResponse.json(200)
  }),
]