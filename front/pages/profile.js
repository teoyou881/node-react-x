import React, { useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userAction } from "../reducers/user";
import { AutoSizer, List } from "react-virtualized";
import { Button, Empty } from "antd";
import wrapper from "../store/configureStore";
import axios from "axios";
import { postAction } from "../reducers/post";
import { END } from "redux-saga";

const Profile = () => {
    const {
        me,
        // how many followings or followers show on browser
        showFollowingIndex,
        showFollowerIndex,
    } = useSelector((state) => state.user);
    const Followers = me?.Followers;
    const Followings = me?.Followings;
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!me) router.push("/");
    }, [me]); // Run this effect whenever 'me' changes
    if (!me) {
        return null;
    }
    useEffect(() => {
        dispatch(userAction.loadFollowersRequest());
        dispatch(userAction.loadFollowingsRequest());
    }, []);

    const onDelete = useCallback((id, follow) => {
        if (follow === "following") dispatch(userAction.unfollowRequest(id));
        if (follow === "follower")
            dispatch(userAction.removeFollowerRequest(id));
    }, []);

    // useEffect for infinite scrolling
    useEffect(() => {
        const followings = document.getElementById("followings");
        function onScroll() {
            if (
                followings.scrollTop + followings.clientHeight >
                followings.scrollHeight - 300
            ) {
                if (showFollowingIndex < Followings.length) {
                    dispatch(
                        userAction.loadMoreFollowingsRequest(
                            showFollowingIndex,
                        ),
                    );
                }
            }
        }
        followings?.addEventListener("scroll", onScroll);
        return () => {
            followings?.removeEventListener("scroll", onScroll);
        };
    }, [showFollowingIndex]);
    useEffect(() => {
        const followers = document.getElementById("followers");
        function onScroll() {
            if (
                followers.scrollTop + followers.clientHeight >
                followers.scrollHeight - 300
            ) {
                if (showFollowerIndex < Followers.length) {
                    dispatch(
                        userAction.loadMoreFollowersRequest(showFollowerIndex),
                    );
                }
            }
        }
        followers?.addEventListener("scroll", onScroll);
        return () => {
            followers?.removeEventListener("scroll", onScroll);
        };
    }, [showFollowerIndex]);

    // functions for react-virtualized
    const followingsRowRenderer = useCallback(
        ({ key, index, style, parent }) => {
            const following = Followings[index];
            if (!following) return null;
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
                            {following.nickname}
                        </span>
                        <Button
                            onClick={() => onDelete(following.id, "following")}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            );
        },
        [Followings],
    );
    const followersRowRenderer = useCallback(
        ({ key, index, style, parent }) => {
            const follower = Followers[index];
            if (!follower) return null;
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
                        <Button
                            onClick={() => onDelete(follower.id, "follower")}
                        >
                            Following
                        </Button>
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
                <div style={{ marginTop: "50px" }}>
                    <div>
                        <div style={{ textAlign: "center" }}>
                            <h2 style={{ margin: "0 auto" }}>Followings</h2>
                        </div>
                        {showFollowingIndex > 0 ? (
                            <AutoSizer
                                style={{
                                    height: "160px",
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
                                        rowCount={showFollowingIndex}
                                        rowRenderer={followingsRowRenderer}
                                    />
                                )}
                            </AutoSizer>
                        ) : (
                            <div>
                                <Empty
                                    imageStyle={{
                                        height: "inherit",
                                        marginTop: "20px",
                                    }}
                                    description={
                                        <span
                                            style={{
                                                fontSize: "1.25rem",
                                                fontWeight: "400",
                                            }}
                                        >
                                            No Followings
                                        </span>
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div style={{ marginTop: "100px" }}>
                        <div style={{ textAlign: "center" }}>
                            <h2 style={{ margin: "0 auto" }}>Followers</h2>
                        </div>
                        {showFollowerIndex > 0 ? (
                            <AutoSizer
                                style={{
                                    height: "160px",
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
                                        rowCount={showFollowerIndex}
                                        rowRenderer={followersRowRenderer}
                                    />
                                )}
                            </AutoSizer>
                        ) : (
                            <div>
                                <Empty
                                    imageStyle={{
                                        height: "inherit",
                                        marginTop: "20px",
                                    }}
                                    description={
                                        <span
                                            style={{
                                                fontSize: "1.25rem",
                                                fontWeight: "400",
                                            }}
                                        >
                                            No Followers
                                        </span>
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, res, ...etc }) => {
            const cookie = req ? req.headers.cookie : "";
            axios.defaults.headers.Cookie = "";
            if (req && cookie) {
                axios.defaults.headers.Cookie = cookie;
            }
            store.dispatch(userAction.loadMyInfoRequest());
            store.dispatch(END);
            await store.sagaTask.toPromise();
        },
);

export default Profile;
