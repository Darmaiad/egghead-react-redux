import { combineReducers } from 'redux';
import todos from './todos';
// We deleted that reducer. React routers handles that part of the state
// import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  todos, // ES6 object literal shorthand notation: 'todos: todos'
});

export default todoApp;
