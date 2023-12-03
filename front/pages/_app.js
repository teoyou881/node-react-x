import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
const NodeX = ({ Component }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <title>NodeX</title>
    </Head>
    <Component />
  </>
);

NodeX.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(NodeX);
