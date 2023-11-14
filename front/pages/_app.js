import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import wrapper from "../store/configureStore";

const NodeX = ({ Component, pageProps }) => (
    <>
        <Head>
            <meta charSet="utf-8" />
            <title>NodeX</title>
        </Head>
        <Component {...pageProps} />
    </>
);

NodeX.propTypes = {
    Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(NodeX);
