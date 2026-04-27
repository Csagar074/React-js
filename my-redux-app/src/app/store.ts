import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import themeReducer from "../features/counter/theme/themeSlice";

export const store = configureStore({
    reducer: {
        counterReducer,
        themeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>