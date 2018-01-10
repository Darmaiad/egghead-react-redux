// import { v4 } from 'uuid'; Id generation occurs now in the mock server
import * as api from './../api';
import { getIsFetching } from './../reducers';

// Deleted setVisibilityFilter action because the Router will handle it

// Async Thunk Action Creator
export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then((response)=>{
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response,
    });
  });

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

// Removed export because we will be using these two action creators inside the fetchMockTodos action
// const requestTodos = (filter) => ({
//   type: 'REQUEST_TODOS',
//   filter,
// });
// const receiveTodos = (filter, response) => ({
//   type: 'RECEIVE_TODOS',
//   filter,
//   response,
// });
// Since we use the above action in only one place we can remove them and dispatch an object literal in fetchTodos

// Asynchronous action creator
// We want an abstration that represents many actions dispatched over a period of time
// So, instead of a promise we will return a function (thunk). The function takes dispatch as an argument,
// meaning we can dispatch as many actions as we duting the async operation.
export const fetchTodos = (filter) => (dispatch, getState) => {
  // When we request data from the server, we do not know if we are already fetching data
  // and we may make many requests before the first one finishes, creating a possible race condition
  // If we know whether we are fetching before requesting new data, we can solve this
  if (getIsFetching(getState(), filter)) { // Get state belongs to the store object
    return Promise.resolve(); // Early exit from Thunk without dipatching any actions by returning a promise that resolves immediately
    // We could also write: return; but since we wrote Thunk to return a Promise, we might as well return one here
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then(
    (response) => { // We don't need to return a promise. But it is convinient convention
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response,
      });
    },
    (error) => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong',
      });
    }
    // Better to use this response/error approach, instead of .then.catch because catch will catch
    // and display errors in the reducers, not only in the promise
  );
};
