import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
// Importing the function directly so that we don't end up with the whole lodash library in the bundle
import reducer from './reducers';

// By default Reduc demands that action are plain objects
const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    // We don't know if any given action is a normal action or a async one
    return (action) => {
        // Recognize a promise:
        if (typeof action.then === 'function') {
            // If it is a promise, we wait for it to resolve to an action object and then we pass it to rawDispatch
            return action.then(rawDispatch);
        }
        // Otherwise we call rawDispatch right away with the object we received
        return rawDispatch(action);
    };
};

const configureStore = () => {
    const store = createStore(
        reducer,
        applyMiddleware(logger)
    );

    store.dispatch = addPromiseSupportToDispatch(store);

    return store;
};

// Exporting configureStore and not the store itself because if we later write
// any tests, we can write as many stores as we want
export default configureStore;
