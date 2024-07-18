import { configureStore } from "@reduxjs/toolkit"
import darkModeReducer from "./darkModeSlice"
import workReducer from "./workApiSlice"
import skillsToolsReducer from "./skillsToolsApiSlice"
import projectsReducer from "./projectsApiSlice"

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        work: workReducer,
        skillsTools: skillsToolsReducer,
        projects: projectsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch