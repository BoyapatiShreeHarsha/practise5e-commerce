import React, { useEffect } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { pageBackground } from '../utils/platfromThemes'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/cartSlice';
import { resetCurrOrder } from '../features/order/orderSlice';
import { selectLoggedInUserId } from '../features/auth/authSlice';

export default function OrderSuccess() {
    const params = useParams();
    const user = useSelector(selectLoggedInUserId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(resetCartAsync(user));
            dispatch(resetCurrOrder());
        }
    }, [user])


    return (
        <Box sx={{ bgcolor: pageBackground, height: "100vh", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Button variant="outlined" color="success">Success</Button>
                <Typography variant="h2">
                    Order #{params.id}
                </Typography>
                <Typography variant="body" gutterBottom>
                    Congratulations, Order placed Successfully. Go back to checkout the latest Deals.
                </Typography>
                <Link to={"/"} style={{ marginTop: "27px" }}>
                    <Button variant="contained">Go back to Home</Button>
                </Link>
            </Stack>
        </Box>
    )
}
