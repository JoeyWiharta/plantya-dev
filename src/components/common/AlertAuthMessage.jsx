import React from "react";
import PropTypes from "prop-types";
import { Alert, Box, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';

const AlertAuthMessage = (props) => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 40,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 2000,
                pointerEvents: "none",
            }}
        >
            <Box
                sx={{
                    width: { xs: '90%', sm: '75%', md: '60%', lg: '50%' },
                    pointerEvents: "auto"
                }}
            >
                <Slide
                    direction="down"
                    in={props.open}
                    mountOnEnter
                    unmountOnExit   
                >
                    <Alert
                        variant="filled"
                        severity={props.severity || "info"}
                        icon={<CancelIcon />}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "10px",
                            color: '#FAFAFA',
                            opacity: 0.9,
                            fontSize: '16px',
                        }}
                        action={
                            props.onClose && (
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={props.onClose}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            )
                        }
                    >
                        {props.message}
                    </Alert>
                </Slide>
            </Box>
        </Box>
    );
};

AlertAuthMessage.propTypes = {
    open: PropTypes.bool,
    severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
    message: PropTypes.string,
    onClose: PropTypes.func,
};

export default AlertAuthMessage;
