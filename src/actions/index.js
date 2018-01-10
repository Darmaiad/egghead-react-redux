import { v4 } from 'uuid';
import { fetchTodos } from './../mockBackend';

// Deleted setVisibilityFilter action because the Router will handle it

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

// Removed export because we will be using these two action creators inside the fetchMockTodos action
const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter,
});
const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

// Asynchronous action creator
// We want an abstration that represents many actions dispatched over a period of time
// So, instead of a promise we will return a function (thunk). The function takes dispatch as an argument,
// meaning we can dispatch as many actions as we duting the async operation.
export const fetchMockTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return fetchTodos(filter).then((response) => {
    dispatch(receiveTodos(filter, response));
  });
};
