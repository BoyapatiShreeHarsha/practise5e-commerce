import React from 'react'
import { useForm } from "react-hook-form"
import { pageBackground } from '../../../utils/platfromThemes';
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const funcSubmit = (data) => {
        console.log(data);
    }


    return (
        <Box sx={{ height: "100vh", bgcolor: pageBackground, width: "100%", padding: "30px 0px" }}>
            <Stack spacing={2} alignItems={'center'} >
                <img src='./logo.svg' alt='logo' height="100px" />
                <Typography variant='h5' gutterBottom >Enter Your Email</Typography>
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
                    <Button type='submit' variant="contained">Send Email</Button>
                    {/* {Loginerror && <p style={{ color: "red", textAlign: "center" }}>{Loginerror.message}</p>} */}
                    <Typography variant='body' sx={{ textAlign: "center" }}>Want to go Back?<Link to={"/login"} style={{ textDecoration: "none" }} ><Typography variant='div' color='primary.dark'>Login</Typography></Link></Typography>
                </Stack>
            </form>
        </Box>
    )
}
