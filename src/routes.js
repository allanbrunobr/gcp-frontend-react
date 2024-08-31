import { Route } from 'react-router-dom';
import VisionLandmarkDetection from './containers/LandmarkDetection';
import VisionFaceDetection from './containers/FaceDetection';
import Sentiment from './containers/SentimentAnalysis';
import Translator from './containers/Translator';

const routes = [
    <Route path="/visionLandmarkDetection" element={<VisionLandmarkDetection />} />,
    <Route path="/visionFaceDetection" element={<VisionFaceDetection />} />,
    <Route path="/sentiment" element={<Sentiment />} />,
    <Route path="/translator" element={<Translator />} />,
];

export default routes;