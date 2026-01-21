import { createContext, useContext, useState } from "react";
import { logoutApi } from "../utils/ListApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [loginStatus, setLoginStatus] = useState(() => {
        return localStorage.getItem("loginStatus") === "true";
    });

    const login = (userData) => {
        setUser(userData);
        setLoginStatus(true);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("loginStatus", "true");
    };

    const logout = async () => {
        try {
            await logoutApi();
        } catch (e) {
            console.error(e);
        } finally {
            setUser(null);
            setLoginStatus(false);
            localStorage.removeItem("user");
            localStorage.removeItem("loginStatus");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginStatus, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook untuk pakai context
export const useAuth = () => useContext(AuthContext);
