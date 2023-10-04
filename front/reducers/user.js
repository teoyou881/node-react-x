// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: "",
    signUpdata: {},
    loginData: {},
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.email = "";
        },
    },
});
export const user = userSlice.reducer;
export const userAction = userSlice.actions;
