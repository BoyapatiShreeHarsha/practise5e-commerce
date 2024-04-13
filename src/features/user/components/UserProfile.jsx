import React, { useState } from 'react'
import { Box, IconButton, Paper, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { pageBackground } from '../../../utils/platfromThemes'
import { selectCurrUser, updateUserAsync } from '../userSlice';
import { useForm } from "react-hook-form"
import styles from './UserProfile.module.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { customTextFeild, rowDivider } from '../../../utils/muiCustomComponents';
import UserFrom from './UserFrom';

export default function UserProfile() {

    const userInfo = useSelector(selectCurrUser);

    const dispatch = useDispatch();

    const [formAddressOpen, setFormAddressOpen] = useState({ open: false, type: null });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const funcSubmit = (data, type) => {
        handleFormClose();
        let newUser = { ...userInfo };
        newUser.addresses = [...userInfo.addresses];
        if (!newUser.addresses) {
            newUser.addresses = [];
        }
        if (type !== -1) {
            newUser.addresses[type] = data;
        }
        else {
            newUser.addresses = [...newUser.addresses, data]
        }

        dispatch(updateUserAsync({ ...newUser }));
    }



    function handleDeleteAddress(index) {
        let newUser = { ...userInfo };
        userInfo.addresses.filter((add, i) => i !== index);
        newUser.addresses = userInfo.addresses.filter((add, i) => i !== index);
        dispatch(updateUserAsync({ ...newUser }));
    }

    function handleFormOpen(index) {
        setFormAddressOpen({ open: true, type: index });
        if (index !== -1) {
            const address = userInfo.addresses[index];
            setValue('name', address.name);
            setValue('city', address.city);
            setValue('state', address.state);
            setValue('pinCode', address.pinCode);
            setValue('phone', address.phone);
            setValue('street', address.street);
        }
    }

    function handleFormClose() {
        setFormAddressOpen({ open: false, type: null });
    }




    return (
        <Box sx={{ bgcolor: pageBackground, height: "calc(100vh - 64px)", overflowY: "auto" }}>
            <Box className={styles.topBox} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <Typography variant='h5'>Your Profile</Typography>
            </Box>

            <Paper key={`userOrder`} elevation={3} className={styles.paperComponent} sx={{ marginBottom: "30px" }}>
                {/* user name */}
                <UserFrom />
                {/* user addresses */}
                {userInfo.addresses?.length > 0 && <Box className={styles.topBox}>
                    <Typography variant='h6' gutterBottom>Addresses</Typography>
                    <Button variant='contained' onClick={() => handleFormOpen(-1)}>Add new Address</Button>
                </Box>}
                {
                    userInfo.addresses?.map((add, index) => {
                        return (
                            <Box key={index} className={styles.addBoxMain}>
                                <Box className={styles.addBox} sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center", width: "100%" }}>
                                        <Typography variant='h6' gutterBottom>{add.name}</Typography>
                                        <Box>
                                            <IconButton onClick={() => handleFormOpen(index)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteAddress(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "10px" }}>
                                        <Box>
                                            <Typography variant='body2'>{add.street}</Typography>
                                            <Typography variant='body2'>{add.pinCode}</Typography>
                                        </Box>
                                        <Box>

                                            <Typography variant='body'>Phone: {add.phone}</Typography>
                                            <Typography variant='body2'>{add.city}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                }
                {/* form */}
                <Dialog
                    open={formAddressOpen.open}
                    onClose={handleFormClose}
                    aria-labelledby="form-addresss-change"
                    aria-describedby={`${formAddressOpen.type !== -1 ? "Edit" : "Add"} address`}
                >
                    <DialogTitle>{formAddressOpen.type !== -1 ? "Edit" : "Add"} Address</DialogTitle>
                    <DialogContent>
                        <form noValidate style={{ width: "100%" }}>
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
                        </form>
                    </DialogContent>
                    <DialogActions>

                        <Stack spacing={2} justifyContent={'flex-end'} direction={'row'} alignItems={'center'}>
                            <Button type="reset" variant="text" onClick={() => reset()}>Reset</Button>
                            <Button type="submit" variant="contained" onClick={handleSubmit((data) => funcSubmit(data, formAddressOpen.type))}>{formAddressOpen.type !== -1 ? "Edit" : "Add"} Address</Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
            </Paper>

        </Box>
    )
}
