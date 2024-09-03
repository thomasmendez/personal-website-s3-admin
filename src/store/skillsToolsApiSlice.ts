import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { SkillsTools } from "../types/skillsToolsTypes"
import { axiosPostSkillsTools, axiosGetSkillsTools, axiosPutSkillsTools, axiosDeleteSkillsTools } from "../services/personalWebsiteApi"

export const postSkillsTools = createAsyncThunk(
    'post/skillsTools',
    async (postSkillsTools: SkillsTools, thunkApi) => {
        try {
            const response = await axiosPostSkillsTools(postSkillsTools)
            console.log(JSON.stringify(response.data))
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const getSkillsTools = createAsyncThunk(
    'get/skillsTools',
    async (_, thunkApi) => {
        try {
            const response = await axiosGetSkillsTools()
            console.log(JSON.stringify(response.data))
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const putSkillsTools = createAsyncThunk(
    'put/skillsTools',
    async (updateSkillsTools: SkillsTools, thunkApi) => {
        try {
            const response = await axiosPutSkillsTools(updateSkillsTools)
            console.log(JSON.stringify(response.data))
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const deleteSkillsTools = createAsyncThunk(
    'delete/skillsTools',
    async (deleteSkillsTools: SkillsTools, thunkApi) => {
        try {
            const response = await axiosDeleteSkillsTools(deleteSkillsTools)
            console.log(JSON.stringify(response.data))
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

interface SkillsToolsState {
    entities: SkillsTools[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: StateError | null | unknown;
    mode: string[]
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: SkillsToolsState = {
    entities: [],
    status: 'idle',
    error: null,
    mode: []
}

export const skillsToolsSlice = createSlice({
    name: 'skillsTools',
    initialState: initialState,
    reducers: {
        skillsToolsAdded: (state, action) => {
            state.entities.push(action.payload)
        },
        skillsToolsAdd: (state, action) => {
            const { index } = action.payload
            const newItem: SkillsTools = {
                personalWebsiteType: `SkillsTools${index}`,
                sortValue: `newType${index}`,
                category: `newCategory${index}`,
                type: `newType${index}`,
                list: [`newItem${index}`]
            }
            state.entities.push(newItem)
        },
        skillsToolsModeChange: (state, action) => {
            const { index, mode } = action.payload
            state.mode[index] = mode
        },
        skillsToolsCategoryChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    category: value,
                };
            }
        },
        skillsToolsTypeChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    type: value,
                };
            }
        },
        skillsToolsListChange: (state, action) => {
            const { index, listIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].list;
                if (listIndex >= 0 && listIndex < list.length) {
                    list[listIndex] = value;
                }
            }
        },
        skillsToolsListAdd: (state, action) => {
            const { index, newItem } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index].list.push(newItem);
            }
        },
        skillsToolsDelete: (state, action) => {
            const { index } = action.payload
            if (index >= 0 && index < state.entities.length) {
                state.entities.splice(index, 1)
            }
            if (index >= 0 && index < state.mode.length) {
                state.mode.splice(index, 1)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSkillsTools.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getSkillsTools.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.entities = action.payload
                state.mode.length = state.entities.length
                for (let i = 0; i < state.entities.length; i++) {
                    state.mode[i] = 'view'
                }
            })
            .addCase(getSkillsTools.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const getSkillsToolsMode = (state: { skillsTools: SkillsToolsState }) => state.skillsTools.mode;

export const selectAllSkillsTools = (state: { skillsTools: SkillsToolsState }) => state.skillsTools.entities;
export const getSkillsToolsStatus = (state: { skillsTools: SkillsToolsState }) => state.skillsTools.status;
export const getSkillsToolsError = (state: { skillsTools: SkillsToolsState }) => state.skillsTools.error;

export const { skillsToolsAdded, skillsToolsModeChange, skillsToolsListAdd,
    skillsToolsAdd, skillsToolsDelete,
    skillsToolsCategoryChange, skillsToolsTypeChange, skillsToolsListChange } = skillsToolsSlice.actions

export default skillsToolsSlice.reducer