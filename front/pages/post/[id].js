// dynamic route
// should be named as [id].js
// surrounded by []
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import wrapper from '../../store/configureStore';
import { userAction } from '../../reducers/user';
import { postAction } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const { singlePost, removeSinglePost } = useSelector((state) => state.post);
  const router = useRouter();
  // for dynamic route
  const { id } = router.query;

  // when user remove post, it will be redirected to home page
  useEffect(() => {
    if (removeSinglePost) {
      alert('No post exists.');
      router.push('/');
    }
  }, [removeSinglePost]);

  /*
  todo: make this page more beautiful
   */

  return (
    <AppLayout>
      {!singlePost ? (
        <div>The post the user is looking for does not exist.</div>
      ) : (
        <>
          <Head>
            {' '}
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <title>NodeX | {singlePost.User.nickname}'s post</title>
            <meta name="description" content={singlePost.content} />
            <meta property="og:title" content={`${singlePost.User.nickname}'s post`} />
            <meta property="og:description" content={singlePost.content} />
            <meta
              property="og:image"
              content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodex.com/favicon.ico'}
            />
            <meta property="og:url" content={`https://nodex.com/post/${id}`} />
          </Head>
          <PostCard post={singlePost} single />
        </>
      )}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch(userAction.loadMyInfoRequest());
  // In getServerSideProps, we can access to params through store.params or store.query
  store.dispatch(postAction.loadPostRequest(params.id));
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;
