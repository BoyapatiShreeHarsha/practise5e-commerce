import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import styles from './Cart.module.css'
import { rowDivider } from '../../../utils/muiCustomComponents'
import DropDown from './DropDown';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt:
            'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
];

export default function Cart() {


    return (

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
                            <React.Fragment key={ele.id}>
                                <Box className={styles.cartBody}>
                                    {/* left side */}
                                    <Box className={styles.leftSide}>
                                        <img src={ele.imageSrc} alt={ele.imageAlt} />
                                        <Box className={styles.leftChild}>
                                            <Typography variant='h6' gutterBottom>{ele.name}</Typography>
                                            <Typography variant='body'>{ele.color}</Typography>
                                            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                                <Typography variant='h6' sx={{ marginRight: "20px" }}>Qty</Typography>
                                                <DropDown defaultValue={ele.quantity} maxValue={3} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* right side */}
                                    <Box className={styles.rightSide}>
                                        <Typography variant='h6'>{ele.price}</Typography>
                                        <Button variant="text">Remove</Button>
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
                                $267.00
                            </Typography>
                        </Box>
                    </Box>
                    <Link to="/checkout" style={{ width: "100%" }}>
                        <Button variant='contained' sx={{ width: "100%", padding: "10px 16px" }}>Checkout</Button>
                    </Link>
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

    )
}
