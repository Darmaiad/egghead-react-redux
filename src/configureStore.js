import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
// Importing the function directly so that we don't end up with the whole lodash library in the bundle
import reducer from './reducers';

const configureStore = () => {
    const store = createStore(
        reducer,
        applyMiddleware(logger)
    );

    return store;
};

// Exporting configureStore and not the store itself because if we later write
// any tests, we can write as many stores as we want
export default configureStore;
