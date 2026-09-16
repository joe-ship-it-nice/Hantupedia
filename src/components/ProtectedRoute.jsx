import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

// useContext(AuthContext) lets this component access the values shared by AuthProvider.
function ProtectedRoute({ children }) {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        // "replace" replaces the current entry in the browser history instead of adding another one. This prevents the failed protected navigation from becoming another normal history entry.
        return <Navigate to="/login" replace />;
    }
    // "children" is whatever component ProtectedRoute is wrapping in App.jsx, such as <Dashboard />.
    return children;
}

export default ProtectedRoute;