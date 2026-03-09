import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    userDetail: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUserDetail: (state, action) => {
            state.userDetail = action.payload;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.userDetail = null;
        },
    },
});

export const {
    setAccessToken,
    setUserDetail,
    clearAuth
} = authSlice.actions;

export default authSlice.reducer;
