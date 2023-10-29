import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import axios from "axios";
import { USER_ACTION } from "../actions/userAction";

function logInAPI(data) {
    return axios.post("/user/login", data);
}
function logOutAPI(data) {
    return axios.post("/user/logout", data);
}
function signUpAPI(data) {
    return axios.post("/user", data);
}

function* logIn(action) {
    console.log("logIn saga");
    try {
        const result = yield call(logInAPI, action.payload);
        console.log(result);
        yield put({
            type: USER_ACTION.LOGIN_SUCCESS,
            payload: result,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.LOGIN_FAILURE,
            error: err,
        });
    }
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

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchSignUp),
        // fork(watchLoadUser),
        // fork(watchLoadFollowers),
        // fork(watchLoadFollowings),
        // fork(watchRemoveFollower),
        // fork(watchEditNickname),
    ]);
}
