import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Work } from "../types/workTypes"
import { axiosPostWork, axiosGetWork, axiosPutWork, axiosDeleteWork } from "../services/personalWebsiteApi"

export const postWork = createAsyncThunk(
    'post/work',
    async (postWork: Work, thunkApi) => {
        try {
            const response = await axiosPostWork(postWork)
            console.log(`Response POST: ${JSON.stringify(response.data)}`)
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

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

export const putWork = createAsyncThunk(
    'put/work',
    async (updateWork: Work, thunkApi) => {
        try {
            const response = await axiosPutWork(updateWork)
            console.log(`Response PUT: ${JSON.stringify(response.data)}`)
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const deleteWork = createAsyncThunk(
    'delete/work',
    async (deleteWork: Work, thunkApi) => {
        try {
            const response = await axiosDeleteWork(deleteWork)
            console.log(`Response DELETE: ${JSON.stringify(response.data)}`)
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
    mode: string[]
}

interface StateError {
    message: string,
    statusCode: number
}

const initialState: WorkState = {
    entities: [],
    status: 'idle',
    error: null,
    mode: []
}

export const workSlice = createSlice({
    name: 'work',
    initialState: initialState,
    reducers: {
        workAdded: (state, action) => {
            state.entities.push(action.payload)
        },
        workAdd: (state, action) => {
            const { index } = action.payload
            console.log(index)
            const newItem: Work = {
                personalWebsiteType: 'Work',
                sortValue: `YYYY-MM-DD`,
                jobTitle: `newJob${index}`,
                company: `newCompany${index}`,
                location: {
                    city: `newCity${index}`,
                    state: `newState${index}`
                },
                startDate: `YYYY-MM-DD`,
                endDate: `YYYY-MM-DD`,
                jobRole: `newJobRole${index}`,
                jobDescription: [`newJobDescription${index}`]
            }
            state.entities.push(newItem)
            state.mode.push('newItem')
        },
        workDelete: (state, action) => {
            const { index } = action.payload
            if (index >= 0 && index < state.entities.length) {
                state.entities.splice(index, 1)
            }
            if (index >= 0 && index < state.mode.length) {
                state.mode.splice(index, 1)
            }
        },
        workModeChange: (state, action) => {
            const { index, mode } = action.payload
            state.mode[index] = mode
        },
        workChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    jobTitle: value
                };
            }
        },
        workCompanyChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    company: value
                };
            }
        },
        workLocationCityChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    location: {
                        ...state.entities[index].location,
                        city: value
                    }
                };
            }
        },
        workLocationStateChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    location: {
                        ...state.entities[index].location,
                        state: value
                    }
                };
            }
        },
        workStartDateChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    startDate: value
                };
            }
        },
        workEndDateChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    sortValue: value,
                    endDate: value
                };
            }
        },
        workJobRoleChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    jobRole: value
                };
            }
        },
        workJobDescriptionListChange: (state, action) => {
            const { index, listIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].jobDescription;
                if (listIndex >= 0 && listIndex < list.length) {
                    list[listIndex] = value;
                }
            }
        },
        workJobDescriptionListAdd: (state, action) => {
            const { index, newItemIndex, newItem } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index].jobDescription.splice(newItemIndex, 0, newItem);
                
            }
        },
        workJobDescriptionListRemove: (state, action) => {
            const { index, listIndex } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].jobDescription;
                if (listIndex >= 0 && listIndex < list.length) {
                    list.splice(listIndex, 1);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWork.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getWork.fulfilled, (state, action) => {
                state.status = 'succeeded' // sorting is handled by backend
                state.entities = action.payload
                state.mode.length = state.entities.length
                for (let i = 0; i < state.entities.length; i++) {
                    state.mode[i] = 'view'
                }   
            })
            .addCase(getWork.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const getWorkMode = (state: { work: WorkState }) => state.work.mode;

export const selectAllWork = (state: { work: WorkState }) => state.work.entities;
export const getWorkStatus = (state: { work: WorkState }) => state.work.status;
export const getWorkError = (state: { work: WorkState }) => state.work.error;

export const { workAdded, workModeChange,
    workChange, workCompanyChange,
    workLocationCityChange, workLocationStateChange,
    workStartDateChange,
    workEndDateChange,
    workJobRoleChange,
    workJobDescriptionListChange,
    workJobDescriptionListAdd,
    workJobDescriptionListRemove,
    workAdd, workDelete,
} = workSlice.actions

export default workSlice.reducer