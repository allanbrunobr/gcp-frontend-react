import { Route } from 'react-router-dom';
import Sentiment from './containers/SentimentAnalysis';
import Translator from './containers/Translator';
import FaceExpressionDetection from "./containers/FaceExpressionDetection";

const routes = [
    <Route path="/faceExpressionDetection" element={<FaceExpressionDetection />} />,
    <Route path="/sentiment" element={<Sentiment />} />,
    <Route path="/translator" element={<Translator />} />,
];

export default routes;