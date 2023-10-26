import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Button, Card, List, Popover } from "antd";
import { Comment } from "@ant-design/compatible";
import {
    RetweetOutlined,
    HeartOutlined,
    MessageOutlined,
    EllipsisOutlined,
    HeartTwoTone,
    PlusCircleTwoTone,
} from "@ant-design/icons";
import ButtonGroup from "antd/lib/button/button-group";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import { postAction } from "../reducers/post";
import FollowButton from "./FollowButton";

const PostCard = ({ post, index }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { virtualized, loadPostsLoading } = useSelector(
        (state) => state.post,
    );
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        // make a new state based on previous state
        setLiked((prev) => !prev);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    const onRemovePost = useCallback(() => {
        dispatch(postAction.removePostRequest(post.id));
    }, []);

    const postcardRef = useRef();
    /* For virtual scroll..
    // useEffect(() => {
    //     if (postcardRef.current) {
    //         // Ensure postcardRef.current is not null
    //         const height = postcardRef.current.clientHeight;
    //         let data = { index, height, postId: post.id };
    //         dispatch(postAction.firstVirtualized(data));
    //     }
    // }, []);

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (postcardRef.current) {
    //             // Ensure postcardRef.current is not null
    //             const height = postcardRef.current.clientHeight;
    //             let data = { index, height, postId: post.id };
    //             dispatch(postAction.changeVirtualized(data));
    //         }
    //     };
    //     window.addEventListener("resize", handleResize);
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []); // Empty dependency array means this effect runs once after the initial render

     */

    return (
        <div
            id={post.id}
            style={{ width: "inherit", margin: "inherit" }}
            ref={postcardRef}
        >
            <Card
                // extra={id && <FollowButton post={post} />}
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
                                        <Button
                                            // type="danger"
                                            onClick={onRemovePost}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                ) : (
                                    <Button>Report</Button>
                                )}
                            </ButtonGroup>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,

                    // <FollowButton post={post} />,
                ]}
                extra={
                    id && id !== post.User.id && <FollowButton post={post} />
                }
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
