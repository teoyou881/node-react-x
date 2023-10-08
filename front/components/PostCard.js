import React, { useCallback, useState } from "react";
import { Avatar, Button, Card, List, Popover } from "antd";
import { Comment } from "@ant-design/compatible";
import {
    RetweetOutlined,
    HeartOutlined,
    MessageOutlined,
    EllipsisOutlined,
    HeartTwoTone,
} from "@ant-design/icons";
import ButtonGroup from "antd/lib/button/button-group";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

const PostCard = ({ post }) => {
    const id = useSelector((state) => state.user.me?.id);
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        // make a new state based on previous state
        setLiked((prev) => !prev);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    return (
        <div style={{ marginBottom: 10 }}>
            {/*<Image>*/}
            {/*    <Content />*/}
            {/*    <Buttons></Buttons>*/}
            {/*</Image>*/}
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                // Key should be in jsx, when jsx is inside array.
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? (
                        <HeartTwoTone
                            twoToneColor="red"
                            key="heart"
                            onClick={onToggleLike}
                        />
                    ) : (
                        <HeartOutlined key="heart" onClick={onToggleLike} />
                    ),
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover
                        key="more"
                        content={
                            <ButtonGroup>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>Edit</Button>
                                        <Button type="danger">Delete</Button>
                                    </>
                                ) : (
                                    <Button>Report</Button>
                                )}
                            </ButtonGroup>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length} replies`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={
                                        <Avatar>{item.User.nickname[0]}</Avatar>
                                    }
                                    content={item.content}
                                ></Comment>
                            </li>
                        )}
                    />
                </div>
            )}
            {/*<CommentForm />*/}
            {/*<Comments />*/}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.shape({
            id: PropTypes.number,
            nickname: PropTypes.string,
        }),
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default PostCard;
