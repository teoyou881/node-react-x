import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import axios from "axios";
import { USER_ACTION } from "../actions/userAction";

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

function* follow(action) {
    try {
        // TODO
        // API
        yield delay(1000);
        yield put({
            type: USER_ACTION.FOLLOW_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function* unfollow(action) {
    try {
        // TODO
        // API
        yield delay(1000);
        yield put({
            type: USER_ACTION.UNFOLLOW_SUCCESS,
            payload: action.payload,
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
    } catch (err) {
        console.log(err);
        yield put({
            type: USER_ACTION.CHANGE_NICKNAME_FAILURE,
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
    yield takeLatest(USER_ACTION.LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchChangeNickname() {
    yield takeLatest(USER_ACTION.CHANGE_NICKNAME_REQUEST, changeNickname);
}
export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchSignUp),
        fork(watchLoadUser),
        fork(watchChangeNickname),
        // fork(watchLoadFollowers),
        // fork(watchLoadFollowings),
        // fork(watchRemoveFollower),
        // fork(watchEditNickname),
    ]);
}
