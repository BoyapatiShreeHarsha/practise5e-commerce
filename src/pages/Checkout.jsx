import { Box, Button, Paper, Radio, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Cart from '../features/cart/components/Cart'
import styles from './Checkout.module.css'
import { customTextFeild, rowDivider } from '../utils/muiCustomComponents'

const addresses = [
    {
        name: 'John wick',
        street: '11th Main',
        city: 'Delhi',
        pinCode: 110001,
        state: 'Delhi',
        phone: 12312321331,
    },
    {
        name: 'John Doe',
        street: '15th Main',
        city: 'Bangalore',
        pinCode: 560034,
        state: 'Karnataka',
        phone: 123123123,
    },
];

const paymentMode = [
    { value: "cash", label: "Cash" },
    { value: "card", label: "Card Payment" }
]

export default function Checkout() {
    const [selectedAdd, setSelectedAdd] = useState(0);
    const [paymentType, setPaymentType] = useState(0);

    return (
        <Stack spacing={{ xs: "40px", md: "5%" }} direction={{ xs: "column", md: "row" }} sx={{ bgcolor: "rgb(243 244 246)", height: "100vh" }}>
            <Box sx={{ flexGrow: 1 }}>
                {/* top section */}
                <Paper elevation={3} sx={{ width: "90%", margin: "20px auto", padding: "2% 4%" }}>
                    <Box className={styles.topBox}>
                        <Typography variant='h6' gutterBottom>All Products</Typography>
                        <Typography variant='body'>Use a permanent address where you can receive mail.</Typography>
                    </Box>
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    {/* form section */}
                    <form style={{ width: "100%" }}>
                        <Stack spacing={5} alignItems={'flex-start'}>
                            <Box className={`${styles.box1} ${styles.box}`}>
                                <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                                    <label htmlFor='fname' >
                                        <Typography variant='body' gutterBottom>
                                            First Name
                                        </Typography></label>
                                    {customTextFeild({ id: "fname", variant: "outlined", sx: { width: "90%" } })}

                                </Box>
                                <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                                    <label htmlFor='lname' >
                                        <Typography variant='body' gutterBottom>
                                            Last Name
                                        </Typography></label>
                                    {customTextFeild({ id: "lname", variant: "outlined", sx: { width: "100%" } })}


                                </Box>
                            </Box>
                            <Box className={`${styles.box2} ${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='email' >
                                        <Typography variant='body' gutterBottom>
                                            Email address
                                        </Typography></label>
                                    {customTextFeild({ id: "email", variant: "outlined", type: 'email', sx: { width: "100%" } })}


                                </Box>
                            </Box>
                            <Box className={`${styles.box3} ${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='country' >
                                        <Typography variant='body' gutterBottom>
                                            Country
                                        </Typography></label>
                                    {customTextFeild({ id: "country", variant: "outlined", sx: { width: "100%" } })}


                                </Box>
                            </Box>

                            <Box className={`${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='address' >
                                        <Typography variant='body' gutterBottom>
                                            Street address
                                        </Typography></label>
                                    {customTextFeild({ id: "address", variant: "outlined", multiline: "true", maxRows: 3, sx: { width: "60%" } })}
                                </Box>
                            </Box>
                        </Stack>
                        {rowDivider({ node: { margin: "20px 0px" } })}

                        <Stack spacing={2} justifyContent={'flex-end'} direction={'row'} alignItems={'center'}>
                            <Button variant="text">Reset</Button>
                            <Button variant="contained">Add Address</Button>
                        </Stack>

                    </form>

                    {/* radio button section */}
                    <Box className={styles.topBox}>
                        <Typography variant='h6' gutterBottom>Addresses</Typography>
                        <Typography variant='body'>Choose from Existing addresses</Typography>
                    </Box>
                    {
                        addresses.map((add, index) => {
                            return (
                                <Box key={index} className={styles.addBoxMain}>
                                    <Radio
                                        checked={selectedAdd === index}
                                        onChange={() => setSelectedAdd(index)}
                                        value={index}
                                    />
                                    <Box className={styles.addBox} sx={{ flexGrow: 1 }}>
                                        <Box>
                                            <Typography variant='h6' gutterBottom>{add.name}</Typography>
                                            <Typography variant='body2'>{add.street}</Typography>
                                            <Typography variant='body2'>{add.pinCode}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='h6' gutterBottom>&nbsp;</Typography>
                                            <Typography variant='body'>Phone: {add.phone}</Typography>
                                            <Typography variant='body2'>{add.city}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    }

                    <Box className={styles.topBox}>
                        <Typography variant='h6' gutterBottom>Payment Methods</Typography>
                        <Typography variant='body'>Choose One</Typography>
                    </Box>
                    {
                        paymentMode.map((obj, index) => {
                            return (
                                <Box key={index} className={styles.addBoxMain}>
                                    <Radio
                                        checked={paymentType === index}
                                        onChange={() => { setPaymentType(index) }}
                                        value={index}
                                    />
                                    <Box className={styles.addBox} sx={{ flexGrow: 1 }}>
                                        <Typography variant='body'>{obj.label}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Paper>
            </Box>
            <Box>
                <Cart />
            </Box>
        </Stack>
    )
}
