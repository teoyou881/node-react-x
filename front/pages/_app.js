import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import wrapper from '../store/configureStore';

const NodeX = ({ Component }) => (
  <ConfigProvider>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <title>NodeX</title>
    </Head>
    <Component />
  </ConfigProvider>
);

NodeX.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(NodeX);
