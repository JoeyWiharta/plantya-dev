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
    IconButton,
    Stack
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageSpinner from "../../components/common/PageSpinner";
import AlertAuthMessage from "../../components/common/AlertAuthMessage";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from '@mui/material/styles';
import { loginApi } from "../../utils/ListApi";
import Icon from '@mdi/react';
import { mdiEmailOutline, mdiLockOutline, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

const Login = () => {
    const theme = useTheme();
    const { login } = useAuth();
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState("");
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    // Function Handle Login
    const handleLogin = async (values) => {
        debugger
        const response = await loginApi({
            user_id_or_email: values.username,
            password: values.password
        })
        debugger
        return response
    }

    // Login with state
    const usrn = "Test"
    const pass = 1234
    const handeLoginState = () => {
        const { username, password } = formik.values
        if (username === usrn && password == pass) {
            login({
                username: usrn,
                password: pass,
                role: 'Admin'
            })
            navigate("/")
        } else {
            formik.setErrors({
                username: "Username atau password salah",
                password: "Username atau password salah",
            });

            formik.resetForm();
        }
    }



    // Validation Form
    const formik = useFormik({
        initialValues:
        {
            username: "",
            password: "",
        },
        validationSchema: Yup.object
            ({
                username: Yup.string().required("Email or Username is required."),
                password: Yup.string().required("Password is required."),
            }),

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            // Default state and submit form
            document.activeElement.blur();
            setSubmitting(true)
            setLoadingSpinner(true);
            setShowAlert(false)
            setMessage("");

            try {
                debugger
                const response = await handleLogin(values)
                // const response = await handeLoginState(values)

                login(response.data.data)
                navigate("/")

            } catch (error) {
                debugger
                setShowAlert(true)
                if (error.response) {
                    setMessage(error.response.data.detail);
                } else {
                    setMessage("System is Unavailable. Please Try Again Later.");
                }

            } finally {
                setSubmitting(false);
                setLoadingSpinner(false);
                resetForm()

                setTimeout(() => {
                    setShowAlert(false);
                    setMessage("");
                }, 3000);
            }
        },
    });




    return (
        <React.Fragment>
            <PageSpinner
                open={loadingSpinner}
                text="Processing..."
            />

            <AlertAuthMessage
                open={showAlert}
                severity="error"
                message={message}
                onClose={() => setShowAlert(false)}
            />

            {/* Main Container */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    px: { xs: 1, sm: 2 },
                    py: { xs: 1, sm: 2 },
                    gap: 3,
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        textAlign: 'left',
                        width: '100%',
                        display: "flex",
                        flexDirection: 'column',
                        mb: 2
                    }}
                >
                    <Typography variant="h5" fontWeight="medium" >Welcome Back</Typography>
                    <Typography variant="body1" fontWeight="light" color="secondary">Please enter your details to access the dashboard.</Typography>
                </Box>

                {/* BODY (Form Container) */}
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 4,
                    }}
                >
                    <Stack
                        sx={{
                            display: 'flex',
                            gap: 1
                        }}
                    >
                        {/* <Typography variant="body2">Email or User ID</Typography> */}
                        <TextField
                            className="auth-field"
                            variant="outlined"
                            label="Email or User ID"
                            placeholder="Enter your email or user id"
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
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon
                                                path={mdiEmailOutline}
                                                size={1}
                                                color={
                                                    formik.values.username === "" ? theme.palette.text.secondaryLight : theme.palette.text.primary
                                                }
                                                className="mx-2"
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Stack>

                    <Stack
                        sx={{
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        {/* <Typography variant="body2">Password</Typography> */}
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
                                    autoComplete: 'off',
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon
                                                path={mdiLockOutline}
                                                size={1}
                                                color={
                                                    formik.values.password === "" ? theme.palette.text.secondaryLight : theme.palette.text.primary
                                                }
                                                className="mx-2"
                                            />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{
                                                    color: formik.values.password === "" ? theme.palette.text.secondaryLight : theme.palette.text.primary,
                                                    mr: 0.5,
                                                }}
                                            >
                                                <Icon
                                                    path={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
                                                    size={1}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                },
                            }}
                        />
                    </Stack>

                    <Button
                        type="submit"
                        variant="outlined"
                        size="large"
                        fullWidth
                        className="auth-button"
                        sx={{
                            mt: 1,
                            minHeight: 56
                        }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Processing..." : "Login"}
                    </Button>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 1, width: '90%' }}>
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

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <Typography
                                variant="body2"
                            >
                                Don't have an account?
                                <Button
                                    component={Link}
                                    to="/register"
                                    className="linkto-button"
                                >
                                    Sign Up
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </React.Fragment >
    );
}

export default Login;
