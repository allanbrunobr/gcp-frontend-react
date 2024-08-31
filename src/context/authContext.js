// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeAuth, signInWithToken, getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            await initializeAuth(setUser);
            const token = localStorage.getItem('authToken');
            if (token && !getCurrentUser()) {
                try {
                    await signInWithToken(token);
                } catch (error) {
                    console.error("Failed to sign in with token:", error);
                    localStorage.removeItem('authToken');
                }
            }
            setLoading(false);
        };

        initialize();
    }, []);

    const value = {
        user,
        setUser,
        isLoggedIn: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}