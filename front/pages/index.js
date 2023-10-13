import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { postAction } from "../reducers/post";
import { userAction } from "../reducers/user";

const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postAction.loadPostsRequest());
    }, []);
    useEffect(() => {
        function onScroll() {
            console.log(
                window.scrollY,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
            );
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 400
            ) {
                console.log("hasMorePosts", hasMorePosts);
                if (hasMorePosts) {
                    dispatch(postAction.loadPostsRequest());
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMorePosts]);

    return (
        <AppLayout>
            {me && <PostForm />}
            {/* this is one of the anti-pattern that using index into key as props
			In most case, we must not pass index to key
			especially, there is a possibility that post can be deleted.
			But, if elements in iterator are not changed or deleted, can use index*/}
            {/*{mainPosts.map((post,index)=> <PostCard key={index} post={post} />}*/}
            {mainPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </AppLayout>
    );
};

export default Home;
