import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser(state, action) {
            if (Object.keys(action.payload).length === 0) return {};
            console.log("REDUX");
            return { ...state, ...action.payload };
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
