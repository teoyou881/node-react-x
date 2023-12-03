import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card, List, Popover } from 'antd';
import { Comment } from '@ant-design/compatible';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-modal';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { postAction } from '../reducers/post';
import FollowButton from './FollowButton';
import EditPostForm from './EditPostForm';

dayjs.locale('ca');
dayjs.extend(relativeTime);

Modal.setAppElement('#__next');

const PostCard = ({ post, single }) => {
  const dispatch = useDispatch();
  const { editPostDone } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const me = useSelector((state) => state.user.me);
  const liked = post.Likers.find((v) => v.id === id);
  const retweeted = me?.Posts.find((v) => v.RetweetId === post.id);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (editPostDone) {
      setModalIsOpen(false);
    }
  }, [editPostDone]);

  // click home btn to close modal
  useEffect(() => {
    const home = document.getElementById('home');
    const handleClick = () => {
      setModalIsOpen(false);
    };
    if (home) {
      home.addEventListener('click', handleClick);
    }
    return () => {
      if (home) {
        home.removeEventListener('click', handleClick);
      }
    };
  }, [post]);

  const onCancel = useCallback(() => {
    setModalIsOpen(false);
    dispatch(postAction.closeEditDiv());
  }, [post]);

  useEffect(() => {
    const userId = document.getElementsByClassName(post.createdAt)[0];
    const divId = document.getElementById(post.id);
    const userMouseOver = () => {
      userId.style.textDecoration = 'underline';
    };
    const userMouseOut = () => {
      userId.style.textDecoration = 'none';
    };
    const divMouseOver = () => {
      divId.style.cursor = 'pointer';
      // divId.style.textDecoration = 'none';
    };
    const divMouseOut = () => {
      divId.style.cursor = 'none';
    };
    const routerUserPosts = () => {
      router.push(`/user/${post.User.id}`);
    };
    userId.addEventListener('mouseover', userMouseOver);
    userId.addEventListener('mouseout', userMouseOut);
    userId.addEventListener('onclick', routerUserPosts);
    divId.addEventListener('mouseover', divMouseOver);
    divId.addEventListener('mouseout', divMouseOut);
    return () => {
      userId.removeEventListener('mouseover', userMouseOver);
      userId.removeEventListener('mouseout', userMouseOut);
      divId.addEventListener('mouseover', divMouseOver);
      divId.addEventListener('mouseout', divMouseOut);
    };
  }, [post]);

  const onClick = useCallback(
    (e) => {
      console.log('nodeName', e.target.nodeName);
      console.log('e.target.tagName', e.target.tagName);
      console.log('e.target.textContent', e.target.textContent);
      console.log('e.target.classList', e.target.classList);
      console.log('e.target.parentNode', e.target.parentNode);
      if (e.target.classList[0] !== 'ant-avatar-string' && e.target.classList[0] !== 'ant-avatar') {
        if (e.target.classList[0] === post.createdAt) {
          router.push(`/user/${post.User.id}`);
        } else if (e.target.tagName === 'A' && e.target.textContent.includes('#')) {
          console.log('seghsoghsog');
          router.push(`/hashtag/${e.target.textContent.slice(1)}`);
        } else if (
          e.target.nodeName !== 'svg' &&
          e.target.nodeName !== 'IMG' &&
          e.target.nodeName !== 'path' &&
          e.target.nodeName !== 'BUTTON' &&
          e.target.nodeName !== 'H1' &&
          !e.target.classList[0]?.includes('styles__ImageWrapper') &&
          !e.target.classList[0]?.includes('anticon') &&
          !e.target.classList[0]?.includes('ant-card-actions') &&
          e.target.tagName !== 'SPAN'
        ) {
          router.push(`/post/${post.id}`);
        }
      }
    },
    [post],
  );

  const onEditPost = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const isWithinDay = (date) => dayjs().diff(date, 'day') < 1;
  const onLike = useCallback(() => {
    if (!id) alert('Please login first.');
    if (id !== post.User.id) dispatch(postAction.likePostRequest(post.id));
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) alert('Please login first.');
    if (id !== post.User.id) dispatch(postAction.unlikePostRequest(post.id));
  }, [id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const onRemovePost = useCallback(() => {
    if (!id) alert('Please login first.');
    dispatch(postAction.removePostRequest(post.id));
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      alert('Please login first.');
    } else {
      dispatch(postAction.retweetRequest(post.id));
    }
  }, [id]);

  if (post.RetweetId) {
    return (
      <div
        id={post.id}
        style={{
          width: 'inherit',
          margin: 'inherit',
        }}
      >
        {modalIsOpen && (
          <Modal isOpen={modalIsOpen}>
            <EditPostForm post={post} initialText={post.content} onCancel={onCancel} />
          </Modal>
        )}
        <style>
          {`
          .hovered {
            text-decoration: underline;
            cursor: pointer;
          }
        `}
        </style>
        <Card
          onClick={onClick}
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
                      {!post.RetweetId && <Button onClick={onEditPost}>Edit</Button>}
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
          title={
            post.User.id !== id ? (
              <div>
                <span className={post.createdAt}>{`${post.User.nickname} retweeted`}</span>
                {isWithinDay(post.createdAt) ? (
                  <div
                    style={{
                      float: 'right',
                      fontWeight: 'normal',
                    }}
                  >
                    {dayjs(post.createdAt).fromNow()}
                  </div>
                ) : (
                  <div
                    style={{
                      float: 'right',
                      fontWeight: 'normal',
                    }}
                  >
                    {dayjs(post.createdAt).format('YYYY-MM-DD')}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span className={post.createdAt}>You retweeted</span>
                {isWithinDay(post.createdAt) ? (
                  <div
                    style={{
                      float: 'right',
                      fontWeight: 'normal',
                    }}
                  >
                    {dayjs(post.createdAt).fromNow()}
                  </div>
                ) : (
                  <div
                    style={{
                      float: 'right',
                      fontWeight: 'normal',
                    }}
                  >
                    {dayjs(post.createdAt).format('YYYY-MM-DD')}
                  </div>
                )}
              </div>
            )
          }
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
                title={
                  <div>
                    <span className={post.createdAt}>{post.Retweet.User.nickname}</span>
                  </div>
                }
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
              title={
                <div>
                  <span className={post.createdAt}>{post.User.nickname}</span>
                </div>
              }
              description={<PostCardContent postData={post.content} />}
            />
          )}
        </Card>
        {commentFormOpened && (
          <div>
            {id ? (
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
            ) : (
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
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      id={post.id}
      style={{
        width: 'inherit',
        margin: 'inherit',
      }}
    >
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen}>
          <EditPostForm post={post} initialText={post.content} onCancel={onCancel} />
        </Modal>
      )}
      <style>
        {`
          .hovered {
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      </style>
      <Card
        onClick={onClick}
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
                    {!post.RetweetId && <Button onClick={onEditPost}>Edit</Button>}
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
        title={null}
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
              title={
                <div>
                  <span className={post.createdAt}>{post.Retweet.User.nickname}</span>
                </div>
              }
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
            title={
              <div>
                <span className={post.createdAt}>{post.User.nickname}</span>
              </div>
            }
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <div>
          {id ? (
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
          ) : (
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
          )}
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
