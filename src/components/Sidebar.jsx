import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    Collapse,
    Typography
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';


const Sidebar = (props) => {
    const location = useLocation();

    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const handleToggleMenu = (index) => {
        setOpenMenuIndex(prev => prev === index ? null : index)
    }

    // Mapping dari index.jsx route path
    const menuItems = [
        {
            text: "Dashboard",
            path: "/dashboard",
            icon: <DashboardCustomizeIcon />
        },
        {
            text: "Master Data",
            icon: <PeopleIcon />,

            sub: [
                { text: "User", path: "/master-data/user", icon: <PersonIcon /> },
                { text: "Teams", path: "/master-data/team", icon: <GroupIcon /> },
            ],
        },
        {
            text: "Reports",
            icon: <PeopleIcon />,

            sub: [
                { text: "Dashboard", path: "/dashboard", icon: <PersonIcon /> },
                { text: "Teams", path: "/master-data/team", icon: <GroupIcon /> },
            ],
        },


        { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ];



    return (
        // Container 
        <div
            style={{
                width: "100%",
                height: "100%",
                overflowY: "hidden",
                backgroundColor: "#0F1624",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
            }}
        >

            {/* Header Sidebar */}
            <Box
                sx={{
                    height: props.heightHeader,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "3px solid #352F44",
                }}
            >
                <img
                    src={props.isCollapsed ? "/SmallIcon.png" : "/BaseLogo.png"}
                    alt="Logo"
                    style={{ height: 40 }}
                />
            </Box>

            {/* Main Sidebar */}
            <Box
                sx={{
                    p: 2,
                }}
            >
                <Typography
                    sx={{
                        px: 3,
                        mx: 1,
                        flex: 1,
                        mt: 1,
                        mb: 1,
                        color: '#64748B'
                    }}
                    variant="body2"
                // className="bg-warning"
                >
                    MAIN
                </Typography>

                <List sx={{ flex: 1, p: 0, overflowY: 'auto', color: '#64748B' }} className="d-flex flex-column gap-2" >
                    {menuItems.map((item, index) => {
                        const isParent = !!item.sub;

                        return (
                            <React.Fragment key={index}>

                                {/* Menu without child */}
                                {!isParent && (
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        selected={location.pathname === item.path}
                                        sx={{
                                            borderRadius: 35,
                                            "&.Mui-selected": {
                                                bgcolor: "#323347",
                                                borderRadius: 35,
                                            },
                                            "&:hover": { bgcolor: "#323347", borderRadius: 35, transition: "all 0.5s ease" },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                color: 'inherit',
                                                "& svg": {
                                                    fontSize: 20,
                                                },
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>


                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                "& .MuiListItemText-primary": {
                                                    fontWeight: 600,
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                )}

                                {/* Menu with child */}
                                {isParent && (
                                    <>
                                        <ListItemButton
                                            onClick={() => handleToggleMenu(index)}

                                            sx={{
                                                borderRadius: 35,
                                                "&.Mui-selected": {
                                                    bgcolor: "#323347",
                                                    borderRadius: 35,
                                                },
                                                "&:hover": { bgcolor: "#323347", borderRadius: 35, transition: "all 0.5s ease" },
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    color: 'inherit',
                                                    "& svg": {
                                                        fontSize: 20,
                                                    },
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>


                                            <ListItemText
                                                primary={item.text}
                                                sx={{
                                                    "& .MuiListItemText-primary": {
                                                        fontWeight: 600,
                                                    }
                                                }}
                                            />
                                            <ExpandMore
                                                sx={{
                                                    transform: openMenuIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                                    transition: "transform 0.5s ease",
                                                }}
                                            />

                                        </ListItemButton>

                                        {/* Child Menu */}
                                        <Collapse in={openMenuIndex === index} timeout={400} unmountOnExit>
                                            <Box
                                                sx={{
                                                    opacity: openMenuIndex === index ? 1 : 0,
                                                    transform: openMenuIndex === index ? "translateY(0px)" : "translateY(-6px)",
                                                    transition: "opacity 0.35s ease, transform 0.35s ease",
                                                }}
                                            >
                                                <List component="div" disablePadding
                                                    sx={{
                                                        width: '80%',
                                                        ml: '20%',
                                                        borderLeft: '3px solid #352F44',
                                                        pl:1
                                                    }}
                                                     className="d-flex flex-column gap-2"
                                                >
                                                    {item.sub.map((sub, subIndex) => (
                                                        <ListItemButton
                                                            key={subIndex}
                                                            component={Link}
                                                            to={sub.path}
                                                            selected={location.pathname === sub.path}
                                                            sx={{
                                                                borderRadius: 35,
                                                                "&.Mui-selected": {
                                                                    bgcolor: "#323347",
                                                                    borderRadius: 35,
                                                                },
                                                                "&:hover": { bgcolor: "#323347", borderRadius: 35, transition: "all 0.5s ease" },
                                                            }}

                                                        >
                                                            <ListItemIcon sx={{ minWidth: 36, color: "#64748B" }} >
                                                                {sub.icon}
                                                            </ListItemIcon>
                                                            <ListItemText primary={sub.text} />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Box>
                                        </Collapse>

                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}
                </List>
            </Box>


        </div>
    );
};

Sidebar.PropTypes = {
    isCollapsed: PropTypes.any,
    heightHeader: PropTypes.any,
};

export default Sidebar;
