import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { userAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onSignOut = useCallback(() => {
    dispatch(userAction.logoutRequest());
  }, []);

  return (
    <div className="profileWrapper">
      <Card
        actions={[
          <div key="twit">
            <Link href={`/user/${me.id}`}>
              Posts
              <br />
              {me.Posts.length}
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              Followings
              <br />
              {me.Followings.length}
            </Link>
          </div>,
          <div key="followers">
            <Link href="/profile">
              Followers
              <br />
              {me.Followers.length}
            </Link>
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
        <Button
          onClick={onSignOut}
          loading={isLoggingOut}
          style={{
            left: '40px',
            top: '10px',
          }}
        >
          Sign Out
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
