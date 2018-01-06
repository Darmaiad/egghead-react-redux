import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  todos, // ES6 object literal shorthand notation: 'todos: todos'
  visibilityFilter,
});

export default todoApp;
