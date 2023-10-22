import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../reducers/user";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { me, isLoggingOut } = useSelector((state) => state.user);

    const onSignOut = useCallback(() => {
        dispatch(userAction.logoutRequest());
    }, []);

    return (
        <Card
            actions={[
                <div key={"twit"}>
                    Posts
                    <br />
                    {me.Posts.length}
                </div>,
                <div key={"followings"}>
                    Followings
                    <br />
                    {me.Followings.length}
                </div>,
                <div key={"followers"}>
                    Followers
                    <br />
                    {me.Followers.length}
                </div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button
                onClick={onSignOut}
                loading={isLoggingOut}
                style={{ left: "40px", top: "10px" }}
            >
                Sign Out
            </Button>
        </Card>
    );
};

export default UserProfile;
