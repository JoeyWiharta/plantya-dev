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
    Snackbar
} from "@mui/material";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import PageLoading from "../../common/PageLoading";
import axiosInstance from "../../utils/AxiosInstance";
import useTextFieldSx from "../../themes/textFieldDark";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [message, setMessage] = useState("");


    // const handleLogin = (values) => {
    //     debugger
    //     if (values.username === "admin" && values.password === "1234") {
    //         const userData = { username: values.username, token: "dummy-token" };
    //         ReactSession.set("authUser", userData);
    //         navigate("/test");
    //     } else {
    //         debugger
    //         setMessage("Username atau password salah!");
    //     }
    // }
    const { login } = useAuth();
    const handleLogin = async (values) => {
        debugger
        try {
            debugger
            console.log("Test Login API")
            const response = await axiosInstance().post("/api/auth/login", {
                username: values.username,
                password: values.password
            }, {
                withCredentials: true,
            })
            login(response.data.data)
            navigate("/"); // redirect setelah login sukses

        } catch (error) {
            console.log("Test Login API Error")
            setMessage("API ERROR")
        }
    }


    const formik = useFormik({
        initialValues:
        {
            username: "",
            password: "",
        },
        validationSchema: Yup.object
            ({
                username: Yup.string().required("Username wajib diisi"),
                password: Yup.string().required("Password wajib diisi"),
            }),

        onSubmit: async (values, { setSubmitting }) => {
            setMessage("");
            setLoadingSpinner(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800)); // simulasi API
                handleLogin(values);
            } finally {
                setSubmitting(false);
                setLoadingSpinner(false);
            }
        },
    });

    const textFieldDarkSx = {
        "& .MuiInputLabel-root": {
            color: "#A7B3C2",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#DCE3EA",
        },

        "& .MuiOutlinedInput-root": {
            color: "white",
            backgroundColor: "#0E1621",
            borderRadius: "10px",

            "& fieldset": {
                borderColor: "#2F3A48",
            },
            "&:hover fieldset": {
                borderColor: "#4A5B70",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#6FA3FF",
                boxShadow: "0 0 6px rgba(111,163,255,0.5)",
            },
        },

        // ⛔ FIX autofill jadi putih
        "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #0E1621 inset !important",
            WebkitTextFillColor: "#ffffff !important",
        },
        "& input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px #0E1621 inset !important",
            WebkitTextFillColor: "#ffffff !important",
        },
    };






    return (
        <React.Fragment>
            <PageLoading
                open={loadingSpinner}
                text="Processing..."
            />

            <Paper elevation={6}
                sx={{
                    p: 4,
                    height: "auto",
                    width: "auto",
                    borderRadius: "16px",
                    backgroundColor: "#1C2733",
                    border: "1px solid #2F3A48",
                    boxShadow: "0 5px 18px rgba(0,0,0,0.4)",
                    color: "white",
                }}
            >

                <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
                    Login
                </Typography>


                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    {message && <Alert
                        severity="error"
                        sx={{
                            backgroundColor: "rgba(255, 76, 76, 0.12)",
                            color: "#FF6B6B",
                            border: "1px solid rgba(255, 107, 107, 0.3)",
                            backdropFilter: "blur(4px)",
                            borderRadius: "10px",
                        }}
                    >
                        {message}
                    </Alert>}


                    <TextField
                        label="Username"
                        name="username"
                        fullWidth
                        margin="normal"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        sx={textFieldDarkSx}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={textFieldDarkSx}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="dark"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.2,
                            borderRadius: 2,
                            backgroundColor: "#3B82F6",
                            "&:hover": { backgroundColor: "#2563EB" }
                        }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Processing..." : "Login"}
                    </Button>
                </Box>

            </Paper>
        </React.Fragment >
    );
};

export default Login;
