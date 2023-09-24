import React from 'react';
import { PropTypes } from 'prop-types';
import Head from 'next/head';

const App = ({ Component }) => {
    return (
        <>
            <Head>
                {' '}
                <title>NodeX</title>
            </Head>
            <div>common menu</div>
            <Component />
        </>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};
export default App;
