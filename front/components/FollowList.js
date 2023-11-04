import { List, Button, Card } from "antd";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userAction } from "../reducers/user";
import { USER_ACTION } from "../actions/userAction";

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
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                    <Button>More</Button>
                </div>
            }
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{ marginTop: 20 }} key={item.id}>
                    <Card
                        actions={[
                            <StopOutlined
                                key="stop"
                                onClick={onClick(item.id)}
                            />,
                        ]}
                    >
                        <Card.Meta description={item.nickname}></Card.Meta>
                    </Card>
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
