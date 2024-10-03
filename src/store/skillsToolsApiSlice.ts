import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Categories, SkillsTools } from "../types/skillsToolsTypes"
import { axiosPostSkillsTools, axiosGetSkillsTools, axiosPutSkillsTools, axiosDeleteSkillsTools } from "../services/personalWebsiteApi"

export const postSkillsTools = createAsyncThunk(
    'post/skillsTools',
    async (postSkillsTools: SkillsTools, thunkApi) => {
        try {
            const response = await axiosPostSkillsTools(postSkillsTools)
            console.log(`Response POST: ${JSON.stringify(response.data)}`)
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
            console.log(`Response GET: ${JSON.stringify(response.data)}`)
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
            console.log(`Response PUT: ${JSON.stringify(response.data)}`)
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
            console.log(`Response DELETE: ${JSON.stringify(response.data)}`)
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
            const newCategory: Categories = {
                category: `newCategory`,
                list: [`newItem`]
            }
            const newItem: SkillsTools = {
                personalWebsiteType: `SkillsTools`,
                sortValue: `newType${index}`,
                categories: [newCategory]
            }
            state.entities.push(newItem)
            state.mode.push('newItem')
        },
        skillsToolsModeChange: (state, action) => {
            const { index, mode } = action.payload
            state.mode[index] = mode
        },
        skillsToolsValueChange: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index] = {
                    ...state.entities[index],
                    sortValue: value,
                };
            }
        },
        skillsToolsCategoryChange: (state, action) => {
        const { index, categoryIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length && categoryIndex >= 0 && categoryIndex < state.entities[index].categories.length) {
                state.entities = state.entities.map((skillTool, i) => {
                    // Check if this is the correct SkillsTools item to update
                    if (i === index) {
                        return {
                            ...skillTool,
                            categories: skillTool.categories.map((cat, j) => {
                                // Check if this is the correct Category item to update
                                if (j === categoryIndex) {
                                  return {
                                    ...cat,
                                    category: value,  // Only update the 'category' field
                                  };
                                }
                                return cat;
                            }),
                        };
                    }
                    return skillTool;
                });
            }
        },
        skillsToolsListChange: (state, action) => {
            const { index, categoryIndex, listIndex, value } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].categories[categoryIndex].list;
                if (listIndex >= 0 && listIndex < list.length) {
                    list[listIndex] = value;
                }
            }
        },
        skillsToolsCategoryListAdd: (state, action) => {
            const { index, categoryIndex, newItem } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                state.entities[index].categories[categoryIndex].list.push(newItem);
            }
        },
        skillsToolsCategoryListRemove: (state, action) => {
            const { index, categoryIndex, listIndex } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const list = state.entities[index].categories[categoryIndex].list;
                if (listIndex >= 0 && listIndex < list.length) {
                    list.splice(listIndex, 1);
                }
            }
        },
        skillsToolsAddCategory: (state, action) => {
            const { index } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const newCategory: Categories = {
                    category: `newCategory`,
                    list: [`newItem`]
                }
                state.entities[index].categories.push(newCategory)
            }
        },
        skillsToolsDeleteCategory: (state, action) => {
            const { index, categoryIndex } = action.payload;
            if (index >= 0 && index < state.entities.length) {
                const categories = state.entities[index].categories;
                if (categoryIndex >= 0 && categoryIndex < categories.length) {
                    categories.splice(categoryIndex, 1);
                }
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

export const { skillsToolsAdded, skillsToolsModeChange,
    skillsToolsValueChange, skillsToolsCategoryChange,
    skillsToolsCategoryListAdd, skillsToolsCategoryListRemove,
    skillsToolsAddCategory,
    skillsToolsAdd, skillsToolsDelete,
    skillsToolsDeleteCategory,
    skillsToolsListChange } = skillsToolsSlice.actions

export default skillsToolsSlice.reducer