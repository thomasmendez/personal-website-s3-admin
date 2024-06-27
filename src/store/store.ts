import { configureStore } from "@reduxjs/toolkit"
import workReducer from "./workApiSlice"
import skillsToolsReducer from "./skillsToolsApiSlice"
import projectsReducer from "./projectsApiSlice"

export const store = configureStore({
    reducer: {
        work: workReducer,
        skillsTools: skillsToolsReducer,
        projects: projectsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch