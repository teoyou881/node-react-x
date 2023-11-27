import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // The object starts with a uppercase letter like User, Images, and Comments,
  // what's the difference between it and the object starting with a lowercase like id content
  // It is all about sequelize.
  // uppercase means we are given data combined other info.
  mainPosts: [
    // mainPosts is an array of posts.
    // {
    //     //id of post
    //     id: 1,
    //     User: {
    //         id: 2,
    //         nickname: "Number2",
    //     },
    //     content: "#itomocode #test",
    //     Images: [
    //         {
    //             id: shortId.generate(),
    //             src: "https://cdn.pixabay.com/photo/2023/09/27/12/15/river-8279466_640.jpg",
    //         },
    //         {
    //             id: shortId.generate(),
    //             src: "https://cdn.pixabay.com/photo/2023/09/21/06/10/football-8266065_640.jpg",
    //         },
    //     ],
    //     Comments: [
    //         {
    //             id: shortId.generate(),
    //             User: {
    //                 id: shortId.generate(),
    //                 nickname: "haha",
    //             },
    //             content: "haha?",
    //         },
    //     ],
    // },
  ],
  firstVirtualized: [],
  changeVirtualized: [],
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikeLoading: false,
  unlikeDone: false,
  unlikeError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  singlePost: null,
  removeSinglePost: false,
};

/*
export const generateDummyPost = (number) =>
    Array(number)
        .fill()
        .map((v, i) => ({
            id: faker.number.int({ min: 1, max: 1000000 }),
            User: {
                id: shortId.generate(),
                nickname: faker.lorem.word(),
            },
            content: faker.lorem.lines(),
            Images: [
                {
                    src: faker.image.url(),
                },
            ],
            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: faker.lorem.word(),
                    },
                    content: faker.lorem.sentence(),
                },
            ],
        }));
 */
/*
const dummyPost = (data) => ({
    id: data.id,
    User: {
        id: 1,
        nickname: "teo",
    },
    content: data.content,
    Images: [],
    Comments: [],
});
*/
/*
const dummyComment = (data) => ({
    User: {
        nickname: "Teo",
    },
    content: data.content,
});
*/
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPostRequest: (state) => {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    addPostSuccess: (state, action) => {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts.unshift(action.payload);
      state.imagePaths = [];
    },
    addPostFailure: (state, action) => {
      state.addPostLoading = false;
      state.addPostError = action.error;
    },
    removePostRequest: (state) => {
      state.removePostLoading = true;
      state.removePostDone = false;
    },
    removePostSuccess: (state, action) => {
      state.removePostLoading = false;
      state.removePostDone = true;
      state.mainPosts = state.mainPosts.filter((v) => v.id !== action.payload.PostId);
      state.removeSinglePost = true;
      state.singlePost = null;
    },
    removePostFailure: (state, action) => {
      state.removePostLoading = false;
      state.removePostError = action.error;
    },
    loadPostsRequest: (state) => {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadPostsSuccess: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts.push(...action.payload.posts);
      if (!action.payload.more) {
        state.hasMorePosts = false;
      }
    },
    loadPostsFailure: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    },
    loadPostRequest: (state) => {
      state.loadPostLoading = true;
      state.loadPostDone = false;
      state.loadPostError = null;
    },
    loadPostSuccess: (state, action) => {
      state.loadPostLoading = false;
      state.loadPostDone = true;
      state.singlePost = action.payload;
    },
    loadPostFailure: (state, action) => {
      state.loadPostLoading = false;
      state.loadPostError = action.error;
    },
    addCommentRequest: (state) => {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSuccess: (state, action) => {
      state.addCommentLoading = false;
      state.addCommentDone = true;
      if (action.payload.single) {
        state.singlePost.Comments.push(action.payload.comment);
      } else {
        const post = state.mainPosts.find((v) => v.id === action.payload.comment.PostId);
        post.Comments.push(action.payload.comment);
      }
    },
    addCommentFailure: (state, action) => {
      state.addCommentLoading = false;
      state.addCommentError = action.error;
    },
    likePostRequest: (state) => {
      state.likePostLoading = true;
      state.likePostDone = false;
      state.likePostError = null;
    },
    likePostSuccess: (state, action) => {
      state.likePostLoading = false;
      state.likePostDone = true;
      // there is no mainPosts when user dispatch likePostRequest action on singlePost page
      if (state.mainPosts.length > 0) {
        state.mainPosts.find((v) => v.id === action.payload.PostId).Likers.push({ id: action.payload.UserId });
      }
      state.singlePost?.Likers.push({ id: action.payload.UserId });
    },
    likePostFailure: (state, action) => {
      state.likePostLoading = false;
      state.likePostError = action.error;
    },
    unlikePostRequest: (state) => {
      state.unlikeLoading = true;
      state.unlikeDone = false;
      state.unlikeError = null;
    },
    unlikePostSuccess: (state, action) => {
      state.unlikeLoading = false;
      state.unlikeDone = true;
      if (state.mainPosts.length > 0) {
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId);
        if (post) {
          post.Likers = post.Likers.filter((v) => v.id !== action.payload.UserId);
        } else {
          console.log('post not found');
        }
      }
      if (state.singlePost) {
        state.singlePost.Likers = state.singlePost.Likers.filter((v) => v.id !== action.payload.UserId);
      }
    },
    unlikePostFailure: (state, action) => {
      state.unlikeLoading = false;
      state.unlikeError = action.error;
    },
    changeNicknameRequest: (state) => {
      state.changeNicknameLoading = true;
      state.changeNicknameDone = false;
      state.changeNicknameError = null;
    },
    changeNicknameSuccess: (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameDone = true;
      // all posts and comments' user.nickname should be changed
      state.mainPosts.forEach((v) => {
        if (v.User.id === action.payload.UserId) {
          v.User.nickname = action.payload.nickname;
        }
        if (v.Comments) {
          v.Comments.forEach((c) => {
            if (c.User.id === action.payload.UserId) {
              c.User.nickname = action.payload.nickname;
            }
          });
        }
      });
    },
    changeNicknameFailure: (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameError = action.error;
    },
    uploadImagesRequest: (state) => {
      state.uploadImagesLoading = true;
      state.uploadImagesDone = false;
      state.uploadImagesError = null;
    },
    uploadImagesSuccess: (state, action) => {
      state.uploadImagesLoading = false;
      state.uploadImagesDone = true;
      state.imagePaths = action.payload;
    },
    uploadImagesFailure: (state, action) => {
      state.uploadImagesLoading = false;
      state.uploadImagesError = action.error;
    },
    removeImage: (state, action) => {
      state.imagePaths = state.imagePaths.filter((v, i) => i !== action.payload);
    },
    retweetRequest: (state) => {
      state.retweetLoading = true;
      state.retweetDone = false;
      state.retweetError = null;
    },
    retweetSuccess: (state, action) => {
      state.retweetLoading = false;
      state.retweetDone = true;
      state.mainPosts.unshift(action.payload);
    },
    retweetFailure: (state, action) => {
      state.retweetLoading = false;
      state.retweetError = action.error;
      state.retweetErrorClear = false;
    },
    loadUserPostsRequest: (state) => {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadUserPostsSuccess: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts.push(...action.payload.posts);
      if (!action.payload.more) {
        state.hasMorePosts = false;
      }
    },
    loadUserPostsFailure: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
      state.loadPostsErrorClear = false;
    },
    loadHashTagPostsRequest: (state) => {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadHashTagPostsError = null;
    },
    loadHashTagPostsSuccess: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts.push(...action.payload.posts);
      if (!action.payload.more) {
        state.hasMorePosts = false;
      }
    },
    loadHashTagPostsFailure: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
      state.loadPostsErrorClear = false;
    },

    // todo: removeComment
    // removeCommentRequest: (state, action) => {},
    // removeCommentSuccess: (state, action) => {},
    // removeCommentFailure: (state, action) => {},
  },
});

export const post = postSlice.reducer;
export const postAction = postSlice.actions;
