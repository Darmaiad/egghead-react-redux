/* 
  The convention for such a reducer:
    The default export id the reducer itself
    Any named exports whose name begins with 'get' prepare data for viewing
      Usually such functions are called 'Selectors' (they select something from the current state)

    The 'state' argument inside a Reducer corresponds to the slice of the whole state that it manages
    This convention will be followed for its selectors
*/

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

export default todos;

// Changed the filter naming pattern from constants to the url params we use
// We make it a named export
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter((t) => t.completed);
    case 'active':
      return state.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};
