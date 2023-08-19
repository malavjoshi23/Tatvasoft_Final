import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import authenticatedSlice from "./authenticatedSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        isAuthenticated: authenticatedSlice,
    },
});

export default store;
