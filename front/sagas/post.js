import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import { POST_ACTION_SAGA } from "../actions/postAction";
import axios from "axios";

function addPostAPI(data) {
    return axios.post("/api/post", data);
}

function* addPost(action) {
    try {
        //const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: POST_ACTION_SAGA.ADD_POST_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: POST_ACTION_SAGA.ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(POST_ACTION_SAGA.ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        // fork(watchAddComment),
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
