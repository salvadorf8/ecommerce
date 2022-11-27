import { createContext, useEffect, useReducer } from 'react';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

// as the actual value you want to access (storage)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

/**
 * below is making use of useReducer
 */
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            throw new Error(`unhandled type ${type}`);
    }
};

const INITIAL_STATE = {
    currentUser: null
};
/**
 * end useReducer
 */

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);

    /**
     * below is making use of useReducer
     */
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
        // dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    };
    /**
     * end useReducer
     */

    const value = { currentUser, setCurrentUser };

    // making use of a listener when the auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
