import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./user";

const initialState = {
    // The object starts with a uppercase letter like User, Images, and Comments,
    // what's the difference between it and the object starting with a lowercase like id content
    // It is all about sequelize.
    // uppercase means we are given data combined other info.
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "teo",
            },
            content: "first content #hash #express",
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
    postAdded: false,
};

const dummyPost = {
    id: 2,
    content: "dummy",
    User: {
        id: 1,
        nickname: "teo",
    },
    Images: [],
    Comments: [],
};
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.mainPosts = [dummyPost, ...state.mainPosts];
        },
    },
});

export const post = postSlice.reducer;
export const postAction = postSlice.actions;
