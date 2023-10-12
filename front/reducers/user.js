// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    isLoggingOut: false,
    me: null,
    signUpdata: {},
    loginData: {},
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.isLoggingIn = true;
        },
        loginSuccess: (state, action) => {
            state.isLoggingIn = false;
            state.isLoggedIn = true;
            state.me = action.payload;
        },
        loginFailure: (state, action) => {
            state.isLoggingIn = false;
            state.isLoggedIn = false;
        },
        logoutRequest: (state, action) => {
            state.isLoggingOut = true;
        },
        logoutSuccess: (state, action) => {
            state.isLoggingOut = false;
            state.isLoggedIn = false;
            state.me = null;
        },
        logoutFailure: (state, action) => {
            state.isLoggingOut = false;
            state.isLoggedIn = false;
        },
        signUpRequest: (state, action) => {},
        signUpSuccess: (state, action) => {},
        signUpFailure: (state, action) => {},
        followRequest: (state, action) => {},
        followSuccess: (state, action) => {},
        followFailure: (state, action) => {},
        unfollowRequest: (state, action) => {},
        unfollowSuccess: (state, action) => {},
        unfollowFailure: (state, action) => {},
    },
});
export const user = userSlice.reducer;
export const userAction = userSlice.actions;
