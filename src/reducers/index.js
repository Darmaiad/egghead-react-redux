import { combineReducers } from 'redux';
// We want to bring not only todos but also the selector, but we can't use the a named import
// because we have already the same in the scope. So we use the namespace import syntax
// that puts all the exports on an object, that we called 'fromTodos' here
import todos, * as fromTodos from './todos';
// We deleted visibilityFilter reducer. React routers handles that part of the state
// import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  todos, // ES6 object literal shorthand notation: 'todos: todos'
});

export default todoApp;

// We make it a named export with the same signature as the todos Reducer's selector
// but this time the state corresponds to the whole global state object
export const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter);
