export const loadStorage = () => {
    // Wrap into try-catch block because localStorage can fail if
    // user privacy settings don't allow the use of localStorage
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) { // That means that the state key doesn't exist
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}; // We return undefined to let the reducers handle the state initialization

export const saveState = (state) => {
    // The state must be serializable for this to work, but this is the react recommendation
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Handle or lof the error or something
    }
};
