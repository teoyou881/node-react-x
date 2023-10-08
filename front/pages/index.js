import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const mainPosts = useSelector((state) => state.post.mainPosts);
    return (
        <AppLayout>
            {isLoggedIn && <PostForm />}
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
