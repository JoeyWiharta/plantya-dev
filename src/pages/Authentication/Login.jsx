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
import { loginApi } from "../../utils/ListApi";
import {
    MailOutlineOutlinedIcon,
    LockOutlinedIcon,
    VisibilityOutlinedIcon,
    VisibilityOff,
} from '@/assets/Icon/muiIcon';
import { useThemeMode } from "../../context/ThemeContext";


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState("");
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async (values) => {
        debugger
        const response = await loginApi({
            user_id_or_email: values.username,
            password: values.password
        })
        debugger
        return response
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
            document.activeElement.blur();
            setSubmitting(true)
            setLoadingSpinner(true);
            setShowAlert(false)
            setMessage("");

            try {
                debugger
                const response = await handleLogin(values)
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
                    height: '100%',
                    p: { xs: 1, sm: 2 },
                    gap: 5,
                }}
            >
                <Stack direction={"column"} textAlign={"left"} justifyContent={"center"} width={"100%"}>
                    <Typography variant="h2" fontWeight="medium" >Welcome Back</Typography>
                    <Typography variant="h6" fontWeight="light" color="text.primary">Please enter your details to access the dashboard.</Typography>
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
                                    variant="outlined"
                                    placeholder="Enter your email or user id"
                                    name="username"
                                    size="medium"
                                    label="Email or User ID"
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
                                                    <MailOutlineOutlinedIcon
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
                                    variant="outlined"
                                    placeholder="Enter your password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    size="medium"
                                    label="Password"
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
                                {formik.isSubmitting ? "Processing..." : "LOGIN"}
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

                            <Typography
                                variant="body1"
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
                </Stack>
            </Box>
        </React.Fragment >
    );
}

export default Login;
