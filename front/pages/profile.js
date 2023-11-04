import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userAction } from "../reducers/user";

const Profile = () => {
    const { me } = useSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userAction.loadFollowersRequest());
        dispatch(userAction.loadFollowingsRequest());
    }, []);
    useEffect(() => {
        if (!me) router.push("/");
    }, [me]); // Run this effect whenever 'me' changes
    if (!me) {
        return null;
    }
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
