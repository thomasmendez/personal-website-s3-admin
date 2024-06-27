import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Work } from "../types/workTypes"
import { axiosGetWork } from "../services/personalWebsiteApi"

export const getWork = createAsyncThunk(
    'get/work',
    async (_, thunkApi) => {
        try {
            const response = await axiosGetWork()
            console.log(JSON.stringify(response.data))
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

interface WorkState {
    entities: Work[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: StateError | null | unknown;
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: WorkState = {
    entities: [],
    status: 'idle',
    error: null,
}

export const workSlice = createSlice({
    name: 'work',
    initialState: initialState,
    reducers: {
        workAdded: (state, action) => {
            state.entities.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWork.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getWork.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.entities = action.payload
            })
            .addCase(getWork.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})


export const selectAllWork = (state: { work: WorkState }) => state.work.entities;
export const getWorkStatus = (state: { work: WorkState }) => state.work.status;
export const getWorkError = (state: { work: WorkState }) => state.work.error;

export const { workAdded } = workSlice.actions

export default workSlice.reducer