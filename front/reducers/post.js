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
    imagePaths: [],
    hasMorePosts: true,
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
};

export const generateDummyPost = (number) =>
    Array(number)
        .fill()
        .map((v, i) => ({
            id: shortId.generate(),
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

const dummyComment = (data) => ({
    User: {
        nickname: "Teo",
    },
    content: data.content,
});
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
            console.log(action.payload);
            state.mainPosts = [dummyPost(action.payload), ...state.mainPosts];
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
                (v) => v.id !== action.payload,
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
            const postIndex = state.mainPosts.findIndex(
                (v) => v.id === action.payload.postId,
            );
            const post = state.mainPosts[postIndex];
            post.Comments = [dummyComment(action.payload), ...post.Comments];
            // state.mainPosts.Comments = [
            //     ...state.mainPosts.Comments,
            //     dummyComment(action.payload),
            // ];
        },
        addCommentFailure: (state, action) => {
            state.addCommentLoading = false;
            state.addCommentError = action.payload;
        },
        removeCommentRequest: (state, action) => {},
        removeCommentSuccess: (state, action) => {},
        removeCommentFailure: (state, action) => {},
    },
});

export const post = postSlice.reducer;
export const postAction = postSlice.actions;
