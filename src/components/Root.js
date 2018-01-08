import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
{/* Router should be inside the Provider component so that every component rednered by the router will have a the store as a prop  */}
        <BrowserRouter>
            <Route path='/:filter?' component={App} />
        </BrowserRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
