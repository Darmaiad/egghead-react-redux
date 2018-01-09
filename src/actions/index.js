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

// Removed export because we will be using the fetchMockTodos action
const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  response,
  filter,
});

// Asynchronous action creator
export const fetchMockTodos = (filter) => fetchTodos(filter).then((response) =>
  receiveTodos(filter, response)
);
