import { all, fork, takeLatest, put, call, throttle } from 'redux-saga/effects';
import axios from 'axios';
import { POST_ACTION } from '../actions/postAction';
import { USER_ACTION } from '../actions/userAction';

function addPostAPI(data) {
  // formdata should not be sent as the thing manipulated
  return axios.post('/post', data);

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

// todo: removeComment
function* removeComment(action) {
  try {
    yield put({
      type: POST_ACTION.REMOVE_COMMENT_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: POST_ACTION.REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
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
function loadUserPostsAPI(data) {
  return axios.get(`/user/${data.userId}/posts?lastId=${data.lastId | 0}`);
}
function* loadUserPosts(action) {
  // action.payload is lastId & userId
  console.log(action.payload);
  try {
    const result = yield call(loadUserPostsAPI, action.payload);
    console.log(result.data);

    yield put({
      type: POST_ACTION.LOAD_USER_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: POST_ACTION.LOAD_USER_POSTS_FAILURE,
      error: err.response.data,
      // error: "error",
    });
  }
}
function loadHashtagPostsAPI(data) {
  return axios.get(`/hashtag/${data.tag}?lastId=${data.lastId | 0}`);
}
function* loadHashtagPosts(action) {
  // action.payload is lastId & userId
  console.log(action.payload);
  try {
    const result = yield call(loadHashtagPostsAPI, action.payload);
    console.log(result.data);

    yield put({
      type: POST_ACTION.LOAD_HASHTAG_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: POST_ACTION.LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data,
      // error: "error",
    });
  }
}

function editPostAPI(data) {
  return axios.patch(`/post/${data.id}`, data.formData);
}
function* editPost(action) {
  // action.payload is lastId & userId
  console.log(action.payload);
  try {
    const result = yield call(editPostAPI, action.payload);
    console.log(result.data);

    yield put({
      type: POST_ACTION.EDIT_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: POST_ACTION.EDIT_POST_FAILURE,
      error: err.response,
      // error: "error",
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
function* watchLoadUserPosts() {
  yield takeLatest(POST_ACTION.LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchLoadHashtagPosts() {
  yield takeLatest(POST_ACTION.LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
function* watchEditPost() {
  yield takeLatest(POST_ACTION.EDIT_POST_REQUEST, editPost);
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
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchEditPost),
  ]);
}
