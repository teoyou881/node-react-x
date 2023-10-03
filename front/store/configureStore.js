// next-redux-wrapper -->
// In order to create static apps or do server-side rendering in Next.js,
// you need another store instance on the server.
// This server store needs to be able to access the redux store and
// match server-side data with data from redux. The next-redux-wrapper is what makes this access possible.

// HYDRATE -->
// The HYDRATE state should be defined so that server-side data can be stored and
//used by the client during initial rendering.

import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "../reducers/user";

const rootReducer = combineReducers({ user });

export const makeStore = () => {
    const store = configureStore({
        reducer: (state, action) => {
            switch (action.type) {
                case HYDRATE:
                    return action.payload;
                default:
                    return rootReducer(state, action);
            }
        },
        devTools: process.env.NODE_ENV !== "production",
    });
    return store;
};

const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === "development",
});

export default wrapper;
