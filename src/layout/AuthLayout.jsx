import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/layoutComponent/Sidebar/Sidebar";
import Header from "../components/layoutComponent/Header";
import { IconButton, Box, useTheme, useMediaQuery, Backdrop, Drawer } from "@mui/material";
import { ArrowBackIosIcon, ArrowForwardIosIcon } from "../assets/Icon/muiIcon/index";

// Constant Value
const SIDEBAR_COLLAPSE_WIDTH = 60;
const SIDEBAR_WIDTH = 250;
const HEADER_HEIGHT = 60;

const AuthLayout = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (isMobile) {
            setMobileOpen(false)
            setIsCollapsed(false)
        }
    }, [isMobile])


    const toggleSidebar = () => {
        if (isMobile) {
            setMobileOpen(!isMobileOpen)
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    const handleMobileClose = () => {
        setMobileOpen(false);
    };

    const userData = useMemo(() => {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : null;
    }, []);

    const drawerWidth = isCollapsed ? SIDEBAR_COLLAPSE_WIDTH : SIDEBAR_WIDTH;

    return (
        <Box className="auth-layout-root">
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? isMobileOpen : true}
                onClose={handleMobileClose}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,

                    ...(!isMobile && {
                        width: drawerWidth,
                        flexShrink: 0,
                    }),

                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        transition: theme.transitions.create("width", {
                            duration: theme.transitions.duration.standard,
                        }),
                    },
                }}
            >
                <Sidebar
                    userData={userData}
                    heightHeader={HEADER_HEIGHT}
                    drawerWidth={drawerWidth}
                    isCollapsed={isCollapsed}
                    isMobileOpen={isMobileOpen}
                    handleMobileClose={handleMobileClose}
                    toggleSidebar={toggleSidebar}
                />
            </Drawer>


            {!isMobile && (
                <IconButton
                    onClick={toggleSidebar}
                    className={isCollapsed ? "shadow-sm" : undefined}
                    sx={{
                        position: "fixed",
                        top: HEADER_HEIGHT / 2,
                        left: drawerWidth,
                        transform: "translate(-50%, -50%)",
                        ml: isCollapsed ? 0 : -3,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: isCollapsed ? "background.paper" : "transparent",
                        border: isCollapsed ? "1px solid" : "",
                        borderColor: "divider",
                        zIndex: theme.zIndex.drawer + 10,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: "background.paper",
                        },
                    }}
                >
                    {isCollapsed ?
                        <ArrowForwardIosIcon sx={{
                            fontSize: 12,
                            color: "text.secondary",
                            ml: 0.1,
                            "&:hover": {
                                color: 'primary.main'
                            },
                        }} /> :
                        <ArrowBackIosIcon sx={{
                            fontSize: 12,
                            color: "text.secondary",
                            ml: 0.5,
                            "&:hover": {
                                color: 'primary.main'
                            },
                        }} />
                    }
                </IconButton>
            )}

            <Box className="auth-layout-wrapper-main">
                <Header
                    toggleSidebar={toggleSidebar}
                    userData={userData}
                    drawerWidth={isMobile ? 0 : drawerWidth}
                    headerHeight={HEADER_HEIGHT}
                />

                <Box component="main" className="auth-layout-content" p={2}>
                    {props.children}
                </Box>
            </Box>
        </Box>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.any,
};

export default AuthLayout;