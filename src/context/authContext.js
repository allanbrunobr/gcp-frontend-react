import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext('mindpro');

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserData({ username: decoded.username, email: decoded.email });
            } catch (error) {
                console.error('Invalid token', error);
            }
        } else {
        }
    }, [location]);

    const isLoggedIn = !!userData;
    console.log("is logged in: " + isLoggedIn)

    return (
        <AuthContext.Provider value={{ userData, setUserData, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
