import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { postAction } from "../reducers/post";
import { userAction } from "../reducers/user";
import {
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
    List,
    ScrollSync,
} from "react-virtualized";

const Home = () => {
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 100,
        // keyMapper: (index) => index,
    });

    const [clickCommentForm, setClickCommentForm] = useState();
    const { me, logInLoading, logoutLoading } = useSelector(
        (state) => state.user,
    );
    const {
        mainPosts,
        hasMorePosts,
        loadPostsLoading,
        addCommentLoading,
        addCommentDone,
        addPostLoading,
        removePostDone,
    } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postAction.loadPostsRequest());
    }, []);
    useEffect(() => {
        document.body.style.overflow = "hidden";
    });
    // function updateRowHeight() {
    //     if (clickedCommentForm) {
    //         console.log("recompute");
    //         cache.clearAll();
    //         cache.recomputeRowHeights();
    //     }
    // }
    // useEffect(() => {
    //     if (clickedCommentForm) {
    //         updateRowHeight();
    //     }
    // }, []);

    // Just infinite scrolling
    // useEffect(() => {
    //     function onScroll() {
    //         console.log(
    //             window.scrollY,
    //             document.documentElement.clientHeight,
    //             document.documentElement.scrollHeight,
    //         );
    //         if (
    //             window.scrollY + document.documentElement.clientHeight >
    //             document.documentElement.scrollHeight - 400
    //         ) {
    //             console.log("hasMorePosts", hasMorePosts);
    //             if (hasMorePosts && !loadPostsLoading) {
    //                 dispatch(postAction.loadPostsRequest());
    //             }
    //         }
    //     }
    //     window.addEventListener("scroll", onScroll);
    //     return () => {
    //         window.removeEventListener("scroll", onScroll);
    //     };
    // }, [hasMorePosts, loadPostsLoading]);

    const scrollListener = useCallback(
        (e) => {
            if (e.scrollTop + e.clientHeight > e.scrollHeight - 40) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch(postAction.loadPostsRequest());
                }
            }
        },
        [hasMorePosts, loadPostsLoading],
    );

    const rowRenderer = useCallback(
        ({ key, index, style, parent }) => {
            return (
                <CellMeasurer
                    key={key}
                    cache={cache}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                >
                    {({ measure, registerChild }) => (
                        <div ref={registerChild} style={style} onLoad={measure}>
                            <PostCard
                                // key={mainPosts[index].id}
                                post={mainPosts[index]}
                                setClickedCommentForm={setClickCommentForm}
                            />
                        </div>
                    )}
                </CellMeasurer>
            );
        },
        [
            mainPosts,
            clickCommentForm,
            addCommentLoading,
            addCommentDone,
            logInLoading,
            logoutLoading,
        ],
    );

    return (
        <div>
            <AppLayout>
                {me && <PostForm />}
                {/* This is one of the anti-patterns that using index into a key as props
			In most case, we must not pass index to a key
			especially, there is a possibility that post can be deleted.
			But if elements in iterator are not changed or deleted, can use index*/}
                {/*{mainPosts.map((post,index)=> <PostCard key={index} post={post} />}*/}

                {/*{mainPosts.map((post) => (*/}
                {/*    <PostCard key={post.id} post={post} />*/}
                {/*))}*/}
            </AppLayout>
            <ScrollSync>
                {({ onScroll, registerChild }) => (
                    <div
                        style={{
                            height: "91vh",
                            width: "99vw",
                            margin: "0 auto",
                        }}
                    >
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={cache.rowHeight}
                                    rowCount={mainPosts.length}
                                    deferredMeasurementCache={cache}
                                    overscanRowCount={3}
                                    onScroll={scrollListener}
                                    rowRenderer={rowRenderer}
                                />
                            )}
                        </AutoSizer>
                    </div>
                )}
            </ScrollSync>
        </div>
    );
};

export default Home;
