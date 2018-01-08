import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
// Importing the function directly so that we don't end up with the whole lodash library in the bundle
import throttle from 'lodash/throttle';
import { loadStorage, saveState } from './localStorage';
import reducer from './reducers';

const configureStore = () => {
    const persistedState = loadStorage();

    const store = createStore(
        reducer,
        persistedState,
        applyMiddleware(logger)
    );

    // We do not want to persist the filter type so that when we
    // refresh the page it defaults to 'All'
    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos,
        });
    }));

    return store;
};

// Exporting configureStore and not the store itself because if we later write
// any tests, we can write as many stores as we want
export default configureStore;
