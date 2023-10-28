import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import axios from "axios";
import { USER_ACTION } from "../actions/userAction";

function logInAPI(data) {
    return axios.post("/api/login", data);
}
function signUpAPI(data) {
    return axios.post("http://localhost:3065/user", data);
}

function* logIn(action) {
    try {
        // yield put({
        // 	type: "LOG_IN_REQUEST",
        // })
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: USER_ACTION.LOGIN_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.LOGIN_FAILURE,
            error: err.response.data,
        });
    }
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
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
            type: USER_ACTION.UNFOLLOW_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.UNFOLLOW_FAILURE,
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
