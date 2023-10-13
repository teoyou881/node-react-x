import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

const Profile = () => {
    const { me } = useSelector((state) => state.user);

    return (
        <>
            <Head>
                <title>NodeX | Profile</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="Followings list" data={me.Followings} />
                <FollowList header="Followers list" data={me.Followers} />
            </AppLayout>
        </>
    );
};

export default Profile;
