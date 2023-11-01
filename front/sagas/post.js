import {
    all,
    fork,
    takeLatest,
    put,
    delay,
    call,
    throttle,
    debounce,
} from "redux-saga/effects";
import { POST_ACTION } from "../actions/postAction";
import axios from "axios";
import { USER_ACTION } from "../actions/userAction";
import shortId from "shortid";
import { generateDummyPost } from "../reducers/post";

function addPostAPI(data) {
    return axios.post("/post", { content: data });
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.payload);
        yield put({
            type: POST_ACTION.ADD_POST_SUCCESS,
            payload: result.data,
        });
        yield put({
            type: USER_ACTION.ADD_POST_TO_ME,
            payload: result.data.id,
        });
    } catch (err) {
        yield put({
            type: POST_ACTION.ADD_POST_FAILURE,
            error: err,
            // error: err.response.data,
        });
    }
}
function removePostAPI(data) {
    return axios.delete("/api/post", data);
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
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.payload);
        console.log(result.data);
        yield put({
            type: POST_ACTION.ADD_COMMENT_SUCCESS,
            payload: result.data,
        });
        yield put({
            type: USER_ACTION.ADD_COMMENT_TO_ME,
            payload: result.data.id,
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

function loadPostsAPI() {
    return axios.get("/posts");
}

function* loadPosts() {
    try {
        const result = yield call(loadPostsAPI);
        yield put({
            type: POST_ACTION.LOAD_POSTS_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.LOAD_POSTS_FAILURE,
            error: err,
            // error: err.response.data,
        });
    }
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
function* watchLoadPosts() {
    yield takeLatest(POST_ACTION.LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchRemoveComment),
        fork(watchLoadPosts),
    ]);
}
