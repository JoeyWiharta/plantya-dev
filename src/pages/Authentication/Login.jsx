import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Snackbar,
    InputAdornment,
} from "@mui/material";
import {
    Row,
    Col,
    Container
} from "reactstrap";
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

            <Container fluid className="" style={{ width: '65%' }}>

                <Col lg="12" md="12" sm="12" className="justify-content-center ">

                    <Row className="mb-4" style={{ color: '#DEF2FF' }}>
                        <div className="text-center mb-4">
                            <Typography variant="h3" fontWeight="bold" >
                                Welcome Back!
                            </Typography>
                            <Typography variant="h5" fontWeight="light" sx={{ marginTop: '-10px' }}>
                                Let's connect your devices.
                            </Typography>
                        </div>

                        <div className="text-center">
                            <Typography variant="h5" fontWeight="medium" className="mt-3">
                                Sign In
                            </Typography>
                        </div>
                    </Row>

                    <Row className="d-flex justify-content-center text-white">
                        <Box
                            component="form"
                            onSubmit={formik.handleSubmit}
                            className="w-75 d-flex flex-column gap-1"
                        >
                            <Row className="mb-2">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: "-10px",
                                        fontWeight: "medium"
                                    }}
                                    className="p-0"
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
                            </Row>

                            <Row className="mb-2">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: "-10px",
                                        fontWeight: "medium"
                                    }}

                                    className="p-0"
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
                                                <InputAdornment position="start">
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
                            </Row>

                            <Row>
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
                                            borderColor: "#1976D2",
                                            // color: '#000000',
                                            transition: "0.7s ease",
                                        }
                                    }}
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? "Processing..." : "Login"}
                                </Button>
                            </Row>
                        </Box>
                    </Row>

                    <Row className="text-white text-center align-items-center justify-content-center mt-4 gap-1">
                        <Col lg={12} md={12} sm={12} className="d-flex justify-content-center align-items-center w-75">
                            <hr className="flex-grow-1 text-white my-0 mx-3" />
                            <p className="my-0 mx-2 ">OR</p>
                            <hr className="flex-grow-1 text-white my-0 mx-3" />
                        </Col>

                        <Col lg={12} md={12} sm={12} className="d-flex justify-content-center align-items-center w-75">

                            <Typography
                                variant="body2"
                                className="my-0 mx-2">
                                Don't have an account?
                                <Button
                                    component={Link}
                                    to="/register"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#636CCB',
                                        textTransform: "none",
                                        "&:hover": {
                                            textDecoration: 'underline',
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Typography>
                        </Col>
                    </Row>





                </Col>
            </Container>






            <Row>

            </Row>

        </React.Fragment >
    );
}

export default Login;
