import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Project } from "../types/projectTypes"
import { axiosPostProject, axiosGetProjects, axiosPutProject, axiosDeleteProject } from "../services/personalWebsiteApi"

export const postProjects = createAsyncThunk(
    'post/projects',
    async (postProjects: ProjectComponent, thunkApi) => {
        try {
            const response = await axiosPostProject(postProjects)
            console.log(`Response POST: ${JSON.stringify(response.data)}`)
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const getProjects = createAsyncThunk(
    'get/projects',
    async (_, thunkApi) => {
        try {
            const response = await axiosGetProjects()
            console.log(`Response GET: ${JSON.stringify(response.data)}`)
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const putProjects = createAsyncThunk(
    'put/projects',
    async (updateProjects: ProjectComponent, thunkApi) => {
        try {
            const response = await axiosPutProject(updateProjects)
            console.log(`Response PUT: ${JSON.stringify(response.data)}`)
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const deleteProjects = createAsyncThunk(
    'delete/projects',
    async (deleteProjects: ProjectComponent, thunkApi) => {
        try {
            const response = await axiosDeleteProject(deleteProjects)
            console.log(`Response DELETE: ${JSON.stringify(response.data)}`)
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

interface ProjectsState {
    entities: ProjectComponent[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: StateError | null | unknown;
    mode: string[]
}

export interface ProjectComponent extends Project {
    mediaPreview: string | null
    image: File | null
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: ProjectsState = {
    entities: [],
    status: 'idle',
    error: null,
    mode: []
}

export const ProjectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        projectsAdded: (state, action) => {
            state.entities.push(action.payload)
        },
        projectsAdd: (state, action) => {
            const { index } = action.payload
            const newItem: ProjectComponent = {
                personalWebsiteType: `Projects`,
                sortValue: `newProject${index}`,
                category: `newCategory${index}`,
                name: `newProject${index}`,
                description: `newDescription${index}`,
                featuresDescription: `newFeatureDescription${index}`,
                role: `newRole${index}`,
                tasks: [`newTasks${index}`],
                teamSize: "1",
                teamRoles: [`newRoles${index}`],
                cloudServices: [`newCloudServices${index}`],
                tools: [`newTools${index}`],
                duration: "1 month",
                startDate: "Jan 2024",
                endDate: "Dec 2024",
                notes: `newNotes${index}`,
                link: "http://my-url",
                linkType: "YouTube",
                mediaLink: null,
                mediaPreview: null,
                image: null,
            }
            state.entities.push(newItem)
            state.mode.push('newItem')
        },
        projectsDelete: (state, action) => {
            const { index } = action.payload
            if (index >= 0 && index < state.entities.length) {
                state.entities.splice(index, 1)
            }
            if (index >= 0 && index < state.mode.length) {
                state.mode.splice(index, 1)
            }
        },
        projectsModeChange: (state, action) => {
            const { index, mode } = action.payload
            state.mode[index] = mode
        },
        projectsValueChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    sortValue: value,
                    name: value
                };
            }
        },
        projectsDescriptionChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    description: value,
                };
            }
        },
        projectsRoleChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    role: value,
                };
            }
        },
        projectsTasksListChange: (state, action) => {
            const { index, listIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].tasks;
                if (listIndex >= 0 && listIndex < list.length) {
                    list[listIndex] = value;
                }
            }
        },
        projectsTeamSizeChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    teamSize: value.toString(), // Ensure value is a primitive string
                };
            }
        },
        projectsTeamRolesListChange: (state, action) => {
            const { index, listIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].teamRoles ?? [];
                if (listIndex >= 0 && listIndex < list.length) {
                    list[listIndex] = value;
                }
            }
        },
        projectsCloudServicesListChange: (state, action) => {
            const { index, listIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].cloudServices ?? [];
                if (listIndex >= 0 && listIndex < list.length) {
                    list[listIndex] = value;
                }
            }
        },
        projectsToolsListChange: (state, action) => {
            const { index, listIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].tools;
                if (listIndex >= 0 && listIndex < list.length) {
                    list[listIndex] = value;
                }
            }
        },
        projectsDurationChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    teamSize: value,
                };
            }
        },
        // projectsStartDate
        projectsStartDateChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    startDate: value,
                };
            }
        },
        projectsEndDateChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    endDate: value,
                };
            }
        },
        projectsNotesChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    notes: value,
                };
            }
        },
        projectsMediaChange: (state, action) => {
            const { index, mediaLink, mediaPreview, image } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    mediaLink: mediaLink,
                    mediaPreview: mediaPreview,
                    image: image,
                };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // sort in descending order (latest to oldest)
                if (Array.isArray(action.payload)) {
                    action.payload.sort((a: Project, b: Project) => {
                        const dateA = new Date(a.endDate + " 01").getTime();
                        const dateB = new Date(b.endDate + " 01").getTime();
                        return dateB - dateA; 
                    });
                }
                state.entities = action.payload
                state.mode.length = state.entities.length
                for (let i = 0; i < state.entities.length; i++) {
                    state.mode[i] = 'view'
                }
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            // POST requests
            .addCase(postProjects.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(postProjects.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(postProjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            // PUT requests
            .addCase(putProjects.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(putProjects.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(putProjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            // DELETE requests
            .addCase(deleteProjects.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteProjects.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(deleteProjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const getProjectsMode = (state: { projects: ProjectsState }) => state.projects.mode;

export const selectAllProjects = (state: { projects: ProjectsState }) => state.projects.entities;
export const getProjectsStatus = (state: { projects: ProjectsState }) => state.projects.status;
export const getProjectsError = (state: { projects: ProjectsState }) => state.projects.error;

export const { projectsAdded, projectsModeChange,
    projectsAdd, projectsDelete,
    projectsValueChange, projectsDescriptionChange, 
    projectsRoleChange,
    projectsTasksListChange,
    projectsTeamSizeChange,
    projectsTeamRolesListChange,
    projectsCloudServicesListChange,
    projectsToolsListChange,
    projectsDurationChange,
    projectsStartDateChange,
    projectsEndDateChange,
    projectsNotesChange, 
    projectsMediaChange } = ProjectsSlice.actions

export default ProjectsSlice.reducer