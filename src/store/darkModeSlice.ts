import { createSlice } from "@reduxjs/toolkit"

interface DarkModeState {
    darkMode: boolean
}

const stored = window.localStorage.getItem('DARK_MODE')
const hour = new Date().getHours()
const initialState: DarkModeState = {
    // first visit defaults to dark between 6pm and 8am, otherwise respect stored choice
    darkMode: stored != null ? stored == 'true' : (hour >= 18 || hour < 8)
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
