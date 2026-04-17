import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthMiddleware = ({ children }) => {
    const { loginStatus } = useAuth()
    const location = useLocation()

    if (!loginStatus) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        )
    }

    return children
}

export default AuthMiddleware