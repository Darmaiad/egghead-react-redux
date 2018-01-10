import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
// Importing the function directly so that we don't end up with the whole lodash library in the bundle
import reducer from './reducers';

// By default Redux demands that actions are plain objects
const addPromiseSupportToDispatch = (store) => {
    // We name the previous 'rawDispatch' as 'next' because this is the next dispatch function
    // after the previous middleware was applied (possibly was applied, it is not a given)
    return (next) => {
        // We don't know if any given action is a normal action or a async one
        return (action) => {
            // Recognize a promise:
            if (typeof action.then === 'function') {
                // If it is a promise, we wait for it to resolve to an action object and then we pass it to next
                return action.then(next);
            }
            // Otherwise we call next right away with the object we received
            return next(action);
        };
    };
};

// Standard middleware signature
const thunk = (store) => (next) => (action) => {
    // If the action is a function (thunk) instead of an object (which is the standard) it needs to be called, with dispatch as an arg
    typeof action === 'function' ?
        action(store.dispatch) :
        next(action); // If it is a regular action, we just pass it to the next middleware int the chain
};

const configureStore = () => {
    const middlewares = [];
    // middlewares.push(addPromiseSupportToDispatch);
    middlewares.push(thunk);
    middlewares.push(logger);

    const store = createStore(
        reducer,
        // persisted state goes here. Before the enhancer
        applyMiddleware(...middlewares) // Optional last argument, it is called an enhancer
    );

    return store;
};

// Exporting configureStore and not the store itself because if we later write
// any tests, we can write as many stores as we want
export default configureStore;
