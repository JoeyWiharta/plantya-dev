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

const Login = () => {
    const { login } = useAuth();
    const [message, setMessage] = useState("");
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    // Function Handle Login
    // Login with API
    const handleLogin = async (values) => {
        debugger
        try {
            const response = await axiosInstance().post(ListApi.auth.login, {
                username_or_email: values.username,
                password: values.password
            }, {
                withCredentials: true,
            })
            login(response.data.data)

            debugger
            if (response.status == 200) {
                navigate("/");
                console.log("Login Succeed")
            } else {
                setMessage(response.message)
                console.log("Login Failed")
            }
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }
    // Login With dummy
    // const handleLogin = (values) => {
    //     const dummyUser = {
    //         username: "admin",
    //         password: "123456",
    //     };
    //     debugger
    //     // validasi input
    //     if (values.username === dummyUser.username && values.password === dummyUser.password) {
    //         // simpan data user ke state auth
    //         debugger
    //         login(dummyUser);

    //         // redirect
    //         navigate("/");
    //     }
    //     else {
    //         debugger
    //         setMessage("Username atau password salah!");
    //     }
    // }

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

        onSubmit: async (values, { setSubmitting }) => {
            debugger
            setMessage("");
            setLoadingSpinner(true);
            try {
                handleLogin(values);
            } finally {
                setSubmitting(false);
                setLoadingSpinner(false);
            }
        },
    });



    return (
        <React.Fragment>
            <PageLoading
                open={loadingSpinner}
                text="Processing..."
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
                            <Row>
                                {message && <Alert
                                    severity="error"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "rgba(255, 76, 76, 0.12)",
                                        color: "#FF6B6B",
                                        border: "1px solid rgba(255, 107, 107, 0.3)",
                                        backdropFilter: "blur(4px)",
                                        borderRadius: "10px",
                                    }}
                                    className="p-0 m-0 w-100"
                                >
                                    {message}
                                </Alert>}
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
                                        borderColor: '#352F44',
                                        color: 'white',
                                        borderWidth: '2px',
                                        // py: 1.2,
                                        borderRadius: '15px',
                                        "&:hover": {
                                            backgroundColor: "#ffffffff",
                                            color: '#000000',
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
};

export default Login;
