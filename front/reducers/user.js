// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
    me: null,
    signUpData: {},
    loginData: {},
};
const dummyUser = (data) => ({
    email: data.email,
    nickname: "Teo",
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: "H1" }, { nickname: "H2" }, { nickname: "H3" }],
    Followers: [{ nickname: "F1" }, { nickname: "F2" }, { nickname: "F3" }],
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.logInLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoggingIn = false;
            state.logInDone = true;
            state.me = dummyUser(action.payload);
        },
        loginFailure: (state, action) => {
            state.isLoggingIn = false;
            state.isLoggedIn = false;
        },
        logoutRequest: (state, action) => {
            state.logoutLoading = true;
        },
        logoutSuccess: (state, action) => {
            state.logoutLoading = false;
            state.logoutDone = false;
            state.me = null;
        },
        logoutFailure: (state, action) => {
            state.logoutLoading = false;
            state.logoutError = action.payload;
        },
        signUpRequest: (state, action) => {
            state.signUpLoading = true;
        },
        signUpSuccess: (state, action) => {
            state.signUpLoading = false;
            state.signUpDone = true;
        },
        signUpFailure: (state, action) => {
            state.signUpLoading = false;
            state.signUpError = action.payload;
        },
        changeNicknameRequest: (state, action) => {
            state.changeNicknameLoading = true;
        },
        changeNicknameSuccess: (state, action) => {
            state.changeNicknameLoading = false;
            state.changeNicknameDone = true;
            state.me = action.payload;
        },
        changeNicknameFailure: (state, action) => {
            state.changeNicknameLoading = false;
            state.changeNicknameError = action.payload;
        },
        addPostToMe: (state, action) => {
            console.log(action);
            state.me.Posts = [{ id: action.payload }, ...state.me.Posts];
        },
        removePostOfMe: (state, action) => {},
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
