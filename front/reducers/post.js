import { createSlice } from "@reduxjs/toolkit";
import shortId from "shortid";
import { faker } from "@faker-js/faker";

const initialState = {
    // The object starts with a uppercase letter like User, Images, and Comments,
    // what's the difference between it and the object starting with a lowercase like id content
    // It is all about sequelize.
    // uppercase means we are given data combined other info.
    mainPosts: [
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
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    removeCommentLoading: false,
    removeCommentDone: false,
    removeCommentError: null,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
    firstAccess: false,
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
    name: "post",
    initialState,
    reducers: {
        addPostRequest: (state, action) => {
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
            state.addPostError = action.payload;
        },
        removePostRequest: (state, action) => {
            state.removePostLoading = true;
            state.removePostDone = false;
        },
        removePostSuccess: (state, action) => {
            state.removePostLoading = false;
            state.removePostDone = true;
            state.mainPosts = state.mainPosts.filter(
                (v) => v.id !== action.payload.PostId,
            );
        },
        removePostFailure: (state, action) => {
            state.removePostLoading = false;
            state.removePostError = action.payload;
        },
        loadPostsRequest: (state, action) => {
            state.loadPostsLoading = true;
            state.loadPostsDone = false;
            state.loadPostsError = null;
            state.firstAccess = true;
        },
        loadPostsSuccess: (state, action) => {
            state.loadPostsLoading = false;
            state.loadPostsDone = true;
            state.mainPosts = state.mainPosts.concat(action.payload);
            state.hasMorePosts = state.mainPosts.length < 50;
        },
        loadPostsFailure: (state, action) => {
            state.loadPostsLoading = false;
            state.loadPostsError = action.payload;
        },
        addCommentRequest: (state, action) => {
            state.addCommentLoading = true;
            state.addCommentDone = false;
            state.addCommentError = null;
        },
        addCommentSuccess: (state, action) => {
            state.addCommentLoading = false;
            state.addCommentDone = true;
            const post = state.mainPosts.find(
                (v) => v.id === action.payload.PostId,
            );
            post.Comments.unshift(action.payload);
            // state.mainPosts.Comments = [
            //     ...state.mainPosts.Comments,
            //     dummyComment(action.payload),
            // ];
        },
        addCommentFailure: (state, action) => {
            state.addCommentLoading = false;
            state.addCommentError = action.payload;
        },
        likePostRequest: (state, action) => {
            state.likePostLoading = true;
            state.likePostDone = false;
            state.likePostError = null;
        },
        likePostSuccess: (state, action) => {
            state.likePostLoading = false;
            state.likePostDone = true;
            state.mainPosts
                .find((v) => v.id === action.payload.PostId)
                .Likers.push({ id: action.payload.UserId });
        },
        likePostFailure: (state, action) => {
            state.likePostLoading = false;
            state.likePostError = action.payload;
        },
        unlikePostRequest: (state, action) => {
            state.unlikeLoading = true;
            state.unlikeDone = false;
            state.unlikeError = null;
        },
        unlikePostSuccess: (state, action) => {
            state.unlikeLoading = false;
            state.unlikeDone = true;
            const post = state.mainPosts.find(
                (v) => v.id === action.payload.PostId,
            );
            post.Likers = post.Likers.filter(
                (v) => v.id !== action.payload.UserId,
            );
        },
        unlikePostFailure: (state, action) => {
            state.unlikeLoading = false;
            state.unlikeError = action.payload;
        },
        changeNicknameRequest: (state, action) => {
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
            state.changeNicknameError = action.payload;
        },

        removeCommentRequest: (state, action) => {},
        removeCommentSuccess: (state, action) => {},
        removeCommentFailure: (state, action) => {},
        firstVirtualized: (state, action) => {
            if (state.firstVirtualized.length > 0) {
                let last =
                    state.firstVirtualized[state.firstVirtualized.length - 1];
                action.payload.height += last.height;
            }
            state.firstVirtualized = [
                ...state.firstVirtualized,
                action.payload,
            ];
        },
        changeVirtualized: (state, action) => {
            // state.virtualized.find(
            //     (v) => v.postId === action.payload.postId,
            // ).height = action.payload.height;
            //
            // let heights = state.virtualized.map((v) => v.height);
            // heights.reduce((accumulator, current, currentIndex) => {
            //     state.virtualized[currentIndex].height = accumulator;
            //
            //     console.log(currentIndex, accumulator, current);
            //     return accumulator + current;
            // }, 0);
            if (action.payload.index === 0) {
                state.changeVirtualized = [];
            }
            if (state.changeVirtualized.length > 0) {
                let last =
                    state.changeVirtualized[state.changeVirtualized.length - 1];
                action.payload.height += last.height;
            }
            state.changeVirtualized = [
                ...state.changeVirtualized,
                action.payload,
            ];
        },
    },
});

export const post = postSlice.reducer;
export const postAction = postSlice.actions;
