import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
    return (
        <>
            <Head>
                {' '}
                <title>NodeX | Profile</title>
            </Head>
            <AppLayout>
                <div>profile</div>
            </AppLayout>
        </>
    );
};

export default Profile;
