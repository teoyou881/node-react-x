// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";

export const USER_ACTION_SAGA = {
    LOGIN_REQUEST: "user/loginRequest",
    LOGIN_SUCCESS: "user/loginSuccess",
    LOGIN_FAILURE: "user/loginFailure",
    LOGOUT_REQUEST: "user/logoutRequest",
    LOGOUT_SUCCESS: "user/logoutSuccess",
    LOGOUT_FAILURE: "user/logoutFailure",
    SIGN_UP_REQUEST: "user/signUpRequest",
    SIGN_UP_SUCCESS: "user/signUpSuccess",
    SIGN_UP_FAILURE: "user/signUpFailure",
    FOLLOW_REQUEST: "user/followRequest",
    FOLLOW_SUCCESS: "user/followSuccess",
    FOLLOW_FAILURE: "user/followFailure",
    UNFOLLOW_REQUEST: "user/unfollowRequest",
    UNFOLLOW_SUCCESS: "user/unfollowSuccess",
    UNFOLLOW_FAILURE: "user/unfollowFailure",
};

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
