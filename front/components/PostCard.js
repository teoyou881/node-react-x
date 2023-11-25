import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, List, Popover } from 'antd';
import { Comment } from '@ant-design/compatible';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { postAction } from '../reducers/post';
import FollowButton from './FollowButton';

dayjs.locale('ca');
dayjs.extend(relativeTime);

const PostCard = ({ post, single }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const me = useSelector((state) => state.user.me);
  const liked = post.Likers.find((v) => v.id === id);
  const retweeted = me?.Posts.find((v) => v.RetweetId === post.id);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const isWithinDay = (date) => dayjs().diff(date, 'day') < 1;

  // todo: when not logged in and click btn, alert twice.
  const onLike = useCallback(() => {
    if (!id) alert('Please login first.');
    if (id !== post.User.id) dispatch(postAction.likePostRequest(post.id));
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) alert('Please login first.');
    if (id !== post.User.id) dispatch(postAction.unlikePostRequest(post.id));
  }, [id]);
  const onToggleComment = useCallback(() => {
    if (!id) alert('Please login first.');
    setCommentFormOpened((prev) => !prev);
  }, [id]);
  const onRemovePost = useCallback(() => {
    if (!id) alert('Please login first.');
    dispatch(postAction.removePostRequest(post.id));
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) alert('Please login first.');
    dispatch(postAction.retweetRequest(post.id));
  }, [id]);

  return (
    <div id={post.id} style={{ width: 'inherit', margin: 'inherit' }}>
      <Card
        // extra={id && <FollowButton post={post} />}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        // Key should be in jsx, when jsx is inside array.
        actions={[
          retweeted ? (
            <RetweetOutlined style={{ color: 'blue' }} key="retweet" onClick={onRetweet} />
          ) : (
            <RetweetOutlined key="retweet" onClick={onRetweet} />
          ),

          liked ? (
            <HeartTwoTone twoToneColor="red" key="heart" onClick={onUnlike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
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
        title={post.RetweetId && post.User.id !== id ? `${post.User.nickname} retweeted` : null}
        extra={id && id !== post.User.id && <FollowButton post={post} />}
      >
        {isWithinDay(post.createdAt) ? (
          <div style={{ float: 'right' }}>{dayjs(post.createdAt).fromNow()}</div>
        ) : (
          <div style={{ float: 'right' }}>{dayjs(post.createdAt).format('YYYY-MM-DD')}</div>
        )}
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            {isWithinDay(post.createdAt) ? (
              <div style={{ float: 'right' }}>{dayjs(post.Retweet.createdAt).fromNow()}</div>
            ) : (
              <div style={{ float: 'right' }}>{dayjs(post.Retweet.createdAt).format('YYYY-MM-DD')}</div>
            )}

            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link href={`/user/${post.User.id}`}>
                <Avatar>{post.User.nickname[0]}</Avatar>{' '}
              </Link>
            }
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {id && commentFormOpened && (
        <div>
          <CommentForm post={post} single={single} />
          <List
            header={`${post.Comments.length} replies`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
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
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }),
  single: PropTypes.bool,
};

export default PostCard;
