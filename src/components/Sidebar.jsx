import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    Collapse,
    Typography,
    Tooltip,
    Popover,
    Fade
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const Sidebar = (props) => {
    const location = useLocation();

    // State and Function Sidebar Expand
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const handleToggleMenu = (index) => {
        setOpenMenuIndex(prev => prev === index ? null : index)
    }

    // State and Function Sidebar Collapse
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverParentIndex, setPopoverParentIndex] = useState(null);

    const handleOpenPopover = (event, index) => {
        setAnchorEl(event.currentTarget);
        setPopoverParentIndex(index);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setPopoverParentIndex(null);
    };

    const isChildSelected = (item) => {
        if (!item.sub) return false
        return item.sub.some(sub => location.pathname === sub.path)
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
                { text: "User", path: "/user", icon: <PersonIcon /> },
                { text: "Teams", path: "/master-data/team", icon: <GroupIcon /> },
            ],
        },
        {
            text: "Reports",
            icon: <AnalyticsOutlinedIcon />,

            sub: [
                { text: "Table", path: "/testing", icon: <BackupTableOutlinedIcon /> },
                { text: "Graph", path: "/master-data/team", icon: <ShowChartOutlinedIcon /> },
            ],
        },
        {
            text: "Header Test",
            icon: <FactCheckOutlinedIcon />,

            sub: [
                { text: "Test 1", path: "/test", icon: <PersonIcon /> },
                { text: "Test 2", path: "/master-data/team", icon: <GroupIcon /> },
                { text: "Test 3", path: "/test", icon: <PersonIcon /> },
                { text: "Test 4", path: "/test", icon: <PersonIcon /> },
                { text: "Test 5", path: "/test", icon: <PersonIcon /> },
            ],
        },

        { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ];
    const footerItems = [
        {
            text: "Support",
            path: "/dashboard",
            icon: <SupportAgentOutlinedIcon />
        },
        {
            text: "About",
            icon: <InfoOutlinedIcon />,
            path: "/about",
        },

        // { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ];

    // Expand Parent Jika Child Menu Active Sesuai Path
    useEffect(() => {
        debugger
        setOpenMenuIndex(null)
        handleClosePopover()
        if (props.isCollapsed == false) {


            menuItems.forEach((item, index) => {
                if (item.sub) {
                    let isMatch = item.sub.some(sub => sub.path === location.pathname);
                    if (isMatch) {
                        setOpenMenuIndex(index);
                    }
                }
            });
        }
    }, [location.pathname, props.isCollapsed]);




    return (
        // Container 
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                // overflow: "hidden",
                backgroundColor: "#0F1624",
                color: "#fff",
            }}
        >

            {/* Header Sidebar */}
            <Box
                sx={{
                    minHeight: props.heightHeader,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "3px solid #352F44",
                }}
            // className="bg-info"
            >
                <img
                    src={props.isCollapsed ? "/SmallIcon.png" : "/BaseLogo.png"}
                    alt="Logo"
                    style={{
                        height: 40,
                        width: 'auto',
                    }}
                />
            </Box>

            {/* Container Main and Footer Sidebar */}
            <Box
                sx={{
                    p: 0,

                    overflowY: "auto",
                    overflowX: "hidden",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    scrollbarWidth: "none",
                }}
            >

                {/* Main Sidebar */}
                <Box
                    sx={{
                        p: 2,
                        pb: 0,
                        borderBottom: "3px solid #352F44",
                    }}
                // className="bg-success"
                >
                    <Typography
                        sx={{
                            px: props.isCollapsed ? 0 : 3,
                            mx: props.isCollapsed ? 0 : 1,
                            flex: 1,
                            my: 1,
                            color: '#64748B',
                            transition: "all 0.3s ease"


                        }}
                        variant="body2"
                    // className="bg-warning"
                    >
                        MAIN
                    </Typography>

                    <List
                        className="d-flex flex-column"
                        sx={{
                            flex: 1, p: 0, color: '#64748B',
                        }}
                    >

                        {menuItems.map((item, index) => {
                            const isParent = !!item.sub;
                            return (
                                <React.Fragment key={index}>

                                    {/* Parent Menu*/}
                                    <Tooltip
                                        title={props.isCollapsed ? item.text : ""}
                                        placement="right"
                                        arrow
                                        disableHoverListener={!props.isCollapsed}
                                        slots={{
                                            transition: Fade,
                                        }}
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    bgcolor: "#323347",
                                                    color: '#FFFFFF',
                                                    fontSize: '1rem'
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: '#323347',
                                                }
                                            },
                                            transition: { timeout: 600 },
                                        }}
                                    >
                                        <ListItemButton
                                            component={!isParent ? Link : "button"}
                                            to={!isParent ? item.path : undefined}
                                            onClick={(e) => {
                                                if (props.isCollapsed && isParent) {
                                                    handleOpenPopover(e, index);
                                                } else if (isParent) {
                                                    handleToggleMenu(index)
                                                }
                                            }
                                            }
                                            selected={!isParent && location.pathname === item.path || props.isCollapsed && isParent && isChildSelected(item)}
                                            sx={{
                                                borderRadius: 35,
                                                mb: 1,

                                                ...(props.isCollapsed && {
                                                    px: 0,
                                                    justifyContent: "center",
                                                }),


                                                "&.Mui-selected": {
                                                    bgcolor: "#323347",
                                                    borderRadius: 35,
                                                    color: '#FFFFFF'
                                                },
                                                "&:hover": {
                                                    bgcolor: "#323347",
                                                    borderRadius: 35,
                                                    color: '#FFFFFF',
                                                    transition: "all 0.5s ease"
                                                },
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
                                                    ...(props.isCollapsed && {
                                                        minWidth: 0,

                                                        "& svg": {
                                                            fontSize: 26,
                                                        },
                                                    }),
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>

                                            {!props.isCollapsed && (
                                                <ListItemText
                                                    primary={item.text}
                                                    sx={{
                                                        "& .MuiListItemText-primary": {
                                                            fontWeight: 600,
                                                        }
                                                    }}
                                                />
                                            )}

                                            {isParent && !props.isCollapsed && (
                                                <ExpandMore
                                                    sx={{
                                                        transform: openMenuIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                                        transition: "transform 0.5s ease",
                                                    }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </Tooltip>

                                    {props.isCollapsed && (

                                        <Popover
                                            open={popoverParentIndex === index}
                                            anchorEl={anchorEl}
                                            onClose={handleClosePopover}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'center',
                                                horizontal: 'left',
                                            }}
                                            slotProps={{
                                                paper: {
                                                    onMouseLeave: () => {
                                                        setTimeout(handleClosePopover, 100);
                                                    },
                                                    sx: {
                                                        bgcolor: "#0F1624",
                                                        borderRadius: 3,
                                                        p: 1,
                                                        border: "3px solid #352F44",
                                                        width: '10%',
                                                        ml: 1,
                                                        transition: "opacity 0.3s ease, transform 0.3s ease"
                                                    }
                                                }
                                            }}
                                        >
                                            <List
                                                sx={{ p: 0 }}
                                                className="d-flex flex-column gap-2"
                                            >
                                                {item.sub?.map((sub, subIndex) => (
                                                    <ListItemButton
                                                        key={subIndex}
                                                        component={Link}
                                                        to={sub.path}
                                                        selected={location.pathname === sub.path}
                                                        onClick={handleClosePopover}
                                                        sx={{
                                                            // --- Styling dari ListItemButton di Collapse ---
                                                            borderRadius: 35,          // Dari `borderRadius: 35`
                                                            px: 0,                      // Dari `px: 0`
                                                            "&.Mui-selected": {
                                                                bgcolor: "#323347",
                                                                color: '#FFFFFF'
                                                            },
                                                            "&:hover": {
                                                                bgcolor: "#323347",
                                                                color: '#FFFFFF',
                                                                transition: "all 0.5s ease" // Dari `transition`
                                                            },
                                                        }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                // --- Styling dari ListItemIcon di Collapse ---
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                color: 'inherit',
                                                                "& svg": {
                                                                    fontSize: 20,
                                                                },
                                                            }}
                                                        >
                                                            {sub.icon}
                                                        </ListItemIcon>

                                                        <ListItemText
                                                            primary={sub.text}
                                                            sx={{
                                                                "& .MuiListItemText-primary": {
                                                                    fontWeight: 600
                                                                }
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Popover>
                                    )}



                                    {/* Child Menu */}
                                    {isParent && !props.isCollapsed && (
                                        <Collapse in={openMenuIndex === index} timeout={500} unmountOnExit>
                                            <Box sx={{ mb: 1 }}>
                                                <List component="div" disablePadding
                                                    sx={{
                                                        width: '80%',
                                                        ml: '20%',
                                                        borderLeft: '3px solid #352F44',
                                                        pl: 1,
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
                                                                px: 0,
                                                                "&.Mui-selected": {
                                                                    bgcolor: "#323347",
                                                                    color: '#FFFFFF'
                                                                },
                                                                "&:hover": {
                                                                    bgcolor: "#323347",
                                                                    color: '#FFFFFF',
                                                                    transition: "all 0.5s ease"
                                                                },
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

                                                            // className="bg-warning"
                                                            >
                                                                {sub.icon}
                                                            </ListItemIcon>


                                                            <ListItemText
                                                                primary={sub.text}
                                                                sx={{
                                                                    "& .MuiListItemText-primary": {
                                                                        fontWeight: 600,
                                                                    },
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Box>
                                        </Collapse>
                                    )
                                    }
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>


                {/* Footer Sidebar */}
                <Box
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            px: props.isCollapsed ? 0 : 3,
                            mx: props.isCollapsed ? 0 : 1,
                            flex: 1,
                            my: 1,
                            color: '#64748B',
                            transition: "all 0.3s ease"


                        }}
                        variant="body2"
                    >
                        Others
                    </Typography>

                    <List sx={{
                        flex: 1, p: 0, color: '#64748B',
                        // my: 1,
                    }} className="d-flex flex-column" >
                        {footerItems.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Tooltip
                                        title={props.isCollapsed ? item.text : ""}
                                        placement="right"
                                        arrow
                                        disableHoverListener={!props.isCollapsed}
                                        slots={{
                                            transition: Fade,
                                        }}

                                        slotProps={{
                                            transition: { timeout: 600 },
                                            tooltip: {
                                                sx: {
                                                    bgcolor: "#323347",
                                                    color: "#ffffff",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    borderRadius: "8px",
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: "#323347",
                                                }
                                            }
                                        }}
                                    >
                                        {/* Menu without child */}
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            selected={location.pathname === item.path}
                                            sx={{
                                                borderRadius: 35,
                                                mb: 1,
                                                "&.Mui-selected": {
                                                    bgcolor: "#323347",
                                                    borderRadius: 35,
                                                    color: '#FFFFFF'
                                                },
                                                "&:hover": { bgcolor: "#323347", borderRadius: 35, color: '#FFFFFF', transition: "all 0.5s ease" },
                                                ...(props.isCollapsed && {
                                                    px: 0,
                                                    justifyContent: "center",
                                                }),
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
                                                    ...(props.isCollapsed && {
                                                        minWidth: 0,

                                                        "& svg": {
                                                            fontSize: 26,
                                                        },
                                                    }),
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>

                                            {!props.isCollapsed && (
                                                <ListItemText
                                                    primary={item.text}
                                                    sx={{
                                                        "& .MuiListItemText-primary": {
                                                            fontWeight: 600,
                                                        }
                                                    }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </Tooltip>


                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>

            </Box>


        </div >
    );
};

Sidebar.PropTypes = {
    isCollapsed: PropTypes.any,
    heightHeader: PropTypes.any,
};

export default Sidebar;
