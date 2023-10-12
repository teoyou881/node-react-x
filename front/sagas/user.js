import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import { USER_ACTION_SAGA } from "../reducers/user";
import axios from "axios";

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
        yield console.log(action.payload);
        yield put({
            type: "user/loginSuccess",
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: "user/loginFailure",
            error: err.response.data,
        });
    }
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: USER_ACTION_SAGA.LOGOUT_SUCCESS_SAGA,
        });
    } catch (err) {
        yield put({
            type: "user/logoutFailure",
            error: err.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeLatest("user/loginRequest", logIn);
}

function* watchLogOut() {
    yield takeLatest("user/logoutRequest", logOut);
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
