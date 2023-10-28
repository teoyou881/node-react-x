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
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    me: null,
    followBtnId: null,
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
            state.logInLoading = false;
            state.logInDone = true;
            state.me = dummyUser(action.payload);
        },
        loginFailure: (state, action) => {
            state.logInLoading = false;
            state.logInDone = false;
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
            state.signUpDone = false;
        },
        signUpSuccess: (state, action) => {
            state.signUpLoading = false;
            state.signUpDone = true;
        },
        signUpFailure: (state, action) => {
            state.signUpLoading = false;
            state.signUpError = action.payload;
        },
        signUpDoneReset: (state, action) => {
            state.signUpDone = false;
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
            state.me.Posts = [{ id: action.payload }, ...state.me.Posts];
        },
        removePostOfMe: (state, action) => {
            state.me.Posts = state.me.Posts.filter(
                (v) => v.id !== action.payload,
            );
        },
        followRequest: (state, action) => {
            state.followLoading = true;
            state.followBtnId = action.payload;
        },
        followSuccess: (state, action) => {
            state.followLoading = false;
            state.followDone = true;
            state.me.Followings.push({ id: action.payload });
        },
        followFailure: (state, action) => {
            state.followLoading = false;
            state.followDone = true;
            state.followError = action.payload;
        },
        unfollowRequest: (state, action) => {
            state.unfollowLoading = true;
        },
        unfollowSuccess: (state, action) => {
            state.unfollowLoading = false;
            state.unfollowDone = true;
            state.me.Followings = state.me.Followings.filter(
                (v) => v.id !== action.payload,
            );
        },
        unfollowFailure: (state, action) => {
            state.unfollowLoading = false;
            state.unfollowDone = true;
            state.unfollowError = action.payload;
        },
    },
});
export const user = userSlice.reducer;
export const userAction = userSlice.actions;
