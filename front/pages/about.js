import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { postAction } from "../reducers/post";
import { userAction } from "../reducers/user";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import Head from "next/head";

const About = () => {
    const { loadUser } = useSelector((state) => state.user);

    return (
        <AppLayout>
            <Head>
                <title>Teo | NodeX</title>
            </Head>

            {loadUser ? (
                <div>
                    <div>{loadUser.nickname} Profile</div>
                    <div>{`email: ${loadUser.email}`}</div>
                    <div>{`nickname: ${loadUser.nickname}`}</div>
                    <div>{`${loadUser.Posts.length} posts`}</div>
                    <div>{`${loadUser.Followings.length} followings`}</div>
                    <div>{`${loadUser.Followers.length} followers`}</div>
                </div>
            ) : null}
        </AppLayout>
    );
};
export const getStaticProps = wrapper.getStaticProps(
    (store) =>
        async (req, res, ...et) => {
            store.dispatch(userAction.loadUserRequest(2));
            store.dispatch(END);
            await store.sagaTask.toPromise();
        },
);
export default About;
