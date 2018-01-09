import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
import { fetchTodos } from './mockBackend';

// In case we already have a state from a cookie or sessions
// Initial state should be passed to Reducers by the ES6 default method argument
// const persistedState = {
//   todos: [{
//     id: '0',
//     text: 'Welcome back',
//     completed: false,
//   }],
// };

fetchTodos('all').then((todos) => {
  console.log(todos);
});

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);
