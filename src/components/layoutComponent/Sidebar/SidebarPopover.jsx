import React from "react";
import {
    Popover,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const childButtonPopoverSx = {
    py: 0.5,
    px: 1,
    transition: "all 0.3s ease",

    "&.Mui-selected, &:hover": {
        bgcolor: "transparent",
        color: "primary.main",
        borderRight: "3px solid",
        borderColor: "primary.main",
    },

    "&.Mui-selected:hover": {
        bgcolor: "transparent",
    },
};

const SidebarPopover = (props) => {
    return (
        <Popover
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
            anchorOrigin={{
                vertical: "center",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "left",
            }}
            slotProps={{
                paper: {
                    onMouseLeave: () => {
                        setTimeout(props.onClose, 100);
                    },
                    sx: {
                        p: 2,
                        minWidth: "160px",
                        ml: 1,
                    },
                },
            }}
        >
            <List
                className="sidebar-body-child-popover"
                sx={{ gap: 1 }}
            >
                {props.item.sub?.map((sub, subIndex) => (
                    <ListItemButton
                        key={sub.path || sub.text}
                        component={Link}
                        to={sub.path}
                        selected={props.location.pathname === sub.path}
                        onClick={props.onClose}
                        sx={childButtonPopoverSx}
                    >

                        <ListItemText
                            primary={sub.text}
                            sx={{
                                transition: "opacity 0.3s ease, width 0.3s ease",
                                "& .MuiListItemText-primary": {
                                    fontWeight: "600",
                                },
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Popover>
    );
};

export default SidebarPopover;
