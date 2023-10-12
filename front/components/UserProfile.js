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
                    <br />0
                </div>,
                <div key={"followings"}>
                    <br />0
                </div>,
                <div key={"followers"}>
                    <br />0
                </div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onSignOut} loading={isLoggingOut}>
                Sign Out
            </Button>
        </Card>
    );
};

export default UserProfile;
