import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import axios from "axios";
import { USER_ACTION } from "../actions/userAction";

function logInAPI(data) {
    return axios.post("/api/login", data);
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

function* follow() {
    try {
        // TODO
        // API
        yield delay(1000);
        yield put({
            type: USER_ACTION.FOLLOW_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function* unfollow() {
    try {
        // TODO
        // API
        yield delay(1000);
        yield put({
            type: USER_ACTION.UNFOLLOW_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: USER_ACTION.UNFOLLOW_FAILURE,
            error: err.response.data,
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
    yield takeLatest(USER_ACTION.LOGOUT_REQUEST, follow);
}
function* watchUnfollow() {
    yield takeLatest(USER_ACTION.LOGOUT_REQUEST, unfollow);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
        // fork(watchLoadUser),
        // fork(watchSignUp),
        // fork(watchLoadFollowers),
        // fork(watchLoadFollowings),
        // fork(watchRemoveFollower),
        // fork(watchEditNickname),
    ]);
}
