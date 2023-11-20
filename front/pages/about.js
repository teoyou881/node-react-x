import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { userAction } from '../reducers/user';
import wrapper from '../store/configureStore';

const About = () => {
  const { loadUser } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>Teo | NodeX</title>
      </Head>

      {loadUser ? (
        <div>
          <div>{loadUser.nickname} Profile</div>
          <div>{`email: ${loadUser.email}`}</div>
          <div>{`nickname: ${loadUser.nickname}`}</div>
          <div>{`${loadUser.Posts.length} posts`}</div>
          <div>{`${loadUser.Followings.length} followings`}</div>
          <div>{`${loadUser.Followers.length} followers`}</div>
        </div>
      ) : null}
    </AppLayout>
  );
};
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(userAction.loadUserRequest(1));
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
export default About;
