import { v4 } from 'uuid';
import { fetchTodos } from './../mockBackend';
import { getIsFetching } from './../reducers';

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
export const fetchMockTodos = (filter) => (dispatch, getState) => {
  // When we request data from the server, we do not know if we are already fetching data
  // and we may make many requests before the first one finishes, creating a possible race condition
  // If we know whether we are fetching before requesting new data, we can solve this
if (getIsFetching(getState(), filter)) { // Get state belongs to the store object
  return Promise.resolve(); // Early exit from Thunk without dipatching any actions by returning a promise that resolves immediately
  // We could also write: return; but since we wrote Thunk to return a Promise, we might as well return one here
}

  dispatch(requestTodos(filter));

  return fetchTodos(filter).then((response) => { // We don't need to return a promise. But it is convinient convention
    dispatch(receiveTodos(filter, response));
  });
};
