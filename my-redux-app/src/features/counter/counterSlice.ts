import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "Counter",
    initialState: {
        counter: 0,
    },
    reducers: {
        // Actions
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            if (state.counter > 0) {
                state.counter -= 1;
            }
        },
        reset: (state) => {
            state.counter = 0;
        }
    }
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;