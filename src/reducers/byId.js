// It will change the value in the lookup table
const byId = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_TODOS_SUCCESS':
            const nextState = { ...state }; // Shallow copy, 1 level deep  
            action.response.forEach((todo) => {
                nextState[todo.id] = todo // While '=' is a mutation operator it does not modify the state
                // meaning that the reducer stays pure
            });
            return nextState;
        case 'ADD_TODO_SUCCESS':
            return {
                ...state,
                [action.response.id]: action.response,
            };
        default:
            return state;
    }
};

export default byId;

export const getTodo = (state, id) => state[id];
