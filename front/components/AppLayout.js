import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Link href='/'>
                <a>X</a>{' '}
            </Link>
            <Link href='/profile'>
                <a>Profile</a>{' '}
            </Link>
            <Link href='/signup'>
                <a>Signup</a>{' '}
            </Link>
            <div>Common Menu</div>
            {children}
        </div>
    );
};

AppLayout.propTypes = {
    childred: PropTypes.node.isRequired,
};

export default AppLayout;
