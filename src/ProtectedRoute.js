import { useAuth } from "./context/authContext";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn) {
        navigate("http://localhost:4201/login", { replace: true });
        return null;
    }
    return children;
}

export default ProtectedRoute;
