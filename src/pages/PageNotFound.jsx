import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { pageBackground } from '../utils/platfromThemes'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <Box sx={{ bgcolor: pageBackground, height: "100vh", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Button variant="outlined" >404</Button>
                <Typography variant="h2">
                    Page Not Found
                </Typography>
                <Typography variant="body" gutterBottom>
                    Sorry, we couldn't find the page you're looking for.
                </Typography>
                <Link to={"/"} style={{ marginTop: "27px" }}>
                    <Button variant="contained">Go back to Home</Button>
                </Link>
            </Stack>
        </Box>
    )
}
