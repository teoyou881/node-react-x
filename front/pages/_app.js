import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import { createGlobalStyle } from 'styled-components';
import wrapper from '../store/configureStore';

const ModalGlobal = createGlobalStyle`
  .ReactModal__Content{
    top:60px !important;
    border-width: 2px !important;
  }
`;

const NodeX = ({ Component }) => (
  <ConfigProvider>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <title>NodeX</title>
    </Head>
    <ModalGlobal />
    <Component />
  </ConfigProvider>
);

NodeX.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(NodeX);
