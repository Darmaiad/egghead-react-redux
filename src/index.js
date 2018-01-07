import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Importing the function directly so that we don't end up with the whole lodash library in the bundle
import throttle from './lodash/throttle';
import reducer from './reducers';
import App from './components/App';
import { loadStorage, saveState } from './localStorage';

// In case we already have a state from a cookie or sessions
// Initial state should be passed to Reducers by the ES6 default method argument
// const persistedState = {
//   todos: [{
//     id: '0',
//     text: 'Welcome back',
//     completed: false,
//   }],
// };

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

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
