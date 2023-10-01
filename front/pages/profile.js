import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
    const followerList = [{ nickname: 'whoru' }, { nickname: 'whora' }, { nickname: 'whord' }];
    const followingList = [{ nickname: 'f2' }, { nickname: 'gh21' }, { nickname: 'g2gwg' }];

    return (
        <>
            <Head>
                <title>NodeX | Profile</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header='following list' data={followingList} />
                <FollowList header='follower list' data={followerList} />
            </AppLayout>
        </>
    );
};

export default Profile;
