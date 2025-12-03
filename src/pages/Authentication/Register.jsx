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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { textFieldCustom } from "../../themes/theme"
import ListApi from "../../utils/ListApi";
import PopupModal from "../../common/PopupModal";

const Register = () => {
    const [textLoading, setTextLoading] = useState("")
    const [typeModal, setTypeModal] = useState("");
    const [messageModal, setMessageModal] = useState("");
    const [headerMessageModal, setHeaderMessageModal] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const navigate = useNavigate()

    const resetModalState = () => {
        setTypeModal("");
        setHeaderMessageModal("");
        setMessageModal("");
    };

    // Function Handle Register
    const handleRegister = async (values) => {
        const response = await axiosInstance().post(
            ListApi.auth.register,
            {
                username: values.username,
                email: values.email,
                password: values.password,
                confirm_password: values.rePassword
            },
            { withCredentials: true }
        );
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
                    .required("Username is required.")
                    .min(4, "Username must be at least 4 characters.")
                    .max(20, "Username must not exceed 20 characters.")
                    .matches(
                        /^[a-zA-Z0-9_]+$/,
                        "Username can only contain letters, numbers, and underscores."
                    ),
                email: Yup.string()
                    .required("Email is required.")
                    .email("Please enter a valid email address."),
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
                setMessageModal(error?.response?.data?.message || "System is Unavailable. Please Try Again Later.");

                setTimeout(() => {
                    setShowModal(false);
                    resetModalState();
                }, 3000);
            }
            finally {
                setSubmitting(false);
                setShowPassword(false);
                setShowRePassword(false);
                resetForm();
            }
        },
    });

    return (
        <React.Fragment>
            <PageLoading
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
                        mt: 2,
                        color: "#FAFAFA",
                        // bgcolor: 'red'
                    }}
                >
                    <Typography variant="h3" fontWeight="bold" >
                        Hello!
                    </Typography>
                    <Typography variant="h5" fontWeight="light">
                        Create your account
                    </Typography>
                </Grid>

                {/* Body and Footer Grid */}
                <Grid
                    size={{ xs: 10, sm: 10, md: 8, lg: 7, xl: 7 }}
                    alignItems="center"
                    sx={{
                        mt: 1,
                        mb: 2,
                        // bgcolor: 'darkBlue',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '420px'


                    }}
                >

                    {/* Body Section */}
                    <Typography variant="h4" fontWeight="medium" color="#FAFAFA"
                        sx={{
                            mb: 2,
                            textAlign: 'center'
                        }}>
                        Sign Up
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
                            color: "#FAFAFA",
                            // bgcolor: 'darkGreen'
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body2" fontWeight="medium"
                            >
                                Username
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Username"
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
                                                <AccountCircleIcon />
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
                                Email
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Email"
                                name="email"
                                size="medium"
                                fullWidth
                                margin="normal"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
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

                        <Box>
                            <Typography
                                variant="body2" fontWeight="medium"
                            >
                                Confirm Password
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Confirm password"
                                name="rePassword"
                                type={showRePassword ? 'text' : 'password'}
                                size="medium"
                                fullWidth
                                margin="normal"
                                value={formik.values.rePassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                                helperText={formik.touched.rePassword && formik.errors.rePassword}
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
                                                    onClick={() => setShowRePassword(!showRePassword)}
                                                    edge="end"
                                                >
                                                    {showRePassword ? <VisibilityOutlinedIcon /> : <VisibilityOff />}
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
                                bgcolor: '#24427D',
                                borderWidth: '2px',
                                borderRadius: '15px',
                                "&:hover": {
                                    backgroundColor: "#1976D2",
                                    border: "2px solid #1976D2",
                                    transition: "0.7s ease",
                                }
                            }}
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Processing..." : "Register"}
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
                                    className="my-0 mx-2">
                                    Have an account?
                                    <Button
                                        component={Link}
                                        to="/login"
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
                                        Sign In
                                    </Button>
                                </Typography>
                            </Box>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment >
    );
};

export default Register;
