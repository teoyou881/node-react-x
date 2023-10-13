import { createSlice } from "@reduxjs/toolkit";
import shortId from "shortid";

const initialState = {
    // The object starts with a uppercase letter like User, Images, and Comments,
    // what's the difference between it and the object starting with a lowercase like id content
    // It is all about sequelize.
    // uppercase means we are given data combined other info.
    mainPosts: [
        {
            //id of post
            id: 1,
            User: {
                id: 2,
                nickname: "whoru",
            },
            content: "Hi #hash #express",
            Images: [
                {
                    src: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
                },
                {
                    src: "https://cdn.pixabay.com/photo/2023/09/27/12/15/river-8279466_640.jpg",
                },
                {
                    src: "https://cdn.pixabay.com/photo/2023/09/21/06/10/football-8266065_640.jpg",
                },
            ],
            Comments: [
                {
                    User: {
                        nickname: "ha",
                    },
                    content: "wow",
                },
                {
                    User: {
                        nickname: "ja",
                    },
                    content: "I want to sell",
                },
                {
                    User: {
                        nickname: "go",
                    },
                    content: "whoru?",
                },
            ],
        },
    ],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
};

const dummyPost = (data) => ({
    id: shortId.generate(),
    User: {
        id: 1,
        nickname: "teo",
    },
    content: data,
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
            state.mainPosts = [dummyPost(action.payload), ...state.mainPosts];
            state.imagePaths = [];
        },
        addPostFailure: (state, action) => {
            state.addPostLoading = false;
            state.addPostError = action.payload;
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
    },
});

export const post = postSlice.reducer;
export const postAction = postSlice.actions;
