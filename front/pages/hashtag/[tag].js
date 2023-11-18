import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Card } from "antd";
import { END } from "redux-saga";
import Head from "next/head";
import { useRouter } from "next/router";
import { postAction } from "../../reducers/post";
import axios from "axios";
import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import { userAction } from "../../reducers/user";

const User = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { tag } = router.query;
    const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
        (state) => state.post,
    );

    useEffect(() => {
        const onScroll = () => {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (hasMorePosts && !loadPostLoading) {
                    //get posts by userId
                    const lastId = mainPosts[mainPosts?.length - 1]?.id;
                    dispatch(
                        postAction.loadUserPostsRequest({ lastId, userId: id }),
                    );
                }
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [mainPosts?.length, hasMorePosts, loadPostLoading]);

    if (mainPosts.length < 1) {
        return (
            <AppLayout>
                <div>No posts were found for #{name}.</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head>
                <title>NodeX | posts by #{tag} hashtag</title>
            </Head>
            {mainPosts?.map((c) => (
                <PostCard key={c.id} post={c} />
            ))}
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, res, params, ...etc }) => {
            const cookie = req ? req.headers.cookie : "";
            axios.defaults.headers.Cookie = "";
            if (req && cookie) {
                axios.defaults.headers.Cookie = cookie;
            }

            store.dispatch(userAction.loadMyInfoRequest());

            store.dispatch(
                postAction.loadHashTagPostsRequest({
                    tag: params.tag,
                }),
            );
            store.dispatch(END);
            await store.sagaTask.toPromise();
        },
);
export default User;
