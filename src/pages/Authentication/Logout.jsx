import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        logout()
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
};

export default Logout;
