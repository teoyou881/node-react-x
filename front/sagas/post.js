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
    // formdata should not be sent as the thing manipulated
    return axios.post("/post", data);

    // return axios.post("/post", { content: data });
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
            payload: { id: result.data.id },
        });
    } catch (err) {
        yield put({
            type: POST_ACTION.ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}
function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}
function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.payload);
        yield put({
            type: POST_ACTION.REMOVE_POST_SUCCESS,
            payload: result.data,
        });
        yield put({
            type: USER_ACTION.REMOVE_POST_OF_ME,
            payload: result.data,
        });
    } catch (err) {
        yield put({
            type: POST_ACTION.REMOVE_POST_FAILURE,
            error: err.response.data,
        });
    }
}
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.payload);
        yield put({
            type: POST_ACTION.ADD_COMMENT_SUCCESS,
            payload: { comment: result.data, single: action.payload.single },
        });
        yield put({
            type: USER_ACTION.ADD_COMMENT_TO_ME,
            payload: result.data.id,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}
function* removeComment(action) {
    try {
    } catch (err) {}
}

function loadPostsAPI(data) {
    return axios.get(`/posts?lastId=${data || 0}`);
}

function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.payload);
        yield put({
            type: POST_ACTION.LOAD_POSTS_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}
function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`);
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.payload);
        yield put({
            type: POST_ACTION.LIKE_POST_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.LIKE_POST_FAILURE,
            error: err.response.data,
        });
    }
}
function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/like`);
}
function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.payload);
        yield put({
            type: POST_ACTION.UNLIKE_POST_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.UNLIKE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* changeNickname(action) {
    try {
        yield put({
            type: POST_ACTION.CHANGE_NICKNAME_SUCCESS,
            payload: action.payload,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        });
    }
}

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);
    // surround data with {} to send data as json is not a proper way
    // return axios.post(`/post/images`, {data});
}
function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.payload);
        yield put({
            type: POST_ACTION.UPLOAD_IMAGES_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        });
    }
}

function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet`, data);
}
function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.payload);
        yield put({
            type: POST_ACTION.RETWEET_SUCCESS,
            payload: result.data,
        });
        yield put({
            type: USER_ACTION.ADD_POST_TO_ME,
            payload: { id: result.data.id, RetweetId: result.data.RetweetId },
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.RETWEET_FAILURE,
            error: err.response.data,
        });
    }
}
function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}
function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.payload);
        yield put({
            type: POST_ACTION.LOAD_POST_SUCCESS,
            payload: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_ACTION.LOAD_POST_FAILURE,
            error: err.response.data,
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
function* watchLikePost() {
    yield takeLatest(POST_ACTION.LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
    yield takeLatest(POST_ACTION.UNLIKE_POST_REQUEST, unlikePost);
}
function* watchChangeNickname() {
    yield takeLatest(POST_ACTION.CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchUploadImages() {
    yield takeLatest(POST_ACTION.UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRetweet() {
    yield takeLatest(POST_ACTION.RETWEET_REQUEST, retweet);
}
function* watchLoadPost() {
    yield takeLatest(POST_ACTION.LOAD_POST_REQUEST, loadPost);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchRemoveComment),
        fork(watchLoadPosts),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchChangeNickname),
        fork(watchUploadImages),
        fork(watchRetweet),
        fork(watchLoadPost),
    ]);
}
