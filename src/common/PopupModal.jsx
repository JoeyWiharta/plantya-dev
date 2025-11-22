import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from '@mui/icons-material/Cancel';

const PopupModal = (props) => {
    const isSuccess = props.type === "success";

    return (
        <>
            {props.open && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backdropFilter: "blur(8px)",
                        zIndex: 1200,
                        transition: "all 0.3s ease",
                    }}
                />
            )}

            {/* MODAL */}
            <Dialog
                open={props.open}
                onClose={props.onClose}
                maxWidth="xs"
                fullWidth
                sx={{
                    zIndex: 1300,
                    "& .MuiDialog-paper": {
                        borderRadius: "30px",
                        backgroundColor: "#0F1624",
                        textAlign: "center",
                        padding: 2,
                    },
                }}
            >
                <DialogContent>
                    {/* Icon */}
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        {isSuccess ? (
                            <CheckCircleRoundedIcon sx={{ fontSize: 100, color: "#8E83ED" }} />
                        ) : (
                            <CancelIcon sx={{ fontSize: 100, color: "#f44336" }} />
                        )}
                    </Box>

                    {/* Header Message */}
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#fff" }}>
                        {props.headerMessageModal}
                    </Typography>

                    {/* Detail Message */}
                    <Typography variant="body1" sx={{ mb: 2, color: "#ccc" }}>
                        {props.messageModal}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

PopupModal.propTypes = {
    open: PropTypes.bool,
    type: PropTypes.oneOf(["success", "error"]),
    headerMessageModal: PropTypes.string,
    messageModal: PropTypes.string,
};

PopupModal.defaultProps = {
    type: "success",
};

export default PopupModal;
