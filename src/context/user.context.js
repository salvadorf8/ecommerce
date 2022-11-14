import { createContext, useState, useEffect } from 'react';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// as the actual value you want to access (storage)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    // use useState to hold currentUser and its setter
    const [currentUser, setCurrentUser] = useState(null);

    // this is what we're passing into the provider
    const value = { currentUser, setCurrentUser };

    // making use of a listener when the auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
            console.log(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
