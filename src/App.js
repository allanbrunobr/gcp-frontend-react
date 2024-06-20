import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './MainPage';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from "./ProtectedRoute";
import FixedMenu from './components/menu/FixedMenu'; // Importando o FixedMenu


function App() {
    return (
        <Router>
            <AuthProvider>
                <FixedMenu /> {/* Incluindo o FixedMenu */}
                <div style={{ paddingTop: '60px' }}> {/* Ajustando o padding-top para acomodar o menu fixo */}
                <Routes>
                    <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}
export default App;
