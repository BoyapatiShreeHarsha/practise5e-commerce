import React from 'react'
import ProductForm from '../features/admin/components/ProductForm'
import Navbar from '../features/navbar/components/Navbar'
import { Box, Paper, Typography } from '@mui/material'
import { pageBackground } from '../utils/platfromThemes'
import styles from './Home.module.css'

export default function ProductFormPage() {
    return (
        <Box sx={{ bgcolor: pageBackground, height: "100vh" }}>
            <Navbar />
            <Paper elevation={3} sx={{ padding: "24px", width: "100%" }}>
                <Typography variant="h5" sx={{ fontWeight: "700" }}>E-Commerce</Typography>
            </Paper>
            <Paper elevation={3} className={styles.paperComponent}>
                <ProductForm />
            </Paper>
        </Box>
    )
}
