import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCog, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import './App.css';

function MainPage() {
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        const searchParams = new URLSearchParams(location.search);
        const usernameFromParams = searchParams.get('username');
        const emailFromParams = searchParams.get('email');
        if (storedUserData) {
            setUserData(storedUserData);
        } else if (usernameFromParams && emailFromParams) {
            setUserData({ username: usernameFromParams, email: emailFromParams });
        } else {
            // Handle case when user is not logged in (e.g., redirect to login)
            console.log('User not logged in');
        }
    }, [location]);

    return (
        <div className="App">
            <div className="container-fluid my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="display-4 mb-4 text-center text-primary">
                            Welcome to e-Core GCP, {username}
                        </h1>
                        <p className="lead mb-4 text-center text-secondary">
                            Discover the power of GCP and how e-Core can help you unlock its full potential.
                        </p>
                        <div className="d-flex">
                            <a href="#" className="btn btn-primary mr-3">Learn More</a>
                            <a href="#" className="btn btn-secondary">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4 text-secondary">Why Choose e-Core?</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" className="mb-3 text-primary" />
                            <h4>Seamless Cloud Migration</h4>
                            <p className="text-secondary">Our experts will guide you through a smooth transition to the GCP cloud.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <FontAwesomeIcon icon={faCog} size="3x" className="mb-3 text-primary" />
                            <h4>Optimized GCP Solutions</h4>
                            <p className="text-secondary">We'll help you leverage GCP services to drive your business forward.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <FontAwesomeIcon icon={faChartLine} size="3x" className="mb-3 text-primary" />
                            <h4>Continuous Optimization</h4>
                            <p className="text-secondary">Our team will continuously monitor and optimize your GCP infrastructure.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                {/* Add other routes as necessary */}
            </Routes>
        </Router>
    );
}

export default App;
