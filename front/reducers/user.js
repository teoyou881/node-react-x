// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    me: null,
    signUpdata: {},
    loginData: {},
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.me = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.me = null;
        },
    },
});
export const user = userSlice.reducer;
export const userAction = userSlice.actions;
