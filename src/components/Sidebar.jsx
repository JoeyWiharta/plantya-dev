import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
    const location = useLocation();

    // Mapping dari index.jsx route path
    const menuItems = [
        { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        { text: "Master Data", path: "/master-data", icon: <PeopleIcon /> },
        { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ];

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#ffffff",
                borderRight: "1px solid #ddd",
                position: "fixed",
                top: 0,
                left: 0,
                width: 240,
                zIndex: 1200,
                boxShadow: "none",
            }}
            className='bg-dark'
        >
            {/* Header Sidebar */}
            <Box
                sx={{
                    height: 64, // sama tinggi dengan AppBar
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: "#2f5174ff",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    letterSpacing: 0.5,
                }}
            >
                {/* Bisa ganti dengan img logo */}
                {/* <img src="/logo.png" alt="Logo" style={{ height: 32 }} /> */}
                MyApp
            </Box>

            {/* Menu List */}
            <List sx={{ flex: 1, p: 0, mt: 1 }}>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                        sx={{
                            "&.Mui-selected": {
                                bgcolor: "#e3f2fd",
                                borderLeft: "4px solid #1976d2",
                            },
                            "&:hover": {
                                bgcolor: "#f5f5f5",
                            },
                            py: 1.2,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 36, color: "#1976d2" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>

            <Divider />

            {/* Footer Sidebar */}
            <Box
                sx={{
                    p: 2,
                    textAlign: "center",
                    fontSize: "0.85rem",
                    color: "gray",
                    borderTop: "1px solid #eee",
                }}
            >
                © 2025 MyApp
            </Box>
        </Box>
    );
};

export default Sidebar;
