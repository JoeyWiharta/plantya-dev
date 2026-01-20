import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutApi } from "../../utils/ListApi";

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        const response = await logoutApi()
        return response
        debugger
    }

    useEffect(() => {
        logout()
        handleLogout()
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
};

export default Logout;
