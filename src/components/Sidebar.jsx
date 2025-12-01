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
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { appMenuStructure } from "../routes/Index";


const Sidebar = (props) => {
    const location = useLocation();
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverParentIndex, setPopoverParentIndex] = useState(null);

    // Mapping Menu Main and Footer dari index.jsx
    const menuItems = useMemo(() =>
        appMenuStructure.filter(item => item.section === "main"),
        [appMenuStructure]
    )

    const footerItems = useMemo(() =>
        appMenuStructure.filter(item => item.section === "footer"),
        [appMenuStructure]
    )

    useEffect(() => {
        console.log(menuItems)
        console.log(footerItems)
    }, [menuItems, footerItems])

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
        debugger
        handleClosePopover()
        setOpenMenuIndex(null)
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
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                // overflow: "hidden",
                backgroundColor: "#16181A",
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
                    borderBottom: "2px solid #383B42",
                }}
            // className="bg-info"
            >
                <img
                    src={props.isCollapsed ? "/SmallIcon.png" : "/BaseLogo.png"}
                    alt="Logo"
                    style={{
                        height: props.isCollapsed ? 30 : 40,
                        width: props.isCollapsed ? 30 : 'auto',
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
                        borderBottom: "2px solid #383B42",
                    }}
                // className="bg-success"
                >
                    <Typography
                        sx={{
                            px: props.isCollapsed ? 0 : 3,
                            mx: props.isCollapsed ? 0 : 1,
                            flex: 1,
                            my: 1,
                            color: '#383B42',
                            transition: "all 0.5s ease"


                        }}
                        variant="body2"
                    // className="bg-warning"
                    >
                        MAIN
                    </Typography>

                    <List
                        className="d-flex flex-column"
                        sx={{
                            flex: 1, p: 0, color: '#383B42',
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
                                                    bgcolor: "#1F1F1F",
                                                    color: '#FAFAFA',
                                                    fontSize: '1rem'
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: '#1F1F1F',
                                                }
                                            },
                                            transition: { timeout: 500 },
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
                                                    bgcolor: "#1F1F1F",
                                                    borderRadius: 35,
                                                    color: '#FAFAFA'
                                                },
                                                "&:hover": {
                                                    bgcolor: "#1F1F1F",
                                                    borderRadius: 35,
                                                    color: '#FAFAFA',
                                                    transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                },
                                                "&.Mui-selected:hover": {
                                                    bgcolor: "#1F1F1F", // Pastikan warnanya tetap sama
                                                    color: '#FAFAFA',
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
                                                        opacity: props.isCollapsed ? 0 : 1,
                                                        transition: "opacity 0.4s ease-in-out",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
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
                                                        transition: "transform 0.4s ease-in-out",
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
                                                        bgcolor: "#16181A",
                                                        borderRadius: 3,
                                                        p: 1,
                                                        border: "2px solid #383B42",
                                                        minWidth: '160px',
                                                        ml: 1,
                                                        overflow: 'visible',
                                                        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"
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
                                                                bgcolor: "#1F1F1F",
                                                                color: '#FAFAFA'
                                                            },
                                                            "&:hover": {
                                                                bgcolor: "#1F1F1F",
                                                                color: '#FAFAFA',
                                                                transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                            },
                                                            "&.Mui-selected:hover": {
                                                                bgcolor: "#1F1F1F", // Pastikan warnanya tetap sama
                                                                color: '#FAFAFA',
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
                                        <Collapse in={openMenuIndex === index} timeout={"auto"} unmountOnExit>
                                            <Box sx={{ mb: 1 }}>
                                                <List component="div" disablePadding
                                                    sx={{
                                                        width: '80%',
                                                        ml: '20%',
                                                        borderLeft: '2px solid #383B42',
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
                                                                    bgcolor: "#1F1F1F",
                                                                    color: '#FAFAFA'
                                                                },
                                                                "&:hover": {
                                                                    bgcolor: "#1F1F1F",
                                                                    color: '#FAFAFA',
                                                                    transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                                },
                                                                "&.Mui-selected:hover": {
                                                                    bgcolor: "#1F1F1F", // Pastikan warnanya tetap sama
                                                                    color: '#FAFAFA',
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
                // className="bg-warning"
                >
                    <Typography
                        sx={{
                            px: props.isCollapsed ? 0 : 3,
                            mx: props.isCollapsed ? -1 : 1,
                            flex: 1,
                            my: 1,
                            color: '#383B42',
                            transition: "all 0.5s ease-in-out",
                            width: "auto"


                        }}
                        variant="body2"
                    // className="bg-success"
                    >
                        OTHERS
                    </Typography>

                    <List
                        sx={{
                            flex: 1,
                            p: 0,
                            color: '#383B42',
                        }}
                        className="d-flex flex-column"
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
                                            transition: { timeout: 500 },
                                            tooltip: {
                                                sx: {
                                                    bgcolor: "#16181A",
                                                    color: "#FAFAFA",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    borderRadius: "8px",
                                                }
                                            },
                                            arrow: {
                                                sx: {
                                                    color: "#16181A",
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
                                                    bgcolor: "#1F1F1F",
                                                    borderRadius: 35,
                                                    color: '#FAFAFA'
                                                },
                                                "&:hover":
                                                {
                                                    bgcolor: "#1F1F1F",
                                                    borderRadius: 35,
                                                    color: '#FAFAFA',
                                                    transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"
                                                },
                                                "&.Mui-selected:hover": {
                                                    bgcolor: "#1F1F1F", // Pastikan warnanya tetap sama
                                                    color: '#FAFAFA',
                                                },
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
                                                        opacity: props.isCollapsed ? 0 : 1,
                                                        // transform: props.isCollapsed ? "translateX(-10px)" : "translateX(0)",
                                                        transition: "opacity 0.4s ease-in-out",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
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


        </Box >
    );
};

Sidebar.PropTypes = {
    isCollapsed: PropTypes.any,
    heightHeader: PropTypes.any,
};

export default Sidebar;
