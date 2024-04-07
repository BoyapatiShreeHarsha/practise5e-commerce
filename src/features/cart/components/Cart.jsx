import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import styles from './Cart.module.css'
import { rowDivider } from '../../../utils/muiCustomComponents';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from './DropDown';
import { Link, Navigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { deleteItemFromCartAsync, selectCartItems } from '../cartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { createOrderAsync } from '../../order/orderSlice';



export default function Cart({ section, paymentType, address }) {
    const products = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    const TotalSum = products.reduce(
        (total, item) => total + (Math.round((1 - (item.discountPercentage / 100)) * item.price) * item.quantity),
        0
    );

    const TotalItems = products.reduce(
        (total, item) => total + item.quantity,
        0
    );

    function handleOrder() {
        const order = { items: products, totalAmount: TotalSum, totalItems: TotalItems, user, paymentMethod: paymentType, selectedAddress: address };
        dispatch(createOrderAsync(order));
    }


    return (
        <>
            {!products.length && <Navigate to="/" replace={true}></Navigate>}
            <Box sx={{ bgcolor: "rgb(243 244 246)", height: "100vh", position: "relative" }}>
                <Paper elevation={3} className={styles.paperComponent}>
                    {/* top section */}
                    <Box className={styles.topBox}>
                        <Typography variant='h5'>Cart</Typography>
                    </Box>
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    {/* middle section */}
                    {
                        products?.map((ele) => {
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
                                                    <DropDown defaultValue={ele.quantity} maxValue={3} item={ele} />
                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* right side */}
                                        <Box className={styles.rightSide}>
                                            <Typography variant='h6'>$ {Math.round((1 - ((ele?.discountPercentage) / 100)) * ele?.price)}</Typography>
                                            <Button variant="text" onClick={() => {
                                                dispatch(deleteItemFromCartAsync(ele.id))
                                            }}>Remove</Button>
                                        </Box>
                                    </Box>
                                    {rowDivider({ node: { color: "rgb(229 231 235)" } })}
                                </React.Fragment>
                            )
                        })
                    }
                    {/* bottom section */}
                    <Stack spacing={2} className={styles.bottom} alignItems={'center'}>
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
                                    $ {TotalSum}
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
                                    {TotalItems} items
                                </Typography>
                            </Box>
                        </Box>
                        {section !== "checkout" ? <Link to="/checkout" style={{ width: "100%" }}>
                            <Button variant='contained' sx={{ width: "100%", padding: "10px 16px" }}>Checkout</Button>
                        </Link> :
                            <Link to="#" style={{ width: "100%" }}>
                                <Button variant='contained' sx={{ width: "100%", padding: "10px 16px" }} onClick={handleOrder}>Order</Button>
                            </Link>
                        }
                        <Typography variant='body'>
                            or
                            {
                                <Link to="/" style={{ display: "inline-flex", alignItems: "center", color: "#1976d2", textDecoration: 'none', paddingLeft: "4px" }}>
                                    Continue Shopping {<ArrowForwardIcon />}
                                </Link>
                            }
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}
