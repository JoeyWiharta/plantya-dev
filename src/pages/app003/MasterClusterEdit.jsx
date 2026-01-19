import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Stack, Box, InputAdornment, Select, Typography, Autocomplete } from "@mui/material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { editCluster } from "../../utils/ListApi";
import FormSpinner from "../../components/common/FormSpinner";



const MasterClusterEdit = (props) => {
    // State for Loading Spinner
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [textLoading, setTextLoading] = useState("")

    useEffect(() => {
        if (props.modalEditOpen) {
            app003p03ValidInput.resetForm()
            app003p03ValidInput.setFieldValue("clusterId", props.app003ClusterEditData.cluster_id)
            app003p03ValidInput.setFieldValue("clusterName", props.app003ClusterEditData.cluster_name)

        }
    }, [props.modalEditOpen])

    // Function Close, Reset, and Refresh After Submitting
    const handleClose = () => {
        props.setModalEditOpen(false);
    }

    // Validation Form
    const app003p03ValidInput = useFormik({
        initialValues:
        {
            clusterName: "",
        },
        validationSchema: Yup.object
            ({
                clusterName: Yup.string().required("Cluster Name is required."),
            }),

        onSubmit: async (values, { setSubmitting }) => {
            debugger
            setSubmitting(true)
            setLoadingSpinner(true)
            setTextLoading("Processing...")
            await EditClusterAction(values)
            setSubmitting(false)
        },
    });

    const EditClusterAction = useCallback(async (param) => {
        try {
            debugger
            const response = await editCluster(
                param.clusterId,
                {
                    cluster_name: param.clusterName,
                })
            if (response.status === 200) {
                props.setApp003setMsg("Cluster Has Been Successfully Updated.");
                props.setApp003setMsgStatus("success");
                props.refreshTable();
                handleClose()
            }
        } catch (error) {
            debugger
            props.setApp003setMsg(error?.response?.data?.detail || "System is Unavailable. Please Try Again Later.")
            props.setApp003setMsgStatus("error")
        } finally {
            setLoadingSpinner(false)
            setTextLoading("")
        }
    })

    return (
        <React.Fragment>
            <Dialog
                open={props.modalEditOpen}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') return;
                    handleClose()
                }}
                fullWidth={true}
                maxWidth={"xs"}
                scroll={"paper"}
                sx={{
                    '& .MuiDialog-paper': {
                        bgcolor: 'background.default',
                        borderRadius: 2
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pr: 1,
                    }}
                >
                    Update Cluster

                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: 'text.secondary'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers={scroll === "paper"}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        scrollbarWidth: 'none',
                        '-ms-overflow-style': 'none',
                    }}
                >
                    <Stack
                        spacing={4}
                        sx={{
                            p: 4
                        }}>

                        <FormSpinner
                            open={loadingSpinner}
                            text={textLoading}
                        />

                        <DialogContentText
                            textAlign={"center"}
                            sx={{
                                color: 'text.primary'
                            }}>
                            Update cluster details to ensure accurate cluster management
                        </DialogContentText>

                        <Box
                            component="form"
                            onSubmit={app003p03ValidInput.handleSubmit}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: 3,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body2" fontWeight="medium"
                                    mb={1}
                                >
                                    Cluster Id
                                </Typography>
                                <TextField
                                    className="auth-field"
                                    variant="outlined"
                                    name="clusterId"
                                    size="medium"
                                    fullWidth
                                    disabled
                                    value={app003p03ValidInput.values.clusterId}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon sx={{ color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="body2" fontWeight="medium"
                                    mb={1}
                                >
                                    Cluster Name
                                </Typography>
                                <TextField
                                    className="auth-field"
                                    variant="outlined"
                                    placeholder="Cluster Name"
                                    name="clusterName"
                                    size="medium"
                                    fullWidth
                                    value={app003p03ValidInput.values.clusterName}
                                    onChange={app003p03ValidInput.handleChange}
                                    onBlur={app003p03ValidInput.handleBlur}
                                    error={app003p03ValidInput.touched.clusterName && Boolean(app003p03ValidInput.errors.clusterName)}
                                    helperText={app003p03ValidInput.touched.clusterName && app003p03ValidInput.errors.clusterName}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineOutlinedIcon
                                                        sx={{
                                                            color: app003p03ValidInput.values.clusterName === "" ? 'text.secondary' : 'text.primary'
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Box>

                            <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 0, mt: 2 }}  >
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
                                    color="success"
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
                                    UPDATE
                                </Button>
                            </DialogActions>
                        </Box>
                    </Stack>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

MasterClusterEdit.propTypes = {
    modalEditOpen: PropTypes.any,
    setModalEditOpen: PropTypes.any,
    refreshTable: PropTypes.any,
    app003Msg: PropTypes.any,
    setApp003setMsg: PropTypes.any,
    app003MsgStatus: PropTypes.any,
    setApp003setMsgStatus: PropTypes.any,
    app003ClusterEditData: PropTypes.any,
};

export default MasterClusterEdit