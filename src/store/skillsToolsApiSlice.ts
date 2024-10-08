import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { SkillsTools } from "../types/skillsToolsTypes"
import { axiosGetSkillsTools } from "../services/personalWebsiteApi"

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

interface SkillsToolsState {
    entities: SkillsTools[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: StateError | null | unknown;
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: SkillsToolsState = {
    entities: [],
    status: 'idle',
    error: null,
}

export const skillsToolsSlice = createSlice({
    name: 'skillsTools',
    initialState: initialState,
    reducers: {
        skillsToolsAdded: (state, action) => {
            state.entities.push(action.payload)
        },
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


export const selectAllSkillsTools = (state: { skillsTools: SkillsToolsState }) => state.skillsTools.entities;
export const getSkillsToolsStatus = (state: { skillsTools: SkillsToolsState }) => state.skillsTools.status;
export const getSkillsToolsError = (state: { skillsTools: SkillsToolsState }) => state.skillsTools.error;

export const { skillsToolsAdded } = skillsToolsSlice.actions

export default skillsToolsSlice.reducer