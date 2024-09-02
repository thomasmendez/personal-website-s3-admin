import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { SkillsTools } from "../types/skillsToolsTypes"
import { axiosGetSkillsTools, axiosPutSkillsTools } from "../services/personalWebsiteApi"

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

interface SkillsToolsState {
    entities: SkillsTools[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: StateError | null | unknown;
    mode: 'view' | 'edit'
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: SkillsToolsState = {
    entities: [],
    status: 'idle',
    error: null,
    mode: 'view',
}

export const skillsToolsSlice = createSlice({
    name: 'skillsTools',
    initialState: initialState,
    reducers: {
        skillsToolsAdded: (state, action) => {
            state.entities.push(action.payload)
        },
        skillsToolsModeChange: (state, action) => {
            state.mode = action.payload
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
    skillsToolsCategoryChange, skillsToolsTypeChange, skillsToolsListChange } = skillsToolsSlice.actions

export default skillsToolsSlice.reducer