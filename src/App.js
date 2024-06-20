import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './MainPage';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
export default App;
