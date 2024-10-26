import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(); // Create the context

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (data) => {
        setUserData(data);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUserData(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ userData, isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
