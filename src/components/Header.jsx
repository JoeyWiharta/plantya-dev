import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Popover,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    ClickAwayListener,
    Divider
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'; // Icon untuk Account Info
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import { useAuth } from "../context/AuthContext";


const Header = (props) => {
    const theme = useTheme()
    const { logout } = useAuth();


    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    // Effect Close Popover When Resize 
    useEffect(() => {
        const handleResize = () => {
            if (anchorEl) {
                handleProfileMenuClose();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [anchorEl]);


    const handleLogout = () => {
        handleProfileMenuClose();
        logout()
    };

    const handleAccountInfo = () => {
        handleProfileMenuClose();
        // Tambahkan logic navicasi or something
        // navigate("/account-info");
        console.log("Navigate to Account Info");
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    const userName = props.userData?.username || ""
    const userRole = props.userData?.role || ""

    return (
        <>

            <AppBar
                position="static"
                sx={{
                    backgroundColor: "background.default",
                    zIndex: theme.zIndex.drawer + 1,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                    height: props.headerHeight,
                    borderBottom: "1px solid",
                    borderBottomColor: 'action.active',
                    color: 'text.primary'
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: 'center',
                        height: '100%',
                        px: 2,
                        py: 0,
                    }}
                >

                    {/* Left Side */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                    }}
                    >
                        <IconButton
                            onClick={props.toggleSidebar}
                            sx={{
                                display: {
                                    xs: 'flex',
                                    sm: 'none'
                                },
                                mr: 2,
                                width: 35,
                                height: 35,
                                borderRadius: '5px',
                                backgroundColor: "background.paper",
                                border: "1px solid",
                                borderColor: 'action.active',
                                transition: "left 0.3s ease",
                                "&:hover": {
                                    bgcolor: "background.default",
                                }
                            }}
                        >
                            <CodeIcon sx={{ color: "action.active" }} />
                        </IconButton>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 'medium',
                                }}
                            >
                                Welcome Back
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 'medium'
                                }}
                            >
                                Plantya - Role {userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right Side */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >

                        <IconButton
                            color="inherit"
                            sx={{
                                p: 1,
                            }}
                        >
                            <NotificationsNoneOutlinedIcon sx={{
                                fontSize: '25px'
                            }} />
                        </IconButton>

                        <Box
                            sx={{
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                mx: 1,
                            }}

                        >
                            <Divider
                                orientation="vertical"
                                sx={{ border: '1px solid', height: '100%', borderColor: 'action.active' }}
                            />
                        </Box>
                        <IconButton
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                            aria-describedby={id}
                            sx={{ p: 1 }}
                        >
                            <AccountCircleOutlinedIcon sx={{
                                fontSize: '25px'
                            }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        className: 'sidebar-popover',
                        sx: {
                            mt: 1,
                            minWidth: { xs: '200px', sm: '230px' },
                            maxWidth: { xs: '90vw', sm: 'none' },
                            overflow: 'hidden',
                        }
                    }
                }}
            >
                <Box sx={{ px: 2, py: 2, borderBottom: "1px solid", textAlign: 'center', borderBottomColor: 'action.active', color: "text.primary" }}>
                    <Box
                        component="img"
                        src="/GacorBang.jpg"
                        alt="Profile"
                        sx={{ width: 75, height: 75, borderRadius: "50%", objectFit: "cover", mb: 2 }}
                    />
                    <Typography variant="h6">
                        {userName}
                    </Typography>
                    <Typography variant="body1">
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()}
                    </Typography>
                </Box>

                <List sx={{ display: 'flex', p: 0, color: 'text.primary' }}>
                    <ListItemButton onClick={handleAccountInfo} sx={{ flex: 1, borderRadius: 1, m: 1 }}>
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            <PersonOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton onClick={handleLogout} sx={{ flex: 1, borderRadius: 1, m: 1 }}>
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Popover>
        </>


    );
};

Header.PropTypes = {
    ToggleSidebar: PropTypes.any,
    isCollapsed: PropTypes.any,
    userData: PropTypes.any,
    headerHeight: PropTypes.any,
};

export default Header;
