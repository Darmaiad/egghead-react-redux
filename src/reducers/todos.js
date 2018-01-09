import { combineReducers } from 'redux';

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

// It will change the value in the lookup table
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state }; // Shallow copy, 1 level deep  
      action.response.forEach((todo) => {
        nextState[todo.id] = todo // While '=' is a mutation operator it does not modify the state
        // meaning that the reducer stays pure
      });
      return nextState;
    default:
      return state;
  }
};

// A reducer that is an array of all Ids of the todos without any other fields
const allIds = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map((todo) => todo.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map((todo) => todo.id);
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if (action.filter !== 'active') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map((todo) => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
})

// We still need to export a single reducer from the file, so we will combine the reducers
// We can use combineReducers as many times as we like at multiple hierarchy levels
const todos = combineReducers({ byId, idsByFilter });

export default todos;

// We make it a named export
export const getVisibleTodos = (state, filter) => {
  // We will not filter on the client any more because we will use the list of todos provided by the server 

  // We get the ids from the idsByFilter state lookup table
  const ids = state.idsByFilter[filter];
  // And we return a mapper function that uses the byId state lookup table to map the ids to actual todo objects
  return ids.map((id) => state.byId[id]);
};
