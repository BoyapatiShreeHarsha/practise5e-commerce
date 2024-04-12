import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom'
import { checkUserAsync, selectLogInError, selectLoggedInUserId } from '../authSlice';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    const funcSubmit = (data) => {
        dispatch(checkUserAsync(data));
    }

    const user = useSelector(selectLoggedInUserId);
    const Loginerror = useSelector(selectLogInError);

    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            {user && <Navigate to="/" replace={true}></Navigate>}
            <Box sx={{ height: "100vh", bgcolor: "rgb(243 244 246)", width: "100%", padding: "30px 0px" }}>
                <Stack spacing={2} alignItems={'center'} >
                    <img src='./logo.svg' alt='logo' height="100px" />
                    <Typography variant='h5' gutterBottom >Log in to your account</Typography>
                </Stack>
                <form onSubmit={handleSubmit(funcSubmit)}>
                    <Stack spacing={5} sx={{ width: { xs: "90%", sm: "60%", md: "40%" }, margin: "5% auto" }}>
                        <TextField label="Email Id" type='email' {...register("email", {
                            required: "email is required", pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: "invalid email"
                            }
                        })} />
                        {errors?.email?.message && <p style={{ color: "red" }}>{errors?.email?.message}</p>}
                        <TextField label="Password" type='password' {...register("password", { required: "password is required", minLength: 8 })} />
                        {errors?.password?.message && <p style={{ color: "red" }}>{errors?.password?.message}</p>}
                        <Button type='submit' variant="contained">Log In</Button>
                        {Loginerror && <p style={{ color: "red", textAlign: "center" }}>{Loginerror.message}</p>}
                        <Typography variant='body' sx={{ textAlign: "center" }}>Not a Member?<Link to={"/signup"} style={{ textDecoration: "none" }} ><Typography variant='div' color='primary.dark'>Create a Account</Typography></Link></Typography>
                    </Stack>
                </form>
            </Box>
        </ThemeProvider>
    )
}
