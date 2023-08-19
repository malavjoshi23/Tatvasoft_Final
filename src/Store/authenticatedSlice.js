import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const authenticatedSlice = createSlice({
    name: "isAuthenticated",
    initialState,
    reducers: {
        updateAuthenticatedState(state, action) {
            console.log("REDUX-2");
            return action.payload;
        },
    },
});

export const { updateAuthenticatedState } = authenticatedSlice.actions;
export default authenticatedSlice.reducer;
