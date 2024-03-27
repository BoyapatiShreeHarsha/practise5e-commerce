import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

export default function SignUp() {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ height: "100vh", bgcolor: "rgb(243 244 246)", width: "100%", padding: "30px 0px" }}>
                <Stack spacing={2} alignItems={'center'} >
                    <img src='./logo.svg' alt='logo' height="100px" />
                    <Typography variant='h5' gutterBottom >Sign In to your account</Typography>
                </Stack>
                <Stack spacing={5} sx={{ width: { xs: "90%", sm: "60%", md: "40%" }, margin: "5% auto" }}>
                    <TextField label="Email Id" type='email' />
                    <TextField label="Password" type='password' />
                    <TextField label="Confirm Password" type='password' />
                    <Button variant="contained">Sign Up</Button>
                    <Typography variant='body' sx={{ textAlign: "center" }}>Already a Member?<Link to={"/login"} style={{ textDecoration: "none" }} ><Typography variant='div' color='primary.dark'>Log In</Typography></Link></Typography>
                </Stack>
            </Box>
        </ThemeProvider>
    )
}
