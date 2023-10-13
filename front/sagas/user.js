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

function* watchLogIn() {
    yield takeLatest(USER_ACTION.LOGIN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(USER_ACTION.LOGOUT_REQUEST, logOut);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        // fork(watchLoadUser),
        // fork(watchSignUp),
        // fork(watchFollow),
        // fork(watchUnfollow),
        // fork(watchLoadFollowers),
        // fork(watchLoadFollowings),
        // fork(watchRemoveFollower),
        // fork(watchEditNickname),
    ]);
}
