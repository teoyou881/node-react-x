import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userAction } from "../reducers/user";
import {
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
    InfiniteLoader,
    List,
} from "react-virtualized";
import { Button } from "antd";

const Profile = () => {
    const {
        me,
        loadFollowingsLoading,
        loadFollowersLoading,
        followingLastIndex,
        followerLastIndex,
        loadMoreFollowingsLoading,
        loadMoreFollowersLoading,
        showFollowings,
        showFollowers,
    } = useSelector((state) => state.user);
    const { Followers, Followings } = useSelector((state) => state.user?.me);
    const router = useRouter();
    const dispatch = useDispatch();

    const [followingUsers, setFollowingUsers] = useState(
        Followings.slice(0, 10),
    );
    const [followerUsers, setFollowerUsers] = useState(Followers.slice(0, 10));
    useEffect(() => {
        dispatch(userAction.loadFollowersRequest());
        dispatch(userAction.loadFollowingsRequest());
    }, []);

    useEffect(() => {
        const followings = document.getElementById("followings");
        function onScroll() {
            if (
                followings.scrollTop + followings.clientHeight >
                followings.scrollHeight - 50
            ) {
                dispatch(
                    userAction.loadMoreFollowingsRequest(followingLastIndex),
                );
            }
        }
        followings.addEventListener("scroll", onScroll);
        return () => {
            followings.removeEventListener("scroll", onScroll);
        };
    }, [loadMoreFollowingsLoading, followingLastIndex]);

    useEffect(() => {
        const followers = document.getElementById("followers");
        function onScroll() {
            if (
                followers.scrollTop + followers.clientHeight >
                followers.scrollHeight - 400
            ) {
                dispatch(userAction.loadFollowersRequest());
            }
        }
        followers.addEventListener("scroll", onScroll);
        return () => {
            followers.removeEventListener("scroll", onScroll);
        };
    }, [loadFollowersLoading, Followers]);

    useEffect(() => {
        if (!me) router.push("/");
    }, [me]); // Run this effect whenever 'me' changes
    if (!me) {
        return null;
    }
    // const cache = new CellMeasurerCache({
    //     fixedWidth: true,
    //     // fixedHeight: true,
    //     // minHeight: 100,
    //     defaultHeight: 32,
    //     // keyMapper: (index) => index,
    // });

    const followingsRowRenderer = useCallback(
        ({ key, index, style, parent }) => {
            const following = Followings[index];
            console.log(following);
            return (
                <div key={key} style={style}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 20px",
                            margin: "0.2rem 0",
                        }}
                    >
                        <span
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            {following?.nickname}
                        </span>
                        <Button>remove</Button>
                    </div>
                </div>
            );
        },
        [],
    );

    const followersRowRenderer = useCallback(
        ({ key, index, style, parent }) => {
            const follower = Followers[index];
            return (
                <div key={key} style={style}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 20px",
                            margin: "0.2rem 0",
                        }}
                    >
                        <span
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            {follower.nickname}
                        </span>
                        <Button>remove</Button>
                    </div>
                </div>
            );
        },
        [Followers],
    );

    return (
        <>
            <Head>
                <title>NodeX | Profile</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h2 style={{ margin: "0 auto" }}>Followings</h2>
                    </div>

                    <AutoSizer
                        style={{
                            height: "160px",
                            marginBottom: "70px",
                            width: "auto",
                        }}
                    >
                        {({ width, height }) => (
                            <List
                                style={{
                                    border: "1px solid #D7D7D7",
                                    borderRadius: "10px",
                                    margin: "1.25rem auto",
                                    maxWidth: "420px",
                                    padding: "5px 0",
                                }}
                                id="followings"
                                width={width}
                                height={height}
                                rowHeight={40}
                                rowCount={showFollowings.length}
                                rowRenderer={followingsRowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h2 style={{ margin: "0 auto" }}>Followers</h2>
                    </div>

                    <AutoSizer
                        style={{
                            height: "250px",
                            marginBottom: "70px",
                            width: "auto",
                        }}
                    >
                        {({ width, height }) => (
                            <List
                                style={{
                                    border: "1px solid #D7D7D7",
                                    borderRadius: "10px",
                                    margin: "1.25rem auto",
                                    maxWidth: "420px",
                                    padding: "5px 0",
                                }}
                                id="followers"
                                width={width}
                                height={height}
                                rowHeight={40}
                                rowCount={Followers.length}
                                rowRenderer={followersRowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            </AppLayout>
        </>
    );
};

export default Profile;
