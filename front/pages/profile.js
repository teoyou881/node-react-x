import React, { useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userAction } from "../reducers/user";
import { CellMeasurer, CellMeasurerCache, List } from "react-virtualized";
import { Button } from "antd";

const Profile = () => {
    const { me, loadFollowersLoading } = useSelector((state) => state.user);
    const { Followers, Followings } = useSelector((state) => state.user?.me);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const sen = document.getElementById("sen");
        const rgi = document.getElementsByClassName(
            "ReactVirtualized__Grid__innerScrollContainer",
        );
        function onScroll() {
            console.log(
                sen.scrollTop, // how much user scrolled
                sen.clientHeight, // height of the screen
                sen.scrollHeight, // height of the whole page
            );
            if (sen.scrollTop + sen.clientHeight > sen.scrollHeight - 400) {
                dispatch(userAction.loadFollowersRequest());
            }
        }
        sen.addEventListener("scroll", onScroll);
        return () => {
            sen.removeEventListener("scroll", onScroll);
        };
    }, [loadFollowersLoading]);

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
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        // fixedHeight: true,
        // minHeight: 100,
        defaultHeight: 32,
        // keyMapper: (index) => index,
    });
    const moreFollowers = () => {
        if (Followers.length === 0) return;
        // const lastId = Followers[Followers.length - 1]?.id;
        // dispatch(userAction.loadFollowersRequest(lastId));
        dispatch(userAction.loadFollowersRequest());
    };
    const rowRenderer = useCallback(
        ({ key, index, style, parent }) => {
            return (
                <CellMeasurer
                    key={key}
                    cache={cache}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                >
                    {({ measure, registerChild }) => (
                        <div ref={registerChild} style={style} onLoad={measure}>
                            <div>{Followers[index].nickname}</div>
                        </div>
                    )}
                </CellMeasurer>
            );
        },
        [loadFollowersLoading, Followers],
    );
    function isRowLoaded({ index }) {
        return !!Followers[index];
    }
    const loadMoreRows = loadFollowersLoading ? () => {} : moreFollowers;
    const wfa = "-webkit-fill-available";
    const auto = "auto";
    return (
        <>
            <Head>
                <title>NodeX | Profile</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h2 style={{ width: "420px", margin: "0 auto" }}>
                            Followings
                        </h2>
                    </div>

                    <List
                        style={{
                            border: "1px solid #D7D7D7",
                            borderRadius: "10px",
                            margin: "1.25rem auto",
                            maxWidth: "420px",
                            padding: "5px 0",
                        }}
                        id="sen"
                        width={420}
                        height={300}
                        rowHeight={40}
                        rowCount={Followings.length}
                        rowRenderer={({ key, index, style, parent }) => {
                            const following = Followings[index];
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
                                        <span>{following.nickname}</span>
                                        <Button>remove</Button>
                                    </div>
                                </div>
                            );
                        }}
                    ></List>
                </div>
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h2 style={{ width: "420px", margin: "0 auto" }}>
                            Followers
                        </h2>
                    </div>
                    <List
                        style={{
                            border: "1px solid #D7D7D7",
                            borderRadius: "10px",
                            margin: "1.25rem auto",
                            maxWidth: "420px",
                            padding: "5px 0",
                        }}
                        id="sen"
                        width={420}
                        height={300}
                        rowHeight={40}
                        rowCount={Followers.length}
                        rowRenderer={({ key, index, style, parent }) => {
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
                                        <span>{follower.nickname}</span>
                                        <Button>remove</Button>
                                    </div>
                                </div>
                            );
                        }}
                    ></List>
                </div>
            </AppLayout>
        </>
    );
};

export default Profile;
