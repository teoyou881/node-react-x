import React from "react";
import Head from "next/head";
import wrapper from "../store/configureStore";
import { Provider } from "react-redux";

const App = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
    return (
        <Provider store={store}>
            <Head>
                {" "}
                <title>NodeX</title>
            </Head>
            <div>common menu</div>
            <Component {...pageProps} />
        </Provider>
    );
};
export default App;
