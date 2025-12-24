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
import { editUser } from "../../utils/ListApi";
import FormSpinner from "../../components/common/FormSpinner";



const UserEdit = (props) => {
    // State for Loading Spinner
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [textLoading, setTextLoading] = useState("")


    // Role 
    const roleOptions = [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
        { value: "STAFF", label: "Staff" },
    ];

    useEffect(() => {
        if (props.modalEditOpen) {
            app002p03ValidInput.resetForm()
            app002p03ValidInput.setFieldValue("userId", props.app002UserEditData.user_id)
            app002p03ValidInput.setFieldValue("email", props.app002UserEditData.email)
            app002p03ValidInput.setFieldValue("name", props.app002UserEditData.name)
            app002p03ValidInput.setFieldValue("role", props.app002UserEditData.role)
        }
    }, [props.modalEditOpen])

    // Function Close, Reset, and Refresh After Submitting
    const handleClose = () => {
        props.setModalEditOpen(false);
    }

    // Validation Form
    const app002p03ValidInput = useFormik({
        initialValues:
        {
            email: "",
            name: "",
            role: "",
        },
        validationSchema: Yup.object
            ({
                email: Yup.string()
                    .required("Email is required.")
                    .matches(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        "Please enter a valid email address."
                    ),
                name: Yup.string()
                    .required("Name is required."),
                role: Yup.string().required("Role is required."),
            }),

        onSubmit: async (values, { setSubmitting }) => {
            debugger
            setSubmitting(true)
            setLoadingSpinner(true)
            setTextLoading("Processing...")
            await EditUserAction(values)
            setSubmitting(false)
        },
    });

    const EditUserAction = useCallback(async (param) => {
        try {
            debugger
            const response = await editUser(
                param.userId,
                {
                    email: param.email,
                    name: param.name,
                    role: param.role
                })
            if (response.status === 200) {
                props.setApp002setMsg("User Has Been Successfully Updated.");
                props.setApp002setMsgStatus("success");
                props.refreshTable();
                handleClose()
            }
        } catch (error) {
            debugger
            props.setApp002setMsg(error?.response?.data?.detail || "System is Unavailable. Please Try Again Later.")
            props.setApp002setMsgStatus("error")
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
                    Update User

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
                            Update user details to ensure accurate user management
                        </DialogContentText>

                        <Box
                            component="form"
                            onSubmit={app002p03ValidInput.handleSubmit}
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
                                    User Id
                                </Typography>
                                <TextField
                                    className="auth-field"
                                    variant="outlined"
                                    name="userId"
                                    size="medium"
                                    fullWidth
                                    disabled
                                    value={app002p03ValidInput.values.userId}
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
                                    Email
                                </Typography>
                                <TextField
                                    className="auth-field"
                                    variant="outlined"
                                    placeholder="Email"
                                    name="email"
                                    size="medium"
                                    fullWidth
                                    value={app002p03ValidInput.values.email}
                                    onChange={app002p03ValidInput.handleChange}
                                    onBlur={app002p03ValidInput.handleBlur}
                                    error={app002p03ValidInput.touched.email && Boolean(app002p03ValidInput.errors.email)}
                                    helperText={app002p03ValidInput.touched.email && app002p03ValidInput.errors.email}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineOutlinedIcon
                                                        sx={{
                                                            color: app002p03ValidInput.values.email === "" ? 'text.secondary' : 'text.primary'
                                                        }}
                                                    />
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
                                    Name
                                </Typography>
                                <TextField
                                    className="auth-field"
                                    placeholder="Name"
                                    name="name"
                                    size="medium"
                                    fullWidth
                                    value={app002p03ValidInput.values.name}
                                    onChange={app002p03ValidInput.handleChange}
                                    onBlur={app002p03ValidInput.handleBlur}
                                    error={app002p03ValidInput.touched.name && Boolean(app002p03ValidInput.errors.name)}
                                    helperText={app002p03ValidInput.touched.name && app002p03ValidInput.errors.name}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon
                                                        sx={{
                                                            color: app002p03ValidInput.values.name === "" ? 'text.secondary' : 'text.primary'
                                                        }} />
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
                                    Role
                                </Typography>

                                <Autocomplete
                                    fullWidth
                                    options={roleOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={roleOptions.find(opt => opt.value === app002p03ValidInput.values.role) || null}
                                    onChange={(event, newValue) => { app002p03ValidInput.setFieldValue('role', newValue ? newValue.value : '') }}
                                    onBlur={() => app002p03ValidInput.handleBlur('role')}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="auth-field"
                                            placeholder="Role"
                                            variant="outlined"
                                            name="role"
                                            error={app002p03ValidInput.touched.role && Boolean(app002p03ValidInput.errors.role)}
                                            helperText={app002p03ValidInput.touched.role && app002p03ValidInput.errors.role}
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AdminPanelSettingsIcon
                                                                fontSize="small"
                                                                sx={{ color: 'text.secondary' }}
                                                            />
                                                            {params.InputProps.startAdornment}
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    )}
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

UserEdit.propTypes = {
    modalEditOpen: PropTypes.any,
    setModalEditOpen: PropTypes.any,
    refreshTable: PropTypes.any,
    app002Msg: PropTypes.any,
    setApp002setMsg: PropTypes.any,
    app002MsgStatus: PropTypes.any,
    setApp002setMsgStatus: PropTypes.any,
    app002UserEditData: PropTypes.any,
};

export default UserEdit