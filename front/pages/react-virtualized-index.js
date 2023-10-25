import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
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
    InfiniteLoader,
    List,
    ScrollSync,
    WindowScroller,
} from "react-virtualized";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const Home = () => {
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        // fixedHeight: true,
        // minHeight: 100,
        // defaultHeight: 500,
        // keyMapper: (index) => index,
    });

    const [clickCommentForm, setClickCommentForm] = useState();
    const { me, logInLoading, logoutLoading, logoutDone, logInDone } =
        useSelector((state) => state.user);
    const {
        mainPosts,
        hasMorePosts,
        loadPostsLoading,
        addCommentLoading,
        addPostLoading,
        followLoading,
        unfollowLoading,
    } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postAction.loadPostsRequest());
    }, []);
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

    const scrollListener = useCallback((e) => {
        console.log(e.scrollTop, e.clientHeight, e.scrollHeight);
        if (e.scrollTop + e.clientHeight > e.scrollHeight - 100) {
            if (hasMorePosts && !loadPostsLoading) {
                dispatch(postAction.loadPostsRequest());
            }
        }
    }, []);

    // const morePosts = (scrollTop) => {
    //     if (hasMorePosts) {
    //         console.log(scrollTop);
    //         cache.clearAll();
    //         dispatch(postAction.loadPostsRequest());
    //     }
    // };

    const morePosts = useCallback(() => {
        dispatch(postAction.loadPostsRequest());
    }, []);

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
                            <div // for PostForm
                                style={{
                                    margin: "0 auto",
                                    width: 600,
                                }}
                            >
                                {index == 0 && me ? <PostForm /> : null}
                            </div>
                            <PostCard
                                post={mainPosts[index]}
                                setClickedCommentForm={setClickCommentForm}
                            />
                        </div>
                    )}
                </CellMeasurer>
            );
        },
        [
            addPostLoading,
            clickCommentForm,
            addCommentLoading,
            logInLoading,
            logoutLoading,
            followLoading,
            unfollowLoading,
            loadPostsLoading,
        ],
    );

    function isRowLoaded({ index }) {
        return !!mainPosts[index];
    }
    const loadMoreRows = loadPostsLoading ? () => {} : morePosts;

    return (
        <div>
            <AppLayout>
                {/*
                {me && <PostForm />}
                --> this is in List form react-virtualized
                */}
                {/* This is one of the anti-patterns that using index into a key as props
			In most case, we must not pass index to a key
			especially, there is a possibility that post can be deleted.
			But if elements in iterator are not changed or deleted, can use index*/}
                {/*{mainPosts.map((post,index)=> <PostCard key={index} post={post} />}*/}

                {/*{mainPosts.map((post) => (*/}
                {/*    <PostCard key={post.id} post={post} />*/}
                {/*))}*/}
            </AppLayout>
            {/*<ScrollSync>*/}
            {/*{({ onScroll, registerChild }) => (*/}

            <div className="mainpostsWrapper">
                <AutoSizer disableHeight={true}>
                    {({ width }) => (
                        <WindowScroller>
                            {({
                                height,
                                isScrolling,
                                onChildScroll,
                                scrollTop,
                            }) => (
                                <InfiniteLoader
                                    loadMoreRows={loadMoreRows}
                                    isRowLoaded={isRowLoaded}
                                    rowCount={1000}
                                >
                                    {({ onRowsRendered, registerChild }) => (
                                        <List
                                            className="mainpostsList"
                                            autoHeight
                                            height={height}
                                            isScrolling={isScrolling}
                                            onScroll={onChildScroll}
                                            rowCount={mainPosts.length}
                                            rowHeight={cache.rowHeight}
                                            // rowHeight={cache.defaultHeight}
                                            deferredMeasurementCache={cache}
                                            rowRenderer={rowRenderer}
                                            scrollTop={scrollTop}
                                            width={width}
                                            ref={registerChild}
                                            onRowsRendered={onRowsRendered}
                                            overscanRowCount={8}
                                        />
                                    )}
                                </InfiniteLoader>
                            )}
                        </WindowScroller>
                    )}
                </AutoSizer>
            </div>

            {/*<div*/}
            {/*    style={{*/}
            {/*        height: "92vh",*/}
            {/*        width: "99vw",*/}
            {/*        // margin: "0 auto",*/}
            {/*        marginBottom: "10px",*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <AutoSizer>*/}
            {/*        {({ width, height }) => (*/}
            {/*            <List*/}
            {/*                autoHeight*/}
            {/*                width={width}*/}
            {/*                height={height}*/}
            {/*                rowHeight={cache.rowHeight}*/}
            {/*                rowCount={mainPosts.length}*/}
            {/*                deferredMeasurementCache={cache}*/}
            {/*                overscanRowCount={5}*/}
            {/*                onScroll={scrollListener}*/}
            {/*                rowRenderer={rowRenderer}*/}
            {/*                initialScrollTop={0}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </AutoSizer>*/}
            {/*</div>*/}
            {/*     )}*/}
            {/* </ScrollSync>*/}
        </div>
    );
};

export default Home;
