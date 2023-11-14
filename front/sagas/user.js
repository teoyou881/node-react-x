import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import axios from "axios";
import { USER_ACTION } from "../actions/userAction";
import { POST_ACTION } from "../actions/postAction";

function logInAPI(data) {
    return axios.post("/user/login", data);
}
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.payload);
        yield put({
            type: USER_ACTION.LOGIN_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.LOGIN_FAILURE,
            error: err,
        });
    }
}
function loadUserAPI(data) {
    return axios.get(`/user/${data}`);
}
function* loadUser() {
    try {
        const result = yield call(loadUserAPI);
        yield put({
            type: USER_ACTION.LOAD_USER_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.LOAD_USER_FAILURE,
            error: err,
        });
    }
}
function loadMyInfoAPI() {
    return axios.get("/user");
}
function* loadMyInfo() {
    try {
        const result = yield call(loadMyInfoAPI);
        yield put({
            type: USER_ACTION.LOAD_MY_INFO_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.LOAD_MY_INFO_FAILURE,
            error: err,
        });
    }
}
function logOutAPI(data) {
    return axios.post("/user/logout", data);
}
function* logOut() {
    const result = yield call(logOutAPI);
    try {
        yield delay(1000);
        yield put({
            type: USER_ACTION.LOGOUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.LOGOUT_FAILURE,
            error: err.response.data,
        });
    }
}

function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}
function* follow(action) {
    try {
        const result = yield call(followAPI, action.payload);
        yield put({
            type: USER_ACTION.FOLLOW_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}
function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.payload);
        yield put({
            type: USER_ACTION.UNFOLLOW_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function signUpAPI(data) {
    return axios.post("/user", data);
}
function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.payload);
        yield put({
            type: USER_ACTION.SIGN_UP_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.SIGN_UP_FAILURE,
            error: err,
        });
    }
}
function changeNicknameAPI(data) {
    return axios.patch("/user/nickname", { nickname: data });
}
function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.payload);
        yield put({
            type: USER_ACTION.CHANGE_NICKNAME_SUCCESS,
            payload: result.data,
        });
        // After changing nickname, we need to change the nickname of the user in the post
        // So we need to dispatch the action to the post reducer
        yield put({
            type: POST_ACTION.CHANGE_NICKNAME_REQUEST,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.CHANGE_NICKNAME_FAILURE,
            error: err,
        });
    }
}

function loadFollowersAPI() {
    return axios.get("/user/followers");
}
function* loadFollowers() {
    try {
        const result = yield call(loadFollowersAPI);
        yield put({
            type: USER_ACTION.LOAD_FOLLOWERS_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.LOAD_FOLLOWERS_FAILURE,
            error: err,
        });
    }
}

function loadFollowingsAPI() {
    return axios.get("/user/followings");
}
function* loadFollowings() {
    try {
        const result = yield call(loadFollowingsAPI);
        yield put({
            type: USER_ACTION.LOAD_FOLLOWINGS_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.LOAD_FOLLOWINGS_FAILURE,
            error: err,
        });
    }
}

function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}
function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.payload);
        console.log(result.data);
        yield put({
            type: USER_ACTION.REMOVE_FOLLOWER_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.REMOVE_FOLLOWER_FAILURE,
            error: err,
        });
    }
}

function* loadMoreFollowings(action) {
    //debounce
    yield delay(100);
    try {
        yield put({
            type: USER_ACTION.LOAD_MORE_FOLLOWINGS_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.LOAD_MORE_FOLLOWINGS_FAILURE,
            error: err,
        });
    }
}
function* loadMoreFollowers(action) {
    //debounce
    yield delay(100);
    try {
        yield put({
            type: USER_ACTION.LOAD_MORE_FOLLOWERS_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.LOAD_MORE_FOLLOWERS_FAILURE,
            error: err,
        });
    }
}

function* watchLogIn() {
    yield takeLatest(USER_ACTION.LOGIN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(USER_ACTION.LOGOUT_REQUEST, logOut);
}
function* watchFollow() {
    yield takeLatest(USER_ACTION.FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
    yield takeLatest(USER_ACTION.UNFOLLOW_REQUEST, unfollow);
}
function* watchSignUp() {
    yield takeLatest(USER_ACTION.SIGN_UP_REQUEST, signUp);
}
function* watchLoadUser() {
    yield takeLatest(USER_ACTION.LOAD_USER_REQUEST, loadUser);
}
function* watchLoadMyInfo() {
    yield takeLatest(USER_ACTION.LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchChangeNickname() {
    yield takeLatest(USER_ACTION.CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchLoadFollowers() {
    yield takeLatest(USER_ACTION.LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
    yield takeLatest(USER_ACTION.LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchRemoveFollower() {
    yield takeLatest(USER_ACTION.REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* watchLoadMoreFollowings() {
    yield takeLatest(
        USER_ACTION.LOAD_MORE_FOLLOWINGS_REQUEST,
        loadMoreFollowings,
    );
}
function* watchLoadMoreFollowers() {
    yield takeLatest(
        USER_ACTION.LOAD_MORE_FOLLOWERS_REQUEST,
        loadMoreFollowers,
    );
}
export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchSignUp),
        fork(watchLoadUser),
        fork(watchLoadMyInfo),
        fork(watchChangeNickname),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchLoadMoreFollowings),
        fork(watchLoadMoreFollowers),
        // fork(watchEditNickname),
    ]);
}
