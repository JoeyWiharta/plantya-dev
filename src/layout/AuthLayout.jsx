import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
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
        <Box sx={{ display: 'flex', minHeight: "100vh", overflow: "visible" }}>

            {/* Sidebar */}
            <Box
                component="aside"
                sx={{
                    width: isCollapsed ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: '100vh',
                    backgroundColor: "#inherit",
                    borderRight: "3px solid #383B42",
                    overflow: "visible",
                    transition: "width 0.5s ease-in-out",
                    zIndex: 1200,
                }}
            >
                <Sidebar
                    isCollapsed={isCollapsed}
                    heightHeader={HEADER_HEIGHT}
                />
            </Box>

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
                    backgroundColor: "#121314",
                    border: "3px solid #383B42",
                    transition: "left 0.5s ease-in-out",
                    "&:hover": {
                        bgcolor: "#323347",
                    }

                }}
            >
                <CodeIcon sx={{ color: "#64748B" }} />
            </IconButton>



            {/* Header and Content Wrapper */}
            <Box
                component="main"
                sx={{
                    ml: isCollapsed ? `${SIDEBAR_COLLAPSE_WIDTH}px` : `${SIDEBAR_WIDTH}px`,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    transition: "margin-left 0.5s ease-in-out",
                    minHeight: "100vh",
                    backgroundColor: "#inherit",
                    overflow: "visible",
                }}
            >

                {/* Header */}

                <Box
                    component="header"
                    sx={{
                        height: HEADER_HEIGHT,
                        backgroundColor: "#inherit",
                        borderBottom: "3px solid #383B42",
                        position: "sticky",
                        top: 0,
                        zIndex: 1100,
                    }}
                >
                    <Header
                        toggleSidebar={toggleSidebar}
                        isCollapsed={isCollapsed}
                    />
                </Box>


                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: 3,
                        backgroundColor: "#inherit",
                        color: "#fff",
                        overflowY: "auto",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box >

    );
};

export default AuthLayout;