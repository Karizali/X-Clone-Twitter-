import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link_mui from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { GlobalContext } from './../../Components/Context/Context';
import { colors } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ChangePassword() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    let { state, dispatch } = useContext(GlobalContext);


    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword:""
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string()
                .required("Required"),
            newPassword: Yup.string()
                .max(20, "Must be 20 characters or less")
                .min(3, "Must be at least 3 characters")
                .required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Passwords must match')
                .required("Required"),
        }),
        onSubmit: (values) => {
            console.log(values);

            (async () => {
                try {
                    const response = await axios.post(
                        `${state.baseUrl}/api/v1/change-password`,
                        {
                            currentPassword: values.currentPassword,
                            newPassword: values.newPassword,
                        }
                    );

                    // dispatch({
                    //     type: 'USER_LOGIN',
                    //     payload: response.data.profile
                    // })

                    setUser(response.data);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                    setError(error?.response?.data?.message);
                    // dispatch({
                    //     type: 'USER_LOGOUT'
                    // })
                }
            })();

            formik.resetForm();
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    {
                        error ?
                            <Typography sx={{ color: "red" }} component="h1" variant="h6">
                                {error}
                            </Typography>
                            :
                            null
                    }
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="current-password"
                            label="Current Password"
                            name="currentPassword"
                            autoComplete="current-password"
                            type="password"
                            autoFocus
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currentPassword}
                        />
                        {formik.touched.currentPassword && formik.errors.currentPassword ? (
                            <div className="error">{formik.errors.currentPassword}</div>
                        ) : null}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="new-password"
                            autoComplete="new-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                        />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <div className="error">{formik.errors.newPassword}</div>
                        ) : null}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="new-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="error">{formik.errors.confirmPassword}</div>
                        ) : null}
                     
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Change Password
                        </Button>
                        
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
