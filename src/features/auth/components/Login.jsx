import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'

export default function Login() {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ height: "100vh", bgcolor: "rgb(243 244 246)", width: "100%", padding: "30px 0px" }}>
                <Stack spacing={2} alignItems={'center'} >
                    <img src='./logo.svg' alt='logo' height="100px" />
                    <Typography variant='h5' gutterBottom >Log in to your account</Typography>
                </Stack>
                <Stack spacing={5} sx={{ width: { xs: "90%", sm: "60%", md: "40%" }, margin: "5% auto" }}>
                    <TextField label="Email Id" type='email' />
                    <TextField label="Password" type='password' />
                    <Button variant="contained">Log In</Button>
                    <Typography variant='body' sx={{ textAlign: "center" }}>Not a Member?<Link to={"/signup"} style={{ textDecoration: "none" }} ><Typography variant='div' color='primary.dark'>Create a Account</Typography></Link></Typography>
                </Stack>
            </Box>
        </ThemeProvider>
    )
}
