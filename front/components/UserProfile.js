import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { userAction } from "../reducers/user";

const UserProfile = () => {
    const dispatch = useDispatch();

    const onSignOut = useCallback(() => {
        dispatch(userAction.logout());
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
            <Card.Meta avatar={<Avatar>ZC</Avatar>} title="Teo" />
            <Button onClick={onSignOut}>Sign Out</Button>
        </Card>
    );
};

export default UserProfile;
