import { createContext, useState } from 'react';

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

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
