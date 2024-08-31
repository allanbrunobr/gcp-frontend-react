// src/services/authService.js
import { auth } from '../firebaseConfig';
import {
    signInWithCustomToken,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

export const initializeAuth = (setUser) => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            resolve(user);
        });

        return unsubscribe;
    });
};

export const signInWithToken = async (token) => {
    try {
        const userCredential = await signInWithCustomToken(auth, token);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in with custom token:", error);
        throw error;
    }
};

export const signOutUser = () => signOut(auth);

export const getCurrentUser = () => auth.currentUser;