import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, Typography, Box, Backdrop, Stack, DialogActions, Button, DialogTitle, DialogContentText } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorIcon from '@mui/icons-material/Error';
import FormSpinner from "./FormSpinner";

const PopupDelete = (props) => {

    const handleClose = () => {
        props.setModalDeleteOpen(false);
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.modalDeleteOpen}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') return;
                    handleClose()
                }}
                fullWidth={props.fullWidth}
                maxWidth={props.maxWidth}
                sx={{
                    '& .MuiDialog-paper': {
                        bgcolor: 'background.default',
                        borderRadius: "50px"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ErrorIcon
                        sx={{
                            fontSize: {
                                xs: 70,
                                sm: 100,
                            },
                        }}
                        color="warning"
                    />
                </DialogTitle>

                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            p: 2,
                        }}>

                        <DialogContentText
                            textAlign={"center"}
                            variant="h6"
                            sx={{
                                color: 'text.primary'
                            }}>
                            {props.headerMessageModal}
                        </DialogContentText>

                        <DialogContentText
                            textAlign={"center"}
                            variant="body2"
                            sx={{
                                color: 'text.primary'
                            }}>
                            {props.messageModal}
                        </DialogContentText>


                        <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 0, px: 10 }}  >
                            <Button
                                color="main"
                                variant="contained"
                                fullWidth
                                sx={{
                                    minHeight: '50px',
                                    bgcolor: 'button.grey',
                                    borderRadius: '15px',
                                    '&:hover': {
                                        bgcolor: 'button.grey',
                                        opacity: 0.9,
                                    },
                                }}
                                onClick={handleClose}
                            >
                                CANCEL
                            </Button>
                            <Button
                                type="submit"
                                color="error"
                                variant="contained"
                                fullWidth

                                sx={{
                                    minHeight: '50px',
                                    borderRadius: '15px',
                                    '&:hover': {
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                DELETE
                            </Button>
                        </DialogActions>

                    </Stack>
                </DialogContent>




            </Dialog>
        </React.Fragment>
    );
};

PopupDelete.propTypes = {
    modalDeleteOpen: PropTypes.bool,
    headerMessageModal: PropTypes.string,
    messageModal: PropTypes.string,
};

export default PopupDelete;
