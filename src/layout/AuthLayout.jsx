import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from '@mui/icons-material/Code';



const SIDEBAR_COLLAPSE_WIDTH = 75;
const SIDEBAR_WIDTH = 280;
const HEADER_HEIGHT = 75;

const AuthLayout = ({ children }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        // Container
        <div style={{ display: 'flex', height: "100vh", overflow: "visible" }}>

            {/* Sidebar */}
            <aside
                style={{
                    width: isCollapsed ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: '100vh',
                    backgroundColor: "#0F1624",
                    borderRight: "3px solid #352F44",
                    overflow: "visible",
                    transition: "width 0.5s ease-in-out",
                    zIndex: 1200,
                }}
            >
                <Sidebar
                    isCollapsed={isCollapsed}
                    heightHeader={HEADER_HEIGHT}
                />
            </aside>

            {/* Floating Toggle Button */}
            <IconButton
                onClick={toggleSidebar}
                sx={{
                    position: "fixed",
                    top: HEADER_HEIGHT,
                    left: isCollapsed
                        ? SIDEBAR_COLLAPSE_WIDTH - 18
                        : SIDEBAR_WIDTH - 18,
                    transform: "translateY(-50%)",
                    zIndex: 2001,
                    width: 35,
                    height: 35,
                    borderRadius: '5px',
                    backgroundColor: "#0F1624",
                    border: "3px solid #352F44",
                    transition: "left 0.5s ease-in-out",
                    "&:hover": {
                        bgcolor: "#323347",
                    }

                }}
            >
                <CodeIcon sx={{ color: "#64748B" }} />
            </IconButton>



            {/* Header and Content Wrapper */}
            <div
                style={{
                    marginLeft: isCollapsed ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    transition: "margin-left 0.5s ease-in-out",
                    height: "100vh",
                    overflow: "visible",
                }}
            >

                {/* Header */}
                <header
                    style={{
                        height: HEADER_HEIGHT,
                        backgroundColor: "#0F1624",
                        borderBottom: "3px solid #352F44",
                        position: "sticky",
                        top: 0,
                        zIndex: 1100,
                    }}
                >
                    <Header
                        toggleSidebar={toggleSidebar}
                        isCollapsed={isCollapsed}
                    />
                </header>


                {/* Main Content */}
                <main
                    style={{
                        flex: 1,
                        padding: "24px",
                        backgroundColor: "#0F1624",
                        color: "#fff",
                        overflowY: "auto",
                    }}
                >
                    {children}
                </main>
            </div>
        </div>

    );
};

export default AuthLayout;