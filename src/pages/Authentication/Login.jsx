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
import PageLoading from "../../common/PageLoading";
import axiosInstance from "../../utils/AxiosInstance";
import { useAuth } from "../../context/AuthContext";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ListApi from "../../utils/ListApi";
import { textFieldCustom } from "../../themes/theme"
import AlertMessage from "../../common/AlertMessage";

const Login = () => {
    const { login } = useAuth();
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState("");
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    // Function Handle Login
    const handleLogin = async (values) => {
        const response = await axiosInstance().post(ListApi.auth.login, {
            username_or_email: values.username,
            password: values.password
        }, {
            withCredentials: true,
        })
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
            // misal mau munculkan error
            formik.setErrors({
                username: "Username atau password salah",
                password: "Username atau password salah",
            });

            // reset password saja
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
            setSubmitting(true)
            setLoadingSpinner(true);
            setShowAlert(false)
            setMessage("");

            try {
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
            <PageLoading
                open={loadingSpinner}
                text="Processing..."
            />

            <AlertMessage
                open={showAlert}
                severity="error"
                message={message}
                onClose={() => setShowAlert(false)}
            />

            {/* Main Grid */}
            <Grid
                container
                size={10}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >

                {/* Header Grid */}
                <Grid
                    size={12}
                    sx={{
                        textAlign: 'center',
                        mb: 5,
                        color: "#FAFAFA",
                    }}
                >
                    <Typography variant="h3" fontWeight="bold" >
                        Welcome Back!
                    </Typography>
                    <Typography variant="h5" fontWeight="light">
                        Let's connect your devices.
                    </Typography>
                </Grid>

                {/* Body and Footer Grid */}
                <Grid
                    size={{ xs: 10, sm: 10, md: 8, lg: 7, xl: 7 }}
                    alignItems="center"
                    sx={{
                        // mb: 3,
                        bgcolor: 'darkBlue',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '420px'

                    }}
                >
                    {/* Body Section */}
                    <Typography variant="h4" fontWeight="medium" color="#FAFAFA"
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
                            gap: 1.5,
                            color: "#FAFAFA"
                            // bgcolor: 'darkGreen'
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body2" fontWeight="medium"
                            >
                                Email or Username
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Email or username"
                                name="username"
                                size="medium"
                                fullWidth
                                margin="normal"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                sx={textFieldCustom}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineOutlinedIcon />
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
                                variant="outlined"
                                placeholder="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                size="medium"
                                fullWidth
                                margin="normal"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                sx={textFieldCustom}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
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
                            sx={{
                                mt: 1,
                                minHeight: 56,
                                borderColor: '#16181A',
                                color: 'white',
                                borderWidth: '2px',
                                bgcolor: '#24427D',
                                borderRadius: '15px',
                                "&:hover": {
                                    backgroundColor: "#1976D2",
                                    border: "2px solid #1976D2",
                                    transition: "0.7s ease",
                                }
                            }}
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Processing..." : "Login"}
                        </Button>

                        {/* Footer Section */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // bgcolor: 'grey'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 1, width: '90%' }}>
                                <Divider
                                    sx={{
                                        flexGrow: 1,
                                        border: 'none',
                                        borderBottom: '1px solid #FAFAFA',
                                        opacity: '70%'
                                    }}
                                />
                                <Typography variant="body1" sx={{ mx: 2, color: '#FAFAFA' }}>OR</Typography>
                                <Divider
                                    sx={{
                                        flexGrow: 1,
                                        border: 'none',
                                        borderBottom: '1px solid #FAFAFA',
                                        opacity: '70%'
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                <Typography
                                    variant="body2"
                                    sx={{ color: 'white' }}
                                >
                                    Don't have an account?
                                    <Button
                                        component={Link}
                                        to="/register"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#636CCB',
                                            textTransform: "none",
                                            // ml: 1,
                                            "&:hover": {
                                                textDecoration: 'underline',
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

            </Grid>

        </React.Fragment >
    );
}

export default Login;
