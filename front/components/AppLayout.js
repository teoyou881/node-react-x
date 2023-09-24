import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';

const AppLayout = ({ item }) => {
    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href='/'>
                        <a>X</a>{' '}
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href='/profile'>
                        <a>Profile</a>{' '}
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href='/signup'>
                        <a>Signup</a>{' '}
                    </Link>
                </Menu.Item>
                {item}
            </Menu>
        </div>
    );
};

AppLayout.propTypes = {
    item: PropTypes.node.isRequired,
};

export default AppLayout;
