import React, { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { IconButton, Box, useTheme, useMediaQuery, Backdrop } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';



const SIDEBAR_COLLAPSE_WIDTH = 75;
const SIDEBAR_WIDTH = 280;
const HEADER_HEIGHT = 75;

const AuthLayout = (props) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setIsCollapsed(false)
        setMobileOpen(false)
    }, [isMobile])

    const toggleSidebar = () => {
        if (isMobile) {
            setMobileOpen(!isMobileOpen)
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };


    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData)



    return (
        // Container
        <Box sx={{ display: 'flex', minHeight: "100vh" }}>

            {/* Sidebar */}
            <Box
                component="aside"
                sx={{
                    width: isMobile ? SIDEBAR_WIDTH : (isCollapsed ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH),
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: '100vh',
                    backgroundColor: "#inherit",
                    borderRight: "2px solid #383B42",
                    transform: isMobile && !isMobileOpen ? 'translateX(-100%)' : 'translateX(0)',
                    overflow: "visible",
                    transition: "width 0.3s ease, transform 0.3s ease",
                    zIndex: 1300,
                }}
            >
                <Sidebar
                    isCollapsed={isCollapsed}
                    heightHeader={HEADER_HEIGHT}
                    userData={userData}
                    isMobileOpen={isMobileOpen}
                />
            </Box>

            {
                isMobile && (
                    <Backdrop
                        open={isMobileOpen}
                        onClick={toggleSidebar}
                        sx={{ zIndex: 1299, color: 'rgba(0, 0, 0, 0.5)' }}
                    />
                )
            }

            {/* Header and Content Wrapper */}
            <Box
                component="main"
                sx={{
                    ml: isMobile ? 0 : (isCollapsed ? `${SIDEBAR_COLLAPSE_WIDTH}px` : `${SIDEBAR_WIDTH}px`),
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    backgroundColor: "#121314",
                    transition: "margin-left 0.3s ease",
                }}
            >

                {/* Header */}

                <Header
                    toggleSidebar={toggleSidebar}
                    isCollapsed={isCollapsed}
                    userData={userData}
                    headerHeight={HEADER_HEIGHT}
                />


                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: 3,
                        backgroundColor: "#121314",
                        color: "#FAFAFA",
                        overflowY: "auto",
                    }}
                >
                    {props.children}
                </Box>
            </Box>

            <IconButton
                onClick={toggleSidebar}
                sx={{
                    position: "fixed",
                    top: HEADER_HEIGHT,
                    left: isCollapsed
                        ? SIDEBAR_COLLAPSE_WIDTH - 18
                        : SIDEBAR_WIDTH - 18,
                    transform: "translateY(-50%)",
                    zIndex: 1300,
                    width: 35,
                    height: 35,
                    borderRadius: '5px',
                    backgroundColor: "#16181A",
                    border: "2px solid #383B42",
                    transition: "left 0.3s ease",
                    display: { xs: 'none', sm: 'flex' },
                    "&:hover": {
                        bgcolor: "#121314",
                    }
                }}
            >
                <CodeIcon sx={{ color: "#383B42" }} />
            </IconButton>

        </Box >

    );
};

AuthLayout.propTypes = {
    children: PropTypes.any,
};

export default AuthLayout;