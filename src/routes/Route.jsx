import React from 'react';
import { Navigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useAuth } from "../context/AuthContext";


// Authmiddleware Function

const Authmiddleware = (props) => {

    debugger
    const loginStatus = useAuth();

    if (!loginStatus) {
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