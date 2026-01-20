import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


// Authmiddleware Function

const Authmiddleware = (props) => {

    const loginStatus = useAuth();
    // debugger

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
export default Authmiddleware