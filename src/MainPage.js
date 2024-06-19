// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faChartLine, faCloudUploadAlt, faCog} from "@fortawesome/free-solid-svg-icons";
// import React from "react";
// import {useAuth} from "./context/authContext";
//
// function MainPage() {
//     const { userData } = useAuth();
//     const {username, email} = userData || {};
//
//     return (
//         <div className="App">
//             <div className="container-fluid my-5">
//                 <div className="row justify-content-center align-items-center">
//                     <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
//                         <h1 className="display-4 mb-4 text-center text-primary">
//                             Welcome to e-Core GCP, {username} - {email}
//                         </h1>
//                         <p className="lead mb-4 text-center text-secondary">
//                             Discover the power of GCP and how e-Core can help you unlock its full potential.
//                         </p>
//                         <div className="d-flex">
//                             <a href="#" className="btn btn-primary mr-3">Learn More</a>
//                             <a href="#" className="btn btn-secondary">Get Started</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="container-fluid bg-light py-5">
//                 <div className="container">
//                     <h2 className="text-center mb-4 text-secondary">Why Choose e-Core?</h2>
//                     <div className="row">
//                         <div className="col-md-4 text-center">
//                             <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" className="mb-3 text-primary" />
//                             <h4>Seamless Cloud Migration</h4>
//                             <p className="text-secondary">Our experts will guide you through a smooth transition to the GCP cloud.</p>
//                         </div>
//                         <div className="col-md-4 text-center">
//                             <FontAwesomeIcon icon={faCog} size="3x" className="mb-3 text-primary" />
//                             <h4>Optimized GCP Solutions</h4>
//                             <p className="text-secondary">We'll help you leverage GCP services to drive your business forward.</p>
//                         </div>
//                         <div className="col-md-4 text-center">
//                             <FontAwesomeIcon icon={faChartLine} size="3x" className="mb-3 text-primary" />
//                             <h4>Continuous Optimization</h4>
//                             <p className="text-secondary">Our team will continuously monitor and optimize your GCP infrastructure.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default MainPage;
// MainPage.js
import React from 'react';
import { useAuth } from './context/authContext';

function MainPage() {
    const { userData } = useAuth();

    return (
        <div>
            {userData ? (
                <div>
                    <h1>Bem-vindo, {userData.username}</h1>
                    {/* Outros conteúdos da página */}
                </div>
            ) : (
                <h1>Carregando...</h1>
            )}
        </div>
    );
}

export default MainPage;
