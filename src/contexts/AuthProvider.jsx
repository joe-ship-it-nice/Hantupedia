import { useState } from "react";
import AuthContext from "./AuthContext";

// If nothing has been saved, it is false
function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const login = (email, password) => {
        const correctEmail = "admin@hantupedia.com";
        const correctPassword = "123";
        if (
            email === correctEmail &&
            password === correctPassword
        ) {
            setIsLoggedIn(true);
            // localStorage makes the login survive a refresh.
            localStorage.setItem("isLoggedIn", "true");

            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;