import { createSlice } from "@reduxjs/toolkit"

interface DarkModeState {
    darkMode: boolean
}

const initialState: DarkModeState = {
    darkMode: window.localStorage.getItem('DARK_MODE') == 'true' ? true : false
}

export const DarkModeSlice = createSlice({
    name: 'darkMode',
    initialState: initialState,
    reducers: {
        changeDarkMode: (state, action) => {
            window.localStorage.setItem('DARK_MODE', JSON.stringify(action.payload))
            state.darkMode = action.payload
        },
    },
})

export const getDarkMode = (state: { darkMode: DarkModeState }) => state.darkMode.darkMode;

export const { changeDarkMode } = DarkModeSlice.actions

export default DarkModeSlice.reducer