import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { postAction } from "../reducers/post";
import { userAction } from "../reducers/user";
const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, firstAccess } =
        useSelector((state) => state.post);
    const dispatch = useDispatch();
    const { retweetError } = useSelector((state) => state.post);
    useEffect(() => {
        if (retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);

    useEffect(() => {
        dispatch(userAction.loadMyInfoRequest());
        if (!firstAccess) {
            dispatch(postAction.loadPostsRequest());
        }
    }, []);

    // Just infinite scrolling
    useEffect(() => {
        function onScroll() {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 400
            ) {
                if (hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch(postAction.loadPostsRequest(lastId));
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMorePosts, loadPostsLoading]);

    return (
        <div>
            <AppLayout>
                {me && <PostForm />}
                {/* This is one of the anti-patterns that using index into a key as props
			In most case, we must not pass index to a key
			especially, there is a possibility that post can be deleted.
			But if elements in iterator are not changed or deleted, can use index*/}

                {mainPosts?.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </AppLayout>
        </div>
    );
};

export default Home;
