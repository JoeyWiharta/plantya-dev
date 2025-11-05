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
    const handleLogin = async (values) => {
        debugger
        try {
            console.log("Test Login API")
            const response = await axiosInstance().post("/api/auth/login", {
                username: values.username,
                password: values.password
            })

            console.log("Response:", response);
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





    return (
        <React.Fragment>
            <PageLoading
                open={loadingSpinner}
                text="Memproses login..."
            />

            <Paper elevation={6} sx={{ p: 4, borderRadius: 3, maxWidth: 400, mx: "auto" }}>

                <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
                    Login
                </Typography>


                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    {message && <Alert severity="error">{message}</Alert>}

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
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, py: 1.2, borderRadius: 2 }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Memproses..." : "Masuk"}
                    </Button>
                </Box>

            </Paper>
        </React.Fragment>
    );
};

export default Login;
