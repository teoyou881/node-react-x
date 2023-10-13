import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import { POST_ACTION } from "../actions/postAction";
import axios from "axios";

function addPostAPI(data) {
    return axios.post("/api/post", data);
}

function* addPost(action) {
    try {
        //const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: POST_ACTION.ADD_POST_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        yield put({
            type: POST_ACTION.ADD_POST_FAILURE,
            error: err.response.data,
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
        // yield put({
        //     type: POST_ACTION.ADD_COMMENT_FAILURE,
        //
        //     error: err.response.data,
        // });
    }
}

function* watchAddPost() {
    yield takeLatest(POST_ACTION.ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(POST_ACTION.ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        // fork(watchLoadComments),
        // fork(watchLoadPost),
        // fork(watchLoadPosts),
        // fork(watchRemovePost),
        // fork(watchRetweet),
        // fork(watchUploadImages),
        // fork(watchLikePost),
        // fork(watchUnlikePost),
    ]);
}
