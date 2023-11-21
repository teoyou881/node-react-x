import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const NodeX = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <title>NodeX</title>
    </Head>
    <Component {...pageProps} />
  </>
);

NodeX.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default wrapper.withRedux(NodeX);
