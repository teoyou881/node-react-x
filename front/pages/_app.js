import React from 'react';
import { PropTypes } from 'prop-types';
import 'antd/dist/antd.css';

const App = ({ Component }) => {
    return <div>App</div>;
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};
export default App;
