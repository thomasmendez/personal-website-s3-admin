import { configureStore } from "@reduxjs/toolkit"
import darkModeReducer from "./darkModeSlice"
import workReducer from "./workApiSlice"
import skillsToolsReducer from "./skillsToolsApiSlice"
import projectsReducer from "./projectsApiSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        work: workReducer,
        skillsTools: skillsToolsReducer,
        projects: projectsReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['projects/projectsMediaChange'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch