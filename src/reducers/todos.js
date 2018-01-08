import { combineReducers } from 'redux';
// todo is a reducer that handles the updates in a single todo item
import todo from './todo';

/*
  Normalizing the state shape (treating the state as a DataBase):
    byId: A reducer that whenever it's called it will return a new copy of its mapping of Ids with actual todos
    allIds: A reducer that will return a copy of an array of all Ids, with the new Id added at the end
*/

/*
  The convention for such a reducer:
    The default export id is the reducer itself
    Any named exports whose name begins with 'get' prepare data for viewing
      Usually such functions are called 'Selectors' (they select something from the current state)

    The 'state' argument inside a Reducer corresponds to the slice of the whole state that it manages
    This convention will be followed for its selectors
*/

// It will change the value in the lookup table
const byId = (state = {}, action) => {
  switch (action.type) {
    // Both ADD_TODO and TOGGLE_TODO logic is going to be the same
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        // ES6 Computed property syntax
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

// A reducer that is an array of all Ids of the todos without any other fields
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

// We still need to export a single reducer from the file, so we will combine the reducers
// We can use combineReducers as many times as we like at multiple hierarchy levels
const todos = combineReducers({ byId, allIds });

export default todos;

// Since we do not have the array of todos any more to pass to the getVisibleTodos Selector,
// we will write a private (we are not going to export it) Selector, to return them to us
const getAllTodos = (state) => state.allIds.map((id) => state.byId[id]);

// We make it a named export
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all': // Changed the filter naming pattern from constants to the url params we use
      return allTodos;
    case 'completed':
      return allTodos.filter((t) => t.completed);
    case 'active':
      return allTodos.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};
