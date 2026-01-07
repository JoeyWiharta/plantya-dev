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
    Divider
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageSpinner from "../../components/common/PageSpinner";
import axiosInstance from "../../utils/AxiosInstance";
import { useAuth } from "../../context/AuthContext";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlertAuthMessage from "../../components/common/AlertAuthMessage";
import { loginApi } from "../../utils/ListApi";

const Login = () => {
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
            username_or_email: values.username,
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
                // const response = await handleLogin(values)
                const response = await handeLoginState(values)

                login(response.data.data)
                navigate("/")

            } catch (error) {
                setShowAlert(true)
                if (error.response) {
                    setMessage(error.response.data.message);
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
                    p: { xs: 3, sm: 4 },
                    gap: 4,
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        textAlign: 'left',
                        width: '100%',
                        gap: 0.5,
                        display: "flex",
                        flexDirection: 'column',
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
                        gap: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        <Typography variant="body2" fontWeight="medium">Email or Username</Typography>
                        <TextField
                            className="auth-field"
                            variant="outlined"
                            placeholder="Email or Username"
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
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineOutlinedIcon
                                                sx={{
                                                    color: formik.values.username === "" ? 'text.secondary' : 'text.primary',
                                                    mx: 1
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        <Typography
                            variant="body2" fontWeight="medium"
                        >
                            Password
                        </Typography>
                        <TextField
                            className="auth-field"
                            variant="outlined"
                            placeholder="Password"
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
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon
                                                sx={{
                                                    color: formik.values.password === "" ? 'text.secondary' : 'text.primary',
                                                    mx: 1
                                                }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                sx={{
                                                    color: formik.values.password === "" ? 'text.secondary' : 'text.primary',
                                                    mx: 1
                                                }}
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                },
                            }}
                        />
                    </Box>

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






            {/* Main Grid */}
            {/* <Grid
                container
                size={12}
                direction="column"
                alignItems="center"
                justifyContent="center"

            >


                <Grid
                    size={12}
                    sx={{
                        textAlign: 'center',
                        mb: 5,
                    }}>
                    <Typography variant="h4" fontWeight="medium" >Welcome Back</Typography>
                    <Typography variant="h5" fontWeight="light">Let's connect your devices.</Typography>
                </Grid>

                <Grid
                    size={{ xs: 10, sm: 10, md: 8, lg: 7, xl: 7 }}
                    alignItems="center"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '420px'
                    }}>
                    <Typography variant="h4" fontWeight="medium"
                        sx={{
                            mb: 4,
                            textAlign: 'center'
                        }}>
                        Sign In
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 3,
                        }}
                    >
                        <Box>
                            <Typography variant="body2" fontWeight="medium">Email or Username</Typography>
                            <TextField
                                className="auth-field"
                                variant="outlined"
                                placeholder="Email or user id"
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
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineOutlinedIcon
                                                    sx={{
                                                        color: formik.values.username === "" ? 'text.secondary' : 'text.primary'
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
                            >
                                Password
                            </Typography>
                            <TextField
                                className="auth-field"
                                variant="outlined"
                                placeholder="Password"
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
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon
                                                    sx={{
                                                        color: formik.values.password === "" ? 'text.secondary' : 'text.primary'
                                                    }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{
                                                        color: formik.values.password === "" ? 'text.secondary' : 'text.primary'
                                                    }}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    },
                                }}
                            />
                        </Box>

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
                </Grid>

            </Grid> */}

        </React.Fragment >
    );
}

export default Login;
