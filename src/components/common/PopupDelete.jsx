import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, Typography, Box, Backdrop, Stack, DialogActions, Button, DialogTitle, DialogContentText } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorIcon from '@mui/icons-material/Error';
import FormSpinner from "./FormSpinner";

const PopupDelete = (props) => {

    const handleDelete = () => {
        if (props.onDeleteClick) {
            props.onDeleteClick()
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.modalDeleteOpen}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') return;
                    props.modalDeleteClose
                }}
                fullWidth={true}
                maxWidth={"sm"}
                sx={{
                    '& .MuiDialog-paper': {
                        bgcolor: 'background.default',
                        borderRadius: "50px"
                    }
                }}
            >
                <FormSpinner
                    open={props.loadingDelete}
                    text={'Processing...'}
                />
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // bgcolor: 'red'
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
                        // bgcolor: 'blue'
                    }}
                >
                    <Stack
                        spacing={1}
                        sx={{
                            p: 0,
                        }}>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}>
                            <DialogContentText
                                textAlign={"center"}
                                variant="h6"
                                sx={{
                                    color: 'text.primary',
                                }}>
                                Are you sure you want to continue?
                            </DialogContentText>

                            <DialogContentText
                                textAlign={"center"}
                                variant="body2"
                                sx={{
                                    color: 'text.primary',
                                    // bgcolor: 'grey'

                                }}>
                                Deleted data will not be permanently deleted immediately and can still be restored via the data archive menu
                            </DialogContentText>
                        </Box>


                        <Box>
                            <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 0, px: 10, mt: 4 }}  >
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
                                    onClick={props.modalDeleteClose}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    type="submit"
                                    color="error"
                                    variant="contained"
                                    fullWidth
                                    onClick={handleDelete}

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
                        </Box>

                    </Stack>
                </DialogContent>




            </Dialog>
        </React.Fragment>
    );
};

PopupDelete.propTypes = {
    modalDeleteOpen: PropTypes.bool,
    modalDeleteClose: PropTypes.any,
    loadingDelete: PropTypes.any,
    onDelete: PropTypes.any,
};

export default PopupDelete;
