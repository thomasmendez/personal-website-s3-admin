import { configureStore } from "@reduxjs/toolkit"
import workReducer from "./workApiSlice"
import skillsToolsReducer from "./skillsToolsApiSlice"
// import projectsReducer from "./projectsApiSlice"
import { projectsApi } from "../services/projectsApi"

export const store = configureStore({
    reducer: {
        work: workReducer,
        skillsTools: skillsToolsReducer,
        // projects: projectsReducer
        // projects: projectsReducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(projectsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch