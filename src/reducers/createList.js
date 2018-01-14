import { combineReducers } from 'redux';

const createList = (filter) => {
    // The state here is the lookup table todo ids to todo objects
    const handleToggle = (state, action) => {
        // Assign the Id inside the result to the variable toggleId (the Id of the toggled todo)
        const { result: toggleId, entities } = action.response;
        // From the entities arr we grab the bool completed
        const { completed} = entities.todos[toggleId];
        // There are two cases that we need to recalculate the the state:
        const shouldRemove = (
            // If the todo is now completed and we want to show the active todos
            (completed && filter === 'active') ||
            // If the todo is now not completed and we want to show the completed todos
            (!completed && filter === 'completed')
        );

        return shouldRemove ?
            state.filter((id) => id !== toggleId) :
            // In the case we want to show all the todos, we simply return the state
            state;
    };

    const ids = (state = [], action) => {
        switch (action.type) {
            case 'FETCH_TODOS_SUCCESS':
                return filter === action.filter ?
                    action.response.result :
                    state;
            case 'ADD_TODO_SUCCESS':
                return filter !== 'completed' ?
                    [...state, action.response.result] :
                    state;
            case 'TOGGLE_TODO_SUCCESS':
                // Extracting the logic to a function
                return handleToggle(state, action);
            default:
                return state;
        }
    };

    const isFetching = (state = false, action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_TODOS_REQUEST':
                return true;
            case 'FETCH_TODOS_SUCCESS': // In both cases the loading indicator needs to be turned off
            case 'FETCH_TODOS_FAILURE':
                return false;
            default:
                return state;
        }
    };

    // A reducer cannot have 'undefined' as an initial state, so we must make tha absence explicit
    const errorMessage = (state = null, action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_TODOS_FAILURE':
                return action.message;
            case 'FETCH_TODOS_REQUEST': // In both cases we need to clear the error message
            case 'FETCH_TODOS_SUCCESS':
                return null;
            default:
                return state;
        }
    };

    return combineReducers({ ids, isFetching, errorMessage });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
