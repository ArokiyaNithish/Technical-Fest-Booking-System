import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { name: 'User', role: 'user' }
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedAdmin = localStorage.getItem('isAdmin');
            if (storedUser) setUser(JSON.parse(storedUser));
            if (storedAdmin === 'true') setIsAdmin(true);
        } catch (err) {
            console.error('Error loading auth from localStorage:', err);
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
        }
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
    };

    const loginAdmin = () => {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        setUser({ name: 'Admin', role: 'admin' });
        localStorage.setItem('user', JSON.stringify({ name: 'Admin', role: 'admin' }));
    };

    const logout = () => {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, loginUser, loginAdmin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
