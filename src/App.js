import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { AuthProvider, useAuth } from './context/authContext';
import ProtectedRoute from "./ProtectedRoute";
import FixedMenu from './components/menu/FixedMenu';
import routes from './routes';

function AppContent() {
    const { loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <FixedMenu />
            <div style={{ paddingTop: '60px' }}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    {routes}
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;