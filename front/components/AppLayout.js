import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';

const AppLayout = ({ children }) => {
    const menuItems = [
        {
            key: 'home',
            icon: <Link href='/'>X</Link>,
            // label: 'enfkdn',
        },
        {
            key: 'profile',
            icon: <Link href='/profile'>Profile</Link>,
            // label: 'profile',
        },
        {
            key: 'signup',
            icon: <Link href='/signup'>Signup</Link>,
            // label: 'signup',
        },
    ];
    return (
        <div>
            <div>
                <Menu items={menuItems} mode='horizontal' />

                {/* <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href='/'>
                        X
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href='/profile'>
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href='/signup'>
                        Signup
                    </Link>
                </Menu.Item>
                {item}
            </Menu> */}
            </div>
            {children}
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
