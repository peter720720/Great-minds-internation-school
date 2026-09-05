import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('gm_user')) || null);
    const [token, setToken] = useState(localStorage.getItem('gm_token') || null);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('gm_user', JSON.stringify(userData));
        localStorage.setItem('gm_token', userToken);
    };

    const logout = (redirectPath = '/admin-login') => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        window.location.href = typeof redirectPath === 'string' ? redirectPath : '/admin-login';
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// This is the missing named export causing your browser console error
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
