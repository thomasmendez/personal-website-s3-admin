import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Project } from "../types/projectTypes"
import { axiosGetProjects } from "../services/personalWebsiteApi"

export const getProjects = createAsyncThunk(
    'get/projects',
    async (_, thunkApi) => {
        try {
            const response = await axiosGetProjects()
            console.log(JSON.stringify(response.data))
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

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
        ProjectsAdded: (state, action) => {
            state.entities.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.entities = action.payload
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})


export const selectAllProjects = (state: { Projects: ProjectsState }) => state.Projects.entities;
export const getProjectsStatus = (state: { Projects: ProjectsState }) => state.Projects.status;
export const getProjectsError = (state: { Projects: ProjectsState }) => state.Projects.error;

export const { ProjectsAdded } = ProjectsSlice.actions

export default ProjectsSlice.reducer