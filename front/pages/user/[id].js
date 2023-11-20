import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { postAction } from '../../reducers/post';
import axios from 'axios';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import { userAction } from '../../reducers/user';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector((state) => state.post);
  const { loadUser, me } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading) {
          //get posts by userId
          const lastId = mainPosts[mainPosts?.length - 1]?.id;
          dispatch(postAction.loadUserPostsRequest({ lastId, userId: id }));
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts?.length, hasMorePosts, id, loadPostLoading]);

  if (!loadUser) {
    return (
      <AppLayout>
        <div>{id} user does not exist.</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {loadUser && (
        <Head>
          <title>NodeX | {loadUser.nickname}'s posts</title>
          <meta name="description" content={`${loadUser.nickname}'s posts`} />
          <meta property="og:title" content={`${loadUser.nickname}'s posts`} />
          <meta property="og:description" content={`${loadUser.nickname}'s posts`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {loadUser && loadUser.id !== me?.id ? (
        <Card
          style={{ marginBottom: 20 }}
          actions={[
            <div key="twit">
              Posts
              <br />
              {loadUser.Posts.length}
            </div>,
            <div key="following">
              Followings
              <br />
              {loadUser.Followings.length}
            </div>,
            <div key="follower">
              Followers
              <br />
              {loadUser.Followers.length}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{loadUser.nickname[0]}</Avatar>} title={loadUser.nickname} />
        </Card>
      ) : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, params, ...etc }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const numericRegex = /^\d+$/;
  if (numericRegex.test(params.id)) {
    store.dispatch(userAction.loadMyInfoRequest());
    store.dispatch(userAction.loadUserRequest(params.id));
    store.dispatch(
      postAction.loadUserPostsRequest({
        userId: params.id,
      }),
    );
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
});
export default User;
