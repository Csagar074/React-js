 import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "Theme",
    initialState: {
        theme: localStorage.getItem('theme') || "light"
    },
    reducers: {
        // Actions
        themeChanger: (state) => {
            state.theme = (state.theme === 'light') ? 'dark' : 'light';

            localStorage.setItem('theme', state.theme);
        }
    }
});

export const { themeChanger } = themeSlice.actions;
export default themeSlice.reducer;