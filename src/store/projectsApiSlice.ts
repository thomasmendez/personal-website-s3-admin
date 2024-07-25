import { createSlice, createSelector } from "@reduxjs/toolkit"
import { Project } from "../types/projectTypes"
import { projectsApi } from "../services/projectsApi"; // Adjust the path as necessary

interface ProjectsState {
    entities: Project[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: StateError | null | unknown;
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: ProjectsState = {
    entities: [],
    status: 'idle',
    error: null,
}

export const ProjectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        projectsAdded: (state, action) => {
            state.entities.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getProjects.pending, (state) => {
            //     state.status = 'pending'
            // })
            // .addCase(getProjects.fulfilled, (state, action) => {
            //     state.status = 'succeeded'
            //     state.entities = action.payload
            // })
            // .addCase(getProjects.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.payload
            // })
            .addMatcher(projectsApi.endpoints.getProjects.matchPending, (state) => {
                state.status = 'pending'
            })
            .addMatcher(projectsApi.endpoints.getProjects.matchFulfilled, (state, action) => {
                state.status = 'succeeded'
                state.entities = action.payload
            })
            .addMatcher(projectsApi.endpoints.getProjects.matchRejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

export const selectAllProjects = (state: { projects: ProjectsState }) => state.projects.entities;
export const getProjectsStatus = (state: { projects: ProjectsState }) => state.projects.status;
export const getProjectsError = (state: { projects: ProjectsState }) => state.projects.error;

export const { projectsAdded } = ProjectsSlice.actions

export default ProjectsSlice.reducer