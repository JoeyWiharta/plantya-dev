import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    Grid,
    Divider,
    Stack,
    IconButton
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageSpinner from "../../components/common/PageSpinner";
import {
    AccountCircleIcon,
    MailOutlineOutlinedIcon,
    LockOutlinedIcon,
    VisibilityOutlinedIcon,
    VisibilityOff,

} from '@/assets/Icon/muiIcon';
import { registerApi } from "../../utils/ListApi";
import PopupModal from "../../components/common/PopupModal";

const Register = () => {
    const navigate = useNavigate()

    const [textLoading, setTextLoading] = useState("")
    const [typeModal, setTypeModal] = useState("");
    const [messageModal, setMessageModal] = useState("");
    const [headerMessageModal, setHeaderMessageModal] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const resetModalState = () => {
        setTypeModal("");
        setHeaderMessageModal("");
        setMessageModal("");
    };

    const handleRegister = async (values) => {
        const response = await registerApi({
            name: values.username,
            email: values.email,
            password: values.password,
            confirm_password: values.rePassword
        })
        return response;
    };


    // Validation Form
    const formik = useFormik({
        initialValues:
        {
            username: "",
            email: "",
            password: "",
            rePassword: "",
        },
        validationSchema: Yup.object
            ({
                username: Yup.string()
                    .required("Name is required.")
                    .min(4, "Name must be at least 4 characters.")
                    .max(20, "Name must not exceed 20 characters.")
                    .matches(
                        /^[A-Za-z\s]+$/,
                        "Name can only contain letters and spaces."
                    ),
                email: Yup.string()
                    .required("Email is required.")
                    .matches(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        "Please enter a valid email address."
                    ),
                password: Yup.string()
                    .required("Password is required.")
                    .min(8, "Password must be at least 8 characters.")
                    .max(64, "Password must not exceed 64 characters.")
                    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
                    .matches(/[0-9]/, "Password must contain at least one number."),
                rePassword: Yup.string()
                    .required("Please confirm your password.")
                    .oneOf([Yup.ref("password"), null], "Password do not match"),
            }),

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            debugger
            setSubmitting(true);
            setLoadingSpinner(true);
            setTextLoading("Processing...");

            try {
                const response = await handleRegister(values)

                setLoadingSpinner(false)
                setTextLoading("")
                setShowModal(true)
                setTypeModal("success");
                setHeaderMessageModal("Register Success!");
                setMessageModal(response?.data?.message || "");
                resetForm();
                setTimeout(() => {
                    setShowModal(false);
                    setLoadingSpinner(true);
                    setTextLoading("Redirect to login...");

                    setTimeout(() => {
                        resetModalState();
                        setLoadingSpinner(false);
                        setTextLoading("");
                        navigate("/login");
                    }, 1000);
                }, 3000);
            } catch (error) {
                setLoadingSpinner(false);
                setTextLoading("");
                setShowModal(true);
                setTypeModal("error");
                setHeaderMessageModal("Register Failed!");
                setMessageModal(error?.response?.data?.detail || "System is Unavailable. Please Try Again Later.");
                setTimeout(() => {
                    setShowModal(false);
                    resetModalState();
                }, 3000);
            }
            finally {
                setSubmitting(false);
                setShowPassword(false);
                setShowRePassword(false);
            }
        },
    });

    return (
        <React.Fragment>
            <PageSpinner
                open={loadingSpinner}
                text={textLoading}
            />

            <PopupModal
                open={showModal}
                type={typeModal}
                headerMessageModal={headerMessageModal}
                messageModal={messageModal}
                onClose={() => setShowModal(false)}
            />

            {/* Main Container */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    p: { xs: 1, sm: 2 },
                    gap: 5,
                }}
            >
                <Stack direction={"column"} textAlign={"left"} justifyContent={"center"} width={"100%"}>
                    <Typography variant="h2" fontWeight="medium" >Create Account</Typography>
                    <Typography variant="h6" fontWeight="light" color="text.primary">Join us to start monitoring your plantation.</Typography>
                </Stack>

                {/* BODY (Form Container) */}
                <Stack width={"100%"}>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 5,
                        }}
                    >

                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: 4,
                            }}
                        >
                            <Stack>
                                <TextField
                                    className="auth-field"
                                    label="Name"
                                    placeholder="Enter your name"
                                    name="username"
                                    size="medium"
                                    fullWidth
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                            autoCorrect: "off",
                                            autoCapitalize: "none",
                                            startAdornment: (
                                                <InputAdornment position="start" >
                                                    <AccountCircleIcon
                                                        sx={{
                                                            mx: 0.5,
                                                            color: formik.values.username === "" ? 'text.secondary' : 'text.primary'
                                                        }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Stack>

                            <Stack >
                                <TextField
                                    className="auth-field"
                                    label="Email"
                                    variant="outlined"
                                    placeholder="Enter your email address"
                                    name="email"
                                    size="medium"
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                            autoCorrect: "off",
                                            autoCapitalize: "none",
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineOutlinedIcon
                                                        sx={{
                                                            mx: 0.5,
                                                            color: formik.values.email === "" ? 'text.secondary' : 'text.primary'
                                                        }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}

                                />
                            </Stack>

                            <Stack >
                                <TextField
                                    className="auth-field"
                                    variant="outlined"
                                    label="Password"
                                    placeholder="Enter your password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    size="medium"
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                            autoCorrect: "off",
                                            autoCapitalize: "none",
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon
                                                        sx={{
                                                            mx: 0.5,
                                                            color: formik.values.password === "" ? 'text.secondary' : 'text.primary'
                                                        }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        tabIndex={-1}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        sx={{
                                                            color: formik.values.password === "" ? 'text.secondary' : 'text.primary'
                                                        }}
                                                    >
                                                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        },
                                    }}
                                />
                            </Stack>

                            <Stack >
                                <TextField
                                    className="auth-field"
                                    label="Confirm Password"
                                    variant="outlined"
                                    placeholder="Confirm your password"
                                    name="rePassword"
                                    type={showRePassword ? 'text' : 'password'}
                                    size="medium"
                                    fullWidth
                                    value={formik.values.rePassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                                    helperText={formik.touched.rePassword && formik.errors.rePassword}
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                            autoCorrect: "off",
                                            autoCapitalize: "none",
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon
                                                        sx={{
                                                            mx: 0.5,
                                                            color: formik.values.rePassword === "" ? 'text.secondary' : 'text.primary'
                                                        }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        tabIndex={-1}
                                                        onClick={() => setShowRePassword(!showRePassword)}
                                                        edge="end"
                                                        sx={{
                                                            color: formik.values.rePassword === "" ? 'text.secondary' : 'text.primary'
                                                        }}
                                                    >
                                                        {showRePassword ? <VisibilityOutlinedIcon /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        },
                                    }}
                                />
                            </Stack>
                        </Box>

                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
                            <Button
                                type="submit"
                                variant="outlined"
                                size="large"
                                fullWidth
                                className="auth-button"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Processing..." : "CREATE ACCOUNT"}
                            </Button>

                            <Box sx={{ display: 'flex', alignItems: 'center', width: '90%' }}>
                                <Divider
                                    className="auth-divider"
                                    sx={{
                                        flexGrow: 1,
                                        opacity: '100%'
                                    }}
                                />
                                <Typography variant="body1" sx={{ mx: 2 }}>OR</Typography>
                                <Divider
                                    className="auth-divider"
                                    sx={{
                                        flexGrow: 1,
                                        opacity: '100%'
                                    }}
                                />
                            </Box>


                            <Typography variant="body1">
                                Already have an account?
                                <Button
                                    component={Link}
                                    to="/login"
                                    className="linkto-button"
                                >
                                    Sign In
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Box >
        </React.Fragment >
    );
};

export default Register;
