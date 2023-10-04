// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainPosts: [],
};
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
});
export const post = postSlice.reducer;
export const userAction = postSlice.actions;
