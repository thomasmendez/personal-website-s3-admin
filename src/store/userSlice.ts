import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSessionUser } from "../services/auth"
import { User } from "../types/userTypes"

export const getUser = createAsyncThunk(
    'get/user',
    async (_, thunkApi) => {
        try {
            const response = await getSessionUser()
            console.log(`Response GET: ${JSON.stringify(response)}`)
            return response
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

interface UserState {
    entity: User
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: StateError | null | unknown;
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: UserState = {
    entity: {groups: [], isAdmin: false},
    status: 'idle',
    error: null,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    builder
        .addCase(getUser.pending, (state) => {
            state.status = 'pending'
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.entity = action.payload
        })
        .addCase(getUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export const getCurrentUser = (state: { user: UserState }) => state.user.entity;
export const getUserStatus = (state: { user: UserState }) => state.user.status;
export const getUserError = (state: { user: UserState }) => state.user.error;

export default UserSlice.reducer