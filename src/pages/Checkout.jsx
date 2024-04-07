import { Box, Button, Paper, Radio, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Cart from '../features/cart/components/Cart'
import styles from './Checkout.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { customTextFeild, rowDivider } from '../utils/muiCustomComponents'
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'
import { selectCartItems } from '../features/cart/cartSlice'



const paymentMode = [
    { value: "cash", label: "Cash" },
    { value: "card", label: "Card Payment" }
]

export default function Checkout() {
    const [selectedAdd, setSelectedAdd] = useState(0);
    const [paymentType, setPaymentType] = useState(0);


    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const funcSubmit = (data) => {
        let newUser = { ...user };
        if (!newUser.addresses) {
            newUser.addresses = [];
        }
        dispatch(updateUserAsync({ ...newUser, addresses: [...newUser.addresses, data] }));
        reset();
    }


    return (
        <Stack spacing={{ xs: "40px", md: "3%" }} direction={{ xs: "column", md: "row" }} sx={{ bgcolor: "rgb(243 244 246)", height: "100vh" }}>
            <Box sx={{ flexGrow: 3 }}>
                {/* top section */}
                <Paper elevation={3} sx={{ width: "90%", margin: "20px auto", padding: "2% 4%" }}>
                    <Box className={styles.topBox}>
                        <Typography variant='h6' gutterBottom>All Products</Typography>
                        <Typography variant='body'>Use a permanent address where you can receive mail.</Typography>
                    </Box>
                    {rowDivider({ node: { margin: "20px 0px" } })}
                    {/* form section */}
                    <form noValidate style={{ width: "100%" }} onSubmit={handleSubmit(funcSubmit)}>
                        <Stack spacing={5} alignItems={'flex-start'}>
                            <Box className={`${styles.box1} ${styles.box}`}>
                                <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                                    <label htmlFor='name' >
                                        <Typography variant='body' gutterBottom>
                                            Full Name
                                        </Typography></label>
                                    {customTextFeild({ id: "name", variant: "outlined", sx: { width: "90%" }, ...register("name", { required: "Name is required" }) })}
                                    {errors.name?.message && <p style={{ color: "red" }}>{errors.name.message}</p>}
                                </Box>
                            </Box>
                            <Box className={`${styles.box2} ${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='phone' >
                                        <Typography variant='body' gutterBottom>
                                            Phone number
                                        </Typography></label>
                                    {customTextFeild({ id: "phone", variant: "outlined", type: 'tel', sx: { width: "100%" }, ...register("phone", { required: "Phone is required" }) })}
                                    {errors.phone?.message && <p style={{ color: "red" }}>{errors.phone.message}</p>}
                                </Box>
                            </Box>
                            <Box className={`${styles.box3} ${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='street' >
                                        <Typography variant='body' gutterBottom>
                                            Street Address
                                        </Typography></label>
                                    {customTextFeild({ id: "street", variant: "outlined", sx: { width: "100%" }, ...register("street", { required: "street address is required" }) })}
                                    {errors.street?.message && <p style={{ color: "red" }}>{errors.street.message}</p>}
                                </Box>
                            </Box>

                            <Box className={`${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='city' >
                                        <Typography variant='body' gutterBottom>
                                            City
                                        </Typography></label>
                                    {customTextFeild({ id: "city", variant: "outlined", sx: { width: "60%" }, ...register("city", { required: "City name is required" }) })}
                                    {errors.city?.message && <p style={{ color: "red" }}>{errors.city.message}</p>}
                                </Box>
                                <Box className={styles.formChild}>
                                    <label htmlFor='state' >
                                        <Typography variant='body' gutterBottom>
                                            State
                                        </Typography></label>
                                    {customTextFeild({ id: "state", variant: "outlined", sx: { width: "60%" }, ...register("state", { required: "State name is required" }) })}
                                    {errors.state?.message && <p style={{ color: "red" }}>{errors.state.message}</p>}
                                </Box>
                                <Box className={styles.formChild}>
                                    <label htmlFor='pinCode' >
                                        <Typography variant='body' gutterBottom>
                                            Pin Code
                                        </Typography></label>
                                    {customTextFeild({ id: "pinCode", variant: "outlined", sx: { width: "60%" }, ...register("pinCode", { required: "Pin Code is required" }) })}
                                    {errors.pinCode?.message && <p style={{ color: "red" }}>{errors.pinCode.message}</p>}
                                </Box>
                            </Box>
                        </Stack>
                        {rowDivider({ node: { margin: "20px 0px" } })}

                        <Stack spacing={2} justifyContent={'flex-end'} direction={'row'} alignItems={'center'}>
                            <Button type="reset" variant="text">Reset</Button>
                            <Button type="submit" variant="contained">Add Address</Button>
                        </Stack>

                    </form>

                    {/* radio button section */}
                    {user.addresses?.length > 0 && <Box className={styles.topBox}>
                        <Typography variant='h6' gutterBottom>Addresses</Typography>
                        <Typography variant='body'>Choose from Existing addresses</Typography>
                    </Box>}
                    {
                        user.addresses?.map((add, index) => {
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
            <Box sx={{ flexGrow: 1 }}>
                <Cart section={"checkout"} paymentType={paymentMode[paymentType].value} address={user.addresses[selectedAdd]} />
            </Box>
        </Stack>
    )
}
