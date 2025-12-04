import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, Typography, Box, Backdrop } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from '@mui/icons-material/Cancel';

const PopupModal = (props) => {
    const isSuccess = props.type === "success";

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                maxWidth="xs"
                fullWidth
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(8px)',
                    },
                    timeout: 300,
                }}
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: "30px",
                        backgroundColor: "#121314",
                        textAlign: "center",
                        padding: 2,
                    },
                }}
            >
                <DialogContent>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        {isSuccess ? (
                            <CheckCircleRoundedIcon
                                sx={{
                                    fontSize: {
                                        xs: 70,
                                        sm: 100,
                                    },
                                    color: "#8E83ED"
                                }}
                            />
                        ) : (
                            <CancelIcon
                                sx={{
                                    fontSize: {
                                        xs: 70,
                                        sm: 100,
                                    },
                                    color: "#f44336"
                                }}
                            />
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
