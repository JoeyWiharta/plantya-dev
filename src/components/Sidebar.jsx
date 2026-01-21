import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Collapse,
    Typography,
    Tooltip,
    Popover,
    Fade
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import MenuRoutes from "../routes/MenuRoutes";
import Icon from '@mdi/react';
import SmallIcon from "../assets/SmallIcon.png"
import BaseLogo from "../assets/BaseLogo.png"




const Sidebar = (props) => {
    const location = useLocation();
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverParentIndex, setPopoverParentIndex] = useState(null);

    // Mapping Menu Main and Footer dari index.jsx
    const menuItems = useMemo(() =>
        MenuRoutes.filter(item => item.section === "main"),
        [MenuRoutes]
    )

    const footerItems = useMemo(() =>
        MenuRoutes.filter(item => item.section === "footer"),
        [MenuRoutes]
    )

    // Function Sidebar Expand
    const handleToggleMenu = (index) => {
        setOpenMenuIndex(prev => prev === index ? null : index)
    }

    // Function Sidebar Collapse
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

    // Expand Parent Jika Child Menu Active Sesuai Path
    useEffect(() => {
        if (props.isCollapsed && !props.mobileOpen) {
            return;
        }

        handleClosePopover()
        setOpenMenuIndex(null)

        menuItems.forEach((item, index) => {
            if (item.sub) {
                let isMatch = item.sub.some(sub => sub.path === location.pathname);
                if (isMatch) {
                    setOpenMenuIndex(index);
                }
            }
        });
    }, [location.pathname, props.isCollapsed, props.isMobileOpen, menuItems]);

    useEffect(() => {
        const disableBackgroundScroll = () => {
            document.body.style.overflow = 'hidden';
        };

        const enableBackgroundScroll = () => {
            document.body.style.overflow = 'unset';
        };

        if (props.isMobileOpen) {
            disableBackgroundScroll();
        } else {
            enableBackgroundScroll();
        }

        return () => {
            enableBackgroundScroll();
        };
    }, [props.isMobileOpen]);


    return (
        // Container 
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                transition: "width 0.3s ease",
            }}
        >

            {/* Header Sidebar */}
            <Box
                sx={{
                    minHeight: props.heightHeader,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid",
                    borderBottomColor: 'action.active',
                    transition: "all 0.3s ease",
                }}
            >
                <img
                    src={props.isCollapsed ? SmallIcon : BaseLogo}
                    alt="Logo"
                    style={{
                        height: props.isCollapsed ? 30 : 40,
                        width: props.isCollapsed ? 30 : 'auto',
                        transition: "all 0.3s ease",
                    }}
                />
            </Box>

            {/* Container Main and Footer Sidebar */}
            <Box
                sx={{
                    flex: 1,
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
                        borderBottom: "1px solid",
                        borderBottomColor: 'action.active',
                        color: 'text.secondary', /////
                    }}
                >
                    {/* Box Main Title */}
                    <Box sx={{ pt: 2, pb: 1 }}>
                        <Typography
                            sx={{
                                px: props.isCollapsed ? 0 : 5,
                                display: 'flex',
                                justifyContent: props.isCollapsed ? 'center' : 'left',
                                transition: "all 0.3s ease",
                                fontSize: '11px',
                                fontWeight: 'bold',
                            }}
                            variant="caption"
                        >
                            MAIN
                        </Typography>
                    </Box>

                    {/* Box Content List Main */}
                    <Box sx={{ py: 0 }}>
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                py: 0,
                                px: props.isCollapsed ? 2 : 1,
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
                                                        backgroundColor: "action.hover",
                                                        fontSize: '13px'
                                                    }
                                                },
                                                arrow: {
                                                    sx: {
                                                        color: 'action.hover',
                                                        fontSize: '13px'
                                                    }
                                                },
                                                transition: { timeout: 300 },
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
                                                    if (!isParent && props.isMobileOpen && props.handleMobileClose) {
                                                        debugger
                                                        props.handleMobileClose();
                                                    }
                                                }
                                                }
                                                selected={!isParent && location.pathname === item.path || props.isCollapsed && isParent && isChildSelected(item)}
                                                sx={{
                                                    borderRadius: props.isCollapsed ? '50%' : 35,
                                                    mb: 1,
                                                    transition: "all 0.3s ease",

                                                    ...(props.isCollapsed && {
                                                        px: 0,
                                                        justifyContent: "center",
                                                        borderRadius: 50,
                                                    }),


                                                    "&.Mui-selected": {
                                                        backgroundColor: "action.hover",
                                                        borderRadius: 35,
                                                        color: 'text.secondary'
                                                    },
                                                    "&:hover": {
                                                        bgcolor: "action.hover",
                                                        color: 'text.secondary',
                                                        borderRadius: 35,
                                                        transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                    },
                                                    "&.Mui-selected:hover": {
                                                        bgcolor: "action.hover",
                                                        color: 'text.secondary',
                                                    },

                                                }}
                                            >

                                                <ListItemIcon
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        color: 'inherit',
                                                        minWidth: props.isCollapsed ? 0 : 40,
                                                        mr: props.isCollapsed ? 0 : 1,
                                                    }}
                                                >
                                                    {<Icon path={item.icon} size={props.isCollapsed ? "24px" : "20px"} />}
                                                </ListItemIcon>

                                                {!props.isCollapsed && (
                                                    <ListItemText
                                                        primary={item.text}
                                                        sx={{
                                                            opacity: props.isCollapsed ? 0 : 1,
                                                            width: props.isCollapsed ? 0 : 'auto',
                                                            transition: "opacity 0.3s ease, width 0.3s ease",
                                                            overflow: "hidden",

                                                            "& .MuiListItemText-primary": {
                                                                fontWeight: "medium",
                                                                fontSize: '13px'
                                                            }
                                                        }}
                                                    />
                                                )}

                                                {isParent && !props.isCollapsed && (
                                                    <ExpandMore
                                                        sx={{
                                                            opacity: props.isCollapsed ? 0 : 1,
                                                            transform: openMenuIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                                            transition: "transform 0.3s ease, opacity 0.3s ease",
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
                                                        className: "sidebar-popover",
                                                        sx: {
                                                            p: 1,
                                                            minWidth: '160px',
                                                            ml: 1,
                                                            overflow: 'visible'
                                                        }
                                                    }
                                                }}
                                            >
                                                <List
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 1,
                                                        color: 'text.secondary' /////
                                                    }}
                                                >
                                                    {item.sub?.map((sub, subIndex) => (
                                                        <ListItemButton
                                                            key={subIndex}
                                                            component={Link}
                                                            to={sub.path}
                                                            selected={location.pathname === sub.path}
                                                            onClick={handleClosePopover}
                                                            sx={{
                                                                borderRadius: 35,
                                                                pl: 0,
                                                                "&.Mui-selected": {
                                                                    bgcolor: "action.hover",
                                                                    color: 'text.secondary'
                                                                },
                                                                "&:hover": {
                                                                    bgcolor: "action.hover",
                                                                    color: 'text.secondary',
                                                                    transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                                },
                                                                "&.Mui-selected:hover": {
                                                                    bgcolor: "action.hover",
                                                                    color: 'text.secondary'
                                                                },
                                                            }}
                                                        >
                                                            <ListItemIcon
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    color: 'inherit',
                                                                }}
                                                            >
                                                                {<Icon path={sub.icon} size={"24px"} />}
                                                            </ListItemIcon>

                                                            <ListItemText
                                                                primary={sub.text}
                                                                sx={{
                                                                    transition: "opacity 0.3s ease, width 0.3s ease",
                                                                    "& .MuiListItemText-primary": {
                                                                        fontWeight: "medium",
                                                                        fontSize: '13px'
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
                                            <Collapse in={openMenuIndex === index} timeout={"auto"} unmountOnExit>
                                                <Box sx={{ mb: 1 }}>
                                                    <List component="div" disablePadding
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 1,
                                                            width: '80%',
                                                            ml: '20%',
                                                            borderLeft: '1px solid',
                                                            borderLeftColor: 'action.active',
                                                            pl: 1,
                                                        }}
                                                    >
                                                        {item.sub.map((sub, subIndex) => (
                                                            <ListItemButton
                                                                key={subIndex}
                                                                component={Link}
                                                                to={sub.path}
                                                                selected={location.pathname === sub.path}
                                                                onClick={() => {
                                                                    if (props.isMobileOpen && props.handleMobileClose) {
                                                                        props.handleMobileClose();
                                                                    }
                                                                }}
                                                                sx={{
                                                                    borderRadius: 35,
                                                                    px: 0,
                                                                    "&.Mui-selected": {
                                                                        bgcolor: "action.hover",
                                                                        color: 'text.secondary'
                                                                    },
                                                                    "&:hover": {
                                                                        bgcolor: "action.hover",
                                                                        color: 'text.secondary',
                                                                    },
                                                                    "&.Mui-selected:hover": {
                                                                        bgcolor: "action.hover",
                                                                        color: 'text.secondary'
                                                                    },
                                                                }}
                                                            >
                                                                <ListItemIcon
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        color: 'inherit',
                                                                        minWidth: props.isCollapsed ? 0 : 40,
                                                                        mr: props.isCollapsed ? 0 : 1,

                                                                    }}
                                                                >
                                                                    {<Icon path={sub.icon} size={props.isCollapsed ? "24px" : "20px"} />}
                                                                </ListItemIcon>


                                                                <ListItemText
                                                                    primary={sub.text}
                                                                    sx={{
                                                                        opacity: props.isCollapsed ? 0 : 1,
                                                                        width: props.isCollapsed ? 0 : 'auto',
                                                                        transition: "opacity 0.3s ease, width 0.3s ease",
                                                                        "& .MuiListItemText-primary": {
                                                                            fontWeight: "medium",
                                                                            fontSize: '13px'
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
                </Box>


                {/* Footer Sidebar */}
                <Box
                    sx={{
                        color: 'text.secondary', /////
                    }}
                >
                    <Box sx={{ pt: 2, pb: 1 }}>
                        <Typography
                            sx={{
                                px: props.isCollapsed ? 0 : 5,
                                display: 'flex',
                                justifyContent: props.isCollapsed ? 'center' : 'left',
                                transition: "all 0.3s ease",
                                fontSize: '11px',
                                fontWeight: 'bold',
                            }}
                            variant="caption"
                        >
                            OTHERS
                        </Typography>
                    </Box>

                    <Box sx={{ p: 0 }}>
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                py: 0,
                                px: props.isCollapsed ? 2 : 1,
                            }}
                        >
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
                                                tooltip: {
                                                    sx: {
                                                        backgroundColor: "action.hover",
                                                        fontSize: '13px'
                                                    }
                                                },
                                                arrow: {
                                                    sx: {
                                                        color: 'action.hover',
                                                    }
                                                },
                                                transition: { timeout: 300 },
                                            }}
                                        >
                                            {/* Menu Footer */}
                                            <ListItemButton
                                                component={Link}
                                                to={item.path}
                                                selected={location.pathname === item.path}
                                                onClick={() => {
                                                    if (props.isMobileOpen && props.handleMobileClose) {
                                                        props.handleMobileClose();
                                                    }
                                                }}
                                                sx={{
                                                    borderRadius: 35,
                                                    mb: 1,
                                                    transition: "all 0.3s ease",

                                                    ...(props.isCollapsed && {
                                                        px: 0,
                                                        justifyContent: "center",
                                                        borderRadius: '50%',
                                                    }),

                                                    "&.Mui-selected": {
                                                        bgcolor: "action.hover",
                                                        borderRadius: 35,
                                                        color: 'text.secondary'
                                                    },
                                                    "&:hover":
                                                    {
                                                        bgcolor: "action.hover",
                                                        borderRadius: 35,
                                                        color: 'text.secondary',
                                                        transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                    },
                                                    "&.Mui-selected:hover": {
                                                        bgcolor: "action.hover",
                                                        color: 'text.secondary',
                                                    },

                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        color: 'inherit',
                                                        minWidth: props.isCollapsed ? 0 : 40,
                                                        mr: props.isCollapsed ? 0 : 1,
                                                    }}
                                                >
                                                    {<Icon path={item.icon} size={props.isCollapsed ? "24px" : "20px"} />}
                                                </ListItemIcon>

                                                {!props.isCollapsed && (
                                                    <ListItemText
                                                        primary={item.text}
                                                        sx={{
                                                            opacity: props.isCollapsed ? 0 : 1,
                                                            width: props.isCollapsed ? 0 : 'auto',
                                                            transition: "opacity 0.3s ease, width 0.3s ease",
                                                            overflow: "hidden",
                                                            "& .MuiListItemText-primary": {
                                                                fontWeight: "medium",
                                                                fontSize: '13px'
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

            </Box>


        </Box >
    );
};

Sidebar.PropTypes = {
    isCollapsed: PropTypes.any,
    heightHeader: PropTypes.any,
    userData: PropTypes.any,
    isMobileOpen: PropTypes.any,
    handleMobileClose: PropTypes.any,
};

export default Sidebar;