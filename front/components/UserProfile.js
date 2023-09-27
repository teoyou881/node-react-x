import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import PropTypes from 'prop-types';

const UserProfile = ({setIsLoggedIn}) => {

const onSignOut = useCallback(()=>{
  setIsLoggedIn(false)
},[])

    return (
        <Card
            actions={[
                <div key={'twit'}>
                    <br />0
                </div>,
                <div key={'followings'}>
                    <br />0
                </div>,
                <div key={'followers'}>
                    <br />0
                </div>,
            ]}>
            <Card.Meta avatar={<Avatar>ZC</Avatar>} title='Teo' />
            <Button onClick={onSignOut}>Sign Out</Button>
        </Card>
    );
};

UserProfile.propTypes = {
  setIsLoggedIn: PropTypes.node.isRequired,
};

export default UserProfile;
