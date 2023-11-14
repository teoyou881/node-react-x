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

    // useEffect(() => {
    //     dispatch(userAction.loadMyInfoRequest());
    //     if (!firstAccess) {
    //         dispatch(postAction.loadPostsRequest());
    //     }
    // }, []);

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

// When you look at redux devs, we can see posts in mainPosts, but there is no data in me in user.
// This under code is being run on server side, not on browser.
// So, we already set cookie on browser and backend though, we have to set cookie o front side.
export const getServerSideProps = wrapper.getServerSideProps(
    //https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
    // search ' Using getServerSideProps or getStaticProps'
    (store) =>
        async ({ req, res, ...etc }) => {
            // set header cookie on front side
            const cookie = req ? req.headers.cookie : "";
            axios.defaults.headers.Cookie = "";
            // should have this if state.
            // To prevent from sharing cookie with other users.
            // Like under code, error and bug can occur.
            // axios.defaults.headers.Cookie = req ? req.headers.cookie : "";
            if (req && cookie) {
                axios.defaults.headers.Cookie = cookie;
            }

            store.dispatch(userAction.loadMyInfoRequest());
            store.dispatch(postAction.loadPostsRequest());
            // Wait until the above dispatches are finished.
            // Without this code, just dispatching actions and then rendering, not waiting the results from dispatch.
            store.dispatch(END);
            await store.sagaTask.toPromise();
        },
);

export default Home;
