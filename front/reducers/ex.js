// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        isLoggedIn: false,
        user: null,
        signUpdata: {},
        loginData: {},
    },
    post: {
        mainPosts: [],
    },
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user.isLoggedIn = true;
            state.user.user = action.payload;
        },
        logout: (state, action) => {
            state.user.isLoggedIn = false;
            state.user.user = action.payload;
        },
    },
});
export const user = userSlice.name;
export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
