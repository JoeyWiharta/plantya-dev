import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    ClickAwayListener
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'; // Icon untuk Account Info


const Header = (props) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        handleProfileMenuClose(); // Tutup popover sebelum navigasi
        navigate("/logout");
    };

    const handleAccountInfo = () => {
        handleProfileMenuClose(); // Tutup popover
        // Tambahkan logika navigasi ke halaman info akun di sini
        // navigate("/account-info");
        console.log("Navigate to Account Info");
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    const userName = props.userData.username
    const userRole = props.userData?.role

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
                    height: "100%",
                    paddingRight: "0 !important",
                    // p: "0 !important",
                    // m: "0 !important",
                }}
            // className="bg-info"

            >

                <Box
                    // className="bg-success"
                    sx={{
                        // p: 0,
                        // m: 0,
                        height: '100%',
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        textWrap: 'nowrap'
                    }}
                >
                    {/* Judul Header */}
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'light' }}>
                        Plantya - {userRole} User
                    </Typography>
                </Box>

                <Box
                    // className="bg-warning"
                    sx={{
                        height: '50%',
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-center",
                        // width: '10%',
                        mr: 2
                    }}
                >
                    <Box
                        sx={{
                            // bgcolor: "red",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",


                            width: '100%',
                            p: 1
                        }}
                    >
                        <IconButton color="inherit">
                            <NotificationsNoneOutlinedIcon fontSize="medium" />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            borderLeft: '2px solid #383B42',


                            width: '100%',

                            p: 1,
                            // bgcolor: "green",

                        }}>

                        <IconButton
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                            aria-describedby={id}
                            // onClick={handleLogout}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: 'column',
                                // bgcolor:'red',
                                borderRadius: 0,
                            }}
                        >
                            <AccountCircleOutlinedIcon fontSize="medium" />
                            {/* <Typography variant="body2" sx={{
                                fontWeight: '200',
                                fontSize: '0.7rem',
                            }}>
                                Joey Liauw Wiharta
                            </Typography> */}

                        </IconButton>


                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleProfileMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        // --- Styling Konsisten dengan Sidebar Popover ---
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: "#16181A",
                                        border: "2px solid #383B42",
                                        borderRadius: "10px",
                                        mt: 1,
                                        minWidth: "230px",
                                        overflow: 'hidden',
                                    }
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 3,    // 75% fleksibel
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    gap: 2,
                                    px: 2,
                                    py: 2,
                                    borderBottom: "2px solid #383B42",
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/GacorBang.jpg"   // ganti sesuai foto kamu
                                    alt="Profile"
                                    sx={{
                                        width: 75,
                                        height: 75,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid #383B42",
                                    }}
                                />

                                <Box sx={{ display: "flex", flexDirection: "column", textAlign: 'center' }} >
                                    <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#FAFAFA" }} >
                                        {userName}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.8rem", color: "#FAFAFA" }}>
                                        {userRole}
                                    </Typography>
                                </Box>
                            </Box>

                            <List
                                sx={{
                                    flex: 1,     // 25% fleksibel
                                    display: 'flex',
                                    flexDirection: 'row',
                                    p: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FAFAFA',
                                    // gap: 0.5,
                                }}
                            // className="bg-success"
                            >
                                {/* Opsi Account Info */}
                                <ListItemButton onClick={handleAccountInfo} sx={{
                                    flex: 1,
                                    borderRadius: "8px",
                                    height: '100%',
                                    "&:hover": {
                                        bgcolor: "#1F1F1F",
                                        color: '#FAFAFA',
                                        transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                    },
                                    // bgcolor: 'red',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <ListItemIcon sx={{
                                        color: 'inherit',
                                        minWidth: 32,
                                        // bgcolor: 'red',
                                        "& svg": {
                                            fontSize: 22,
                                        },
                                    }}>

                                        <PersonOutlineOutlinedIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Profile"
                                        sx={{
                                            "& .MuiListItemText-primary": {
                                                fontWeight: 500
                                            }

                                        }} />
                                </ListItemButton>

                                {/* Opsi Logout */}
                                <ListItemButton onClick={handleLogout} sx={{
                                    flex: 1,
                                    borderRadius: "8px",
                                    pl: 1,
                                    pr: 2,
                                    height: '100%',
                                    "&:hover": {
                                        bgcolor: "#1F1F1F",
                                        color: '#FAFAFA',
                                        transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <ListItemIcon sx={{
                                        color: 'inherit',
                                        minWidth: 32,
                                        // bgcolor: 'red',
                                        "& svg": {
                                            fontSize: 22,
                                        },
                                    }}>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary="Logout"
                                        sx={{
                                            // bgcolor: 'red',
                                            "& .MuiListItemText-primary": {
                                                fontWeight: 500
                                            }

                                        }} />
                                </ListItemButton>
                            </List>
                        </Popover>


                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

Header.PropTypes = {
    ToggleSidebar: PropTypes.any,
    isCollapsed: PropTypes.any,
    userData: PropTypes.any,
};

export default Header;
