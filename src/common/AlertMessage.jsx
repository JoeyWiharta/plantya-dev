import React from "react";
import PropTypes from "prop-types";
import { Alert, Collapse, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';

const AlertMessage = (props) => {
    return (
        <div
            style={{
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
            <div style={{ width: "50%", pointerEvents: "auto" }}>
                <Slide direction="down" in={props.open} >
                    <Alert
                        variant="filled"
                        severity={props.severity || "info"}
                        icon={<CancelIcon />}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "10px",
                            color: '#FAFAFA',
                            opacity: '90%',
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
            </div>
        </div>
    );
};

AlertMessage.propTypes = {
    open: PropTypes.bool,
    severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
    message: PropTypes.string,
    onClose: PropTypes.func,
};

export default AlertMessage;
