export default function* rootSaga() {
    yield all([fork(postSaga), fork(userSaga), fork(commentSaga)]);
}
