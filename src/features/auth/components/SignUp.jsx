import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { createUserAsync, selectLoggedInUserId } from '../authSlice';

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUserId);


    const funcSubmit = (data) => {
        dispatch(createUserAsync({ email: data.email, password: data.password }))
    }

    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            {user && <Navigate to="/" replace={true}></Navigate>}
            <Box sx={{ height: "100vh", bgcolor: "rgb(243 244 246)", width: "100%", padding: "30px 0px" }}>
                <Stack spacing={2} alignItems={'center'} >
                    <img src='./logo.svg' alt='logo' height="100px" />
                    <Typography variant='h5' gutterBottom >Sign In to your account</Typography>
                </Stack>
                <form noValidate onSubmit={handleSubmit(funcSubmit)}>
                    <Stack spacing={5} sx={{ width: { xs: "90%", sm: "60%", md: "40%" }, margin: "5% auto" }}>
                        <TextField label="Email Id" type='email' name='email' {...register("email", {
                            required: "email is required", pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: "invalid email"
                            }
                        })} />
                        {errors?.email?.message && <p style={{ color: "red" }}>{errors?.email?.message}</p>}
                        <TextField label="Password" type='password' {...register("password", { required: "password is required", minLength: 8 })} />
                        {errors?.password?.message && <p style={{ color: "red" }}>{errors?.password?.message}</p>}
                        <TextField label="Confirm Password" type='password' {...register("confirmPassword", {
                            required: "confirm Password is required",
                            validate: (value, formValues) =>
                                value === formValues.password || 'password not matching',
                        })} />
                        {errors?.confirmPassword?.message && <p style={{ color: "red" }}>{errors?.confirmPassword?.message}</p>}
                        <Button type="submit" variant="contained"
                        >Sign Up</Button>
                        <Typography variant='body' sx={{ textAlign: "center" }}>Already a Member?<Link to={"/login"} style={{ textDecoration: "none" }} ><Typography variant='div' color='primary.dark'>Log In</Typography></Link></Typography>
                    </Stack>
                </form>
            </Box>
        </ThemeProvider >
    )
}
