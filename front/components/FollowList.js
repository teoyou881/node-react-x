import { List, Button, Card } from "antd";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { userAction } from "../reducers/user";
import { createGlobalStyle } from "styled-components";

const FollowList = ({ header, data }) => {
    const dispatch = useDispatch();
    const onClick = (id) => () => {
        if (header === "Followings list") {
            dispatch(userAction.unfollowRequest(id));
        } else if (header === "Followers list") {
            dispatch(userAction.removeFollowerRequest(id));
        }
    };

    return (
        <List
            style={{ marginBottom: 20 }}
            // grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={
                <div
                    style={{
                        textAlign: "center",
                        margin: "10px 0",
                    }}
                >
                    <Button>More</Button>
                </div>
            }
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item key={item.id} style={{ padding: "0px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <span
                            style={{
                                marginLeft: "1.25rem",
                                lineHeight: "32px",
                                height: "32px",
                            }}
                        >
                            {item.nickname}
                        </span>
                        <Button style={{ marginRight: "1.25rem" }}>
                            delete
                        </Button>
                    </div>
                </List.Item>
            )}
        />
    );
};

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default FollowList;
