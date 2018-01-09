import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

/*
  Normalizing the state shape (treating the state as a DataBase):
    byId: A reducer that whenever it's called it will return a new copy of its mapping of Ids with actual todos
    allIds: A reducer that will return a copy of an array of all Ids, with the new Id added at the end
    idsByFilter: A reducer that will return a copy of an object that will have the ids that need to be displayed based on the filter's value
*/

/*
  The convention for such a reducer:
    The default export id is the reducer itself
    Any named exports whose name begins with 'get' prepare data for viewing
      Usually such functions are called 'Selectors' (they select something from the current state)

    The 'state' argument inside a Reducer corresponds to the slice of the whole state that it manages
    This convention will be followed for its selectors
*/

// Now that the list and byId reducer is in a separate file, we can consider their state structure opaque, 
// meaning we will use their respective selectors

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

// We still need to export a single reducer from the file, so we will combine the reducers
// We can use combineReducers as many times as we like at multiple hierarchy levels
const todos = combineReducers({ byId, listByFilter });

export default todos;

// We make it a named export, the same name as the 'reducer local' selector
export const getVisibleTodos = (state, filter) => {
  // We will not filter on the client any more because we will use the list of todos provided by the server

  // We get the ids from the listByFilter state lookup table
  const ids = fromList.getIds(state.listByFilter[filter]);
  // And we return a mapper function that uses the byId state lookup table to map the ids to actual todo objects
  return ids.map((id) => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) => fromList.getIsFetching(state.listByFilter[filter]);

// With the selectors pattern if we change the state of a reducer in the futere, we will not have to update the whole codebase
