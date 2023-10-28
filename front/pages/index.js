import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { postAction } from "../reducers/post";
import styled from "styled-components";
const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, firstAccess } =
        useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!firstAccess) {
            dispatch(postAction.loadPostsRequest());
        }
    }, []);

    // Just infinite scrolling
    useEffect(() => {
        function onScroll() {
            // console.log(
            //     window.scrollY, // how much user scrolled
            //     document.documentElement.clientHeight, // height of the screen
            //     document.documentElement.scrollHeight, // height of the whole page
            // );
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 400
            ) {
                console.log("hasMorePosts", hasMorePosts);
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch(postAction.loadPostsRequest());
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMorePosts, loadPostsLoading]);

    // useEffect(() => {
    //     function findDiv() {
    //         let heights = firstVirtualized.map((data) => data.height);
    //         let min = Number.MAX_SAFE_INTEGER;
    //         let near = 0;
    //
    //         for (let i = 0; i < heights.length; i++) {
    //             let abs = Math.abs(heights[i] - window.scrollY);
    //             // console.log("abs", abs, "min", min);
    //             if (abs < min) {
    //                 min = abs;
    //                 near = i + 1; // 바로 numbers[i]로 찾는다. 따로 index 찾지말고
    //             } else {
    //                 break;
    //             }
    //         }
    //
    //         const findDiv = firstVirtualized.find((v) => v.index === near);
    //         if (findDiv) {
    //             const div = document.getElementById(findDiv.postId);
    //             console.log("div", div);
    //         }
    //     }
    //     window.addEventListener("scroll", findDiv);
    //     return () => {
    //         window.removeEventListener("scroll", findDiv);
    //     };
    // });

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
