import React, { useEffect } from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrdersByIdAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import styles from '../../cart/components/Cart.module.css';
import { rowDivider } from '../../../utils/muiCustomComponents';



export default function UserOrders() {

    const userOrders = useSelector(selectUserOrders);
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchUserOrdersByIdAsync(user.id));
        }
    }, [user])

    return (
        <div>
            <Box sx={{ bgcolor: "rgb(243 244 246)" }}>
                <Box className={styles.topBox} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <Typography variant='h5'>Your Orders</Typography>
                </Box>

                {/* middle section */}
                {userOrders.map((userOrder, index) => {
                    return (
                        <Paper key={`userOrder-${index}`} elevation={3} className={styles.paperComponent} sx={{ marginBottom: "30px" }}>
                            <Box className={styles.topBox}>
                                <Typography variant='h6'>Order #{userOrder.id}</Typography>
                            </Box>
                            {rowDivider({ node: { margin: "20px 0px" } })}
                            {userOrder?.items?.map((ele) => {
                                return (
                                    <React.Fragment key={`cartItems${ele.id}`}>
                                        <Box className={styles.cartBody}>
                                            {/* left side */}
                                            <Box className={styles.leftSide}>
                                                <img src={ele.images[0]} alt={ele.title} />
                                                <Box className={styles.leftChild}>
                                                    <Typography variant='h6' gutterBottom>{ele.title}</Typography>
                                                    <Typography variant='body'>{ele.brand}</Typography>
                                                    <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                                        <Typography variant='h6' sx={{ marginRight: "20px" }}>Qty</Typography>
                                                        <Typography variant='h6'>{ele.quantity}</Typography>

                                                    </Box>
                                                </Box>
                                            </Box>
                                            {/* right side */}
                                            <Box className={styles.rightSide}>
                                                <Typography variant='h6'>$ {Math.round((1 - ((ele?.discountPercentage) / 100)) * ele?.price)}</Typography>
                                            </Box>
                                        </Box>
                                        {rowDivider({ node: { color: "rgb(229 231 235)" } })}
                                    </React.Fragment>
                                )
                            })}


                            <Stack spacing={2} className={styles.bottom} alignItems={'center'} >
                                <Box className={styles.bottomFirstChild}>
                                    <Box>
                                        <Typography variant='h6' gutterBottom>
                                            SubTotal
                                        </Typography>
                                        <Typography variant='body'>
                                            Shipping and taxes calculated at checkout.
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant='h6'>
                                            $ {userOrder.totalAmount}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className={styles.bottomFirstChild}>
                                    <Box>
                                        <Typography variant='h6' gutterBottom>
                                            Total Items
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant='h6'>
                                            {userOrder.totalItems} items
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                            {rowDivider({ node: { margin: "20px 0px" } })}
                            <Typography variant='body'>Selected Address</Typography>
                            <Box className={styles.addBoxMain}>

                                <Box className={styles.addBox} sx={{ flexGrow: 1 }}>
                                    <Box>
                                        <Typography variant='h6' gutterBottom>{userOrder.selectedAddress.name}</Typography>
                                        <Typography variant='body2'>{userOrder.selectedAddress.street}</Typography>
                                        <Typography variant='body2'>{userOrder.selectedAddress.pinCode}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant='h6' gutterBottom>&nbsp;</Typography>
                                        <Typography variant='body'>Phone: {userOrder.selectedAddress.phone}</Typography>
                                        <Typography variant='body2'>{userOrder.selectedAddress.city}</Typography>
                                    </Box>
                                </Box>
                            </Box>


                        </Paper>)
                })
                }

            </Box>
        </div >
    )
}
