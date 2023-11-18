import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    loadUserLoading: false,
    loadUserDone: false,
    loadUserError: null,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadFollowersLoading: false,
    loadFollowersDone: false,
    loadFollowersError: null,
    loadFollowingsLoading: false,
    loadFollowingsDone: false,
    loadFollowingsError: null,
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
    removeFollowerLoading: false,
    removeFollowerDone: false,
    removeFollowerError: null,
    me: null,
    loadUser: null,
    // With this, we can know which button is loading
    // Otherwise, all follow buttons will be loading
    followBtnId: null,
    signUpData: {},
    loginData: {},
    showFollowingIndex: 10,
    showFollowerIndex: 10,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.logInLoading = true;
            state.logInDone = false;
            state.logInError = null;
        },
        loginSuccess: (state, action) => {
            state.logInLoading = false;
            state.logInDone = true;
            state.me = action.payload;
        },
        loginFailure: (state, action) => {
            state.logInLoading = false;
            state.logInDone = false;
            state.logInError = action.error.response.data;
        },
        loadMyInfoRequest: (state, action) => {
            state.loadMyInfoLoading = true;
            state.loadMyInfoDone = false;
            state.loadMyInfoError = null;
        },
        loadMyInfoSuccess: (state, action) => {
            state.loadMyInfoLoading = false;
            state.loadMyInfoDone = true;
            state.me = action.payload;
            if (state.me) {
                if (action.payload.Followings.length < 10) {
                    state.showFollowingIndex = action.payload.Followings.length;
                }
                if (action.payload.Followers.length < 10) {
                    state.showFollowerIndex = action.payload.Followers.length;
                }
            }
        },
        loadMyInfoFailure: (state, action) => {
            state.loadMyInfoLoading = false;
            state.loadMyInfoDone = false;
            state.loadMyInfoError = action.error.response.data;
        },
        loadUserRequest: (state, action) => {
            state.loadUserLoading = true;
            state.loadUserDone = false;
            state.loadUserError = null;
        },
        loadUserSuccess: (state, action) => {
            state.loadUserLoading = false;
            state.loadUserDone = true;
            state.loadUser = action.payload;
        },
        loadUserFailure: (state, action) => {
            state.loadUserLoading = false;
            state.loadUserDone = false;
            state.loadUserError = action.error.response.data;
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
            state.changeNicknameDone = false;
            state.changeNicknameError = null;
        },
        changeNicknameSuccess: (state, action) => {
            state.changeNicknameLoading = false;
            state.changeNicknameDone = true;
            state.me.nickname = action.payload.nickname;
        },
        changeNicknameFailure: (state, action) => {
            state.changeNicknameLoading = false;
            state.changeNicknameError = action.payload;
        },
        addPostToMe: (state, action) => {
            state.me.Posts = [
                ...state.me.Posts,
                { id: action.payload.id, RetweetId: action.payload.RetweetId },
            ];
        },
        addCommentToMe: (state, action) => {
            state.me.Comments = [...state.me.Comments, { id: action.payload }];
        },
        removePostOfMe: (state, action) => {
            state.me.Posts = state.me.Posts.filter(
                (v) => v.id !== action.payload.PostId,
            );
        },
        followRequest: (state, action) => {
            state.followLoading = true;
            state.followDone = false;
            state.followError = null;
            state.followBtnId = action.payload.UserId;
        },
        followSuccess: (state, action) => {
            state.followLoading = false;
            state.followDone = true;
            state.me.Followings.push({ id: action.payload.UserId });
            if (state.me.Followings.length < 10) {
                state.showFollowingIndex = state.me.Followings.length;
            } else {
                state.showFollowingIndex = 10;
            }
        },
        followFailure: (state, action) => {
            state.followLoading = false;
            state.followDone = true;
            state.followError = action.payload;
        },
        unfollowRequest: (state, action) => {
            state.unfollowLoading = true;
            state.unfollowDone = false;
            state.unfollowError = null;
        },
        unfollowSuccess: (state, action) => {
            state.unfollowLoading = false;
            state.unfollowDone = true;
            state.me.Followings = state.me.Followings.filter(
                (v) => v.id !== action.payload.UserId,
            );
            state.showFollowingIndex = state.me.Followings.length;
        },
        unfollowFailure: (state, action) => {
            state.unfollowLoading = false;
            state.unfollowDone = true;
            state.unfollowError = action.payload;
        },
        removeFollowerRequest: (state, action) => {
            state.removeFollowerLoading = true;
            state.removeFollowerDone = false;
            state.removeFollowerError = null;
        },
        removeFollowerSuccess: (state, action) => {
            state.removeFollowerLoading = false;
            state.removeFollowerDone = true;
            state.me.Followers = state.me.Followers.filter(
                (v) => v.id !== action.payload.UserId,
            );
            state.showFollowerIndex = state.me.Followers.length;
        },
        removeFollowerFailure: (state, action) => {
            state.removeFollowerLoading = false;
            state.removeFollowerDone = true;
            state.removeFollowerError = action.payload;
        },
        loadFollowersRequest: (state, action) => {
            state.loadFollowersLoading = true;
            state.loadFollowersDone = false;
            state.loadFollowersError = null;
            if (state.me.Followers.length < 10) {
                state.showFollowerIndex = state.me.Followers.length;
            } else {
                state.showFollowerIndex = 10;
            }
        },
        loadFollowersSuccess: (state, action) => {
            state.loadFollowersLoading = false;
            state.loadFollowersDone = true;
            state.me.Followers = action.payload;
        },
        loadFollowersFailure: (state, action) => {
            state.loadFollowersLoading = false;
            state.loadFollowersDone = true;
            state.loadFollowersError = action.payload;
        },
        loadFollowingsRequest: (state, action) => {
            state.loadFollowingsLoading = true;
            state.loadFollowingsDone = false;
            state.loadFollowingsError = null;
            if (state.me.Followings.length < 10) {
                state.showFollowingIndex = state.me.Followings.length;
            } else {
                state.showFollowingIndex = 10;
            }
        },
        loadFollowingsSuccess: (state, action) => {
            state.loadFollowingsLoading = false;
            state.loadFollowingsDone = true;
            state.me.Followings = action.payload;
        },
        loadFollowingsFailure: (state, action) => {
            state.loadFollowingsLoading = false;
            state.loadFollowingsDone = true;
            state.loadFollowingsError = action.payload;
        },
        loadMoreFollowingsRequest: (state, action) => {
            if (action.payload === state.me.Followings.length) {
            } else if (action.payload + 10 > state.me.Followings.length) {
                state.showFollowingIndex = state.me.Followings.length;
            } else {
                state.showFollowingIndex = action.payload + 10;
            }
        },

        loadMoreFollowersRequest: (state, action) => {
            if (action.payload === state.me.Followers.length) {
            } else if (action.payload + 10 > state.me.Followers.length) {
                state.showFollowerIndex = state.me.Followers.length;
            } else {
                state.showFollowerIndex = action.payload + 10;
            }
        },
    },
});
export const user = userSlice.reducer;
export const userAction = userSlice.actions;
