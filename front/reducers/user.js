// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";
import shortId from "shortid";
import { faker } from "@faker-js/faker";

const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadFollowersLoading: false,
    loadFollowersDone: false,
    loadFollowersError: null,
    loadFollowingsLoading: false,
    loadFollowingsDone: false,
    loadFollowingsError: null,
    loadMoreFollowingsLoading: false,
    loadMoreFollowingsDone: false,
    loadMoreFollowingsError: null,
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
    // With this, we can know which button is loading
    // Otherwise, all follow buttons will be loading
    followBtnId: null,
    signUpData: {},
    loginData: {},
    followingLastIndex: 10,
    followerLastIndex: 10,
    showFollowings: [],
};
/*
const dummyUser = (data) => ({
    email: data.email,
    nickname: "Teo",
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: "H1" }, { nickname: "H2" }, { nickname: "H3" }],
    Followers: [{ nickname: "F1" }, { nickname: "F2" }, { nickname: "F3" }],
});
*/
const dummyFollowers = () => ({
    id: faker.number.int(),
    nickname: faker.internet.userName(),
});
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
            state.logInLoading = true;
            state.logInDone = false;
            state.logInError = null;
        },
        loadMyInfoSuccess: (state, action) => {
            state.logInLoading = false;
            state.logInDone = true;
            state.me = action.payload;
        },
        loadMyInfoFailure: (state, action) => {
            state.logInLoading = false;
            state.logInDone = false;
            state.logInError = action.error.response.data;
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
            state.me.Posts = [...state.me.Posts, { id: action.payload }];
        },
        addCommentToMe: (state, action) => {
            state.me.Comments = [...state.me.Comments, { id: action.payload }];
        },
        removePostOfMe: (state, action) => {
            console.log(action.payload);
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
            state.followingLastIndex = 10;
        },
        loadFollowingsSuccess: (state, action) => {
            state.loadFollowingsLoading = false;
            state.loadFollowingsDone = true;
            state.me.Followings = action.payload;
            state.showFollowings = action.payload.slice(0, 10);
        },
        loadFollowingsFailure: (state, action) => {
            state.loadFollowingsLoading = false;
            state.loadFollowingsDone = true;
            state.loadFollowingsError = action.payload;
        },
        loadMoreFollowingsRequest: (state, action) => {
            state.loadMoreFollowingsLoading = true;
            state.loadMoreFollowingsDone = false;
            state.loadMoreFollowingsError = null;
        },
        loadMoreFollowingsSuccess: (state, action) => {
            state.loadMoreFollowingsLoading = false;
            state.loadMoreFollowingsDone = true;
            console.log(state.followingLastIndex);
            if (action.payload === state.me.Followings.length) {
                return;
            }

            if (action.payload + 10 > state.me.Followings.length) {
                state.followingLastIndex = state.me.Followings.length;
            } else {
                state.followingLastIndex = action.payload + 10;
            }
            console.log(state.followingLastIndex);
            const newArr = state.me.Followings.slice(
                action.payload,
                state.followingLastIndex,
            );
            state.showFollowings = [...state.showFollowings, ...newArr];
        },
        loadMoreFollowingsFailure: (state, action) => {
            state.loadMoreFollowingsLoading = false;
            state.loadMoreFollowingsDone = true;
            state.loadMoreFollowingsError = action.payload;
        },
    },
});
export const user = userSlice.reducer;
export const userAction = userSlice.actions;
