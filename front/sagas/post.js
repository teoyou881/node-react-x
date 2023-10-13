import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import { POST_ACTION } from "../actions/postAction";
import axios from "axios";
import shortId from "shortid";
import { USER_ACTION } from "../actions/userAction";

function addPostAPI(data) {
    return axios.post("/api/post", data);
}
function removePostAPI(data) {
    return axios.delete("/api/post", data);
}

function* addPost(action) {
    try {
        //const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: POST_ACTION.ADD_POST_SUCCESS,
            payload: { content: action.payload, id },
        });
        yield put({
            type: USER_ACTION.ADD_POST_TO_ME,
            payload: id,
        });
    } catch (err) {
        yield put({
            type: POST_ACTION.ADD_POST_FAILURE,
            error: err,
            // error: err.response.data,
        });
    }
}

function* removePost(action) {
    try {
        //const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: POST_ACTION.REMOVE_POST_SUCCESS,
            payload: action.payload,
        });
        yield put({
            type: USER_ACTION.REMOVE_POST_OF_ME,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: POST_ACTION.REMOVE_POST_FAILURE,
            error: err,
            // error: err.response.data,
        });
    }
}

function* addComment(action) {
    try {
        //const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: POST_ACTION.ADD_COMMENT_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.ADD_COMMENT_FAILURE,
            error: err,
            // error: err.response.data,
        });
    }
}
function* removeComment(action) {
    try {
    } catch (err) {}
}

function* watchAddPost() {
    yield takeLatest(POST_ACTION.ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
    yield takeLatest(POST_ACTION.REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
    yield takeLatest(POST_ACTION.ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
    yield takeLatest(POST_ACTION.ADD_COMMENT_REQUEST, removeComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchRemoveComment),
    ]);
}
