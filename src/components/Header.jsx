import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Header = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/logout");
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#121314",
                zIndex: 1201, // pastikan tetap di atas sidebar
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                height: '100%',
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    height: "100%"
                }}
            // className="bg-success"
            >

                <Box>
                    {/* Judul Header */}
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'light' }}>
                        Plantya - Admin User Dari Local Storage
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                    className="bg-warning"
                >
                    <Box>
                        <IconButton
                            color="inherit"
                            onClick={handleLogout}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "0.9rem",
                            }}
                        >
                            <NotificationsNoneOutlinedIcon fontSize="medium" />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            borderLeft: '3px solid #383B42',
                        }}>

                        <IconButton
                            color="inherit"
                            onClick={handleLogout}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "0.9rem",
                            }}
                        >
                            <AccountCircleOutlinedIcon fontSize="medium" />
                            Logout
                        </IconButton>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

Header.PropTypes = {
    ToggleSidebar: PropTypes.any,
    isCollapsed: PropTypes.any,
};

export default Header;
