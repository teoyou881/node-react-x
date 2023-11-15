// dynamic route
// should be named as [id].js
// surrounded by []
import { useRouter } from "next/router";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { userAction } from "../../reducers/user";
import { END } from "redux-saga";
import { postAction } from "../../reducers/post";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";

const Post = () => {
    const { singlePost, removeSinglePost } = useSelector((state) => state.post);
    const router = useRouter();
    // for dynamic route
    const { id } = router.query;

    // when user remove post, it will be redirected to home page
    useEffect(() => {
        if (removeSinglePost) {
            alert("No post exists.");
            router.push("/");
        }
    }, [removeSinglePost]);

    /*todo: make this page more beautiful*/
    return (
        <AppLayout>
            {/*No post exist? --> show div there is no post*/}
            {singlePost ? (
                <PostCard post={singlePost} />
            ) : (
                <div>The post the user is looking for doesn't exist.</div>
            )}
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, res, params, query, ...etc }) => {
            const cookie = req ? req.headers.cookie : "";
            axios.defaults.headers.Cookie = "";
            if (req && cookie) {
                axios.defaults.headers.Cookie = cookie;
            }
            store.dispatch(userAction.loadMyInfoRequest());
            // In getServerSideProps, we can access to params through store.params or store.query
            store.dispatch(postAction.loadPostRequest(params.id));
            store.dispatch(END);
            await store.sagaTask.toPromise();
        },
);

export default Post;
