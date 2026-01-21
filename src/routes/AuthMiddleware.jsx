import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const AuthMiddleware = (props) => {

    const loginStatus = useAuth();

    if (!loginStatus.loginStatus) {
        return (
            <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
        )
    } else {
        return (
            <React.Fragment>{props.children}</React.Fragment>
        )
    }
}
export default AuthMiddleware