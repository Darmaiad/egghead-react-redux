import { combineReducers } from 'redux';

const createList = (filter) => {
    const ids = (state = [], action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_TODOS_SUCCESS':
                console.log(action);
                return action.response.map((todo) => todo.id);
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
