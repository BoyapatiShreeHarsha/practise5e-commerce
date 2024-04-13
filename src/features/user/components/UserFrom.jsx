import React, { useState } from 'react'
import { Avatar, Box, IconButton, Paper, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrUser, updateUserAsync } from '../userSlice';
import { useForm } from "react-hook-form"
import styles from './UserProfile.module.css'
import EditIcon from '@mui/icons-material/Edit';
import { customTextFeild, rowDivider } from '../../../utils/muiCustomComponents';


export default function UserFrom() {

    const userInfo = useSelector(selectCurrUser);

    function handlePassword(str) {
        let newStr = '';
        for (let i = 0; i < str.length; i++) {
            newStr += "*";
        }

        return newStr;
    }

    const dispatch = useDispatch();

    const [formUserOpen, setFormUserOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const funcSubmit2 = (data) => {
        handleFormClose2();
        console.log(data);
        let newUser = { ...userInfo };

        dispatch(updateUserAsync({ ...newUser, ...data }))

    }

    function handleUserFormOpen() {
        setFormUserOpen(true);
        setValue('uname', userInfo.uname);
        setValue('email', userInfo.email);
        setValue('password', userInfo.password);

    }

    function handleFormClose2() {
        setFormUserOpen(false);
    }


    return (
        <Box className={styles.flexRow}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Avatar>{userInfo.uname ? userInfo.uname[0] : "?"}</Avatar>
                <Box sx={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
                    <Typography variant='h6' gutterBottom>{userInfo.uname ? userInfo.uname : "?"}</Typography>
                    <Typography variant='body'>{userInfo.email}</Typography>
                    <Typography variant='body'>{handlePassword(userInfo.password)}</Typography>
                </Box>

            </Box>
            <IconButton onClick={handleUserFormOpen}>
                <EditIcon />
            </IconButton>

            {/* user form */}
            <Dialog
                open={formUserOpen}
                onClose={handleFormClose2}
                aria-labelledby="form-user-change"
                aria-describedby={` change user profile`}
            >
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <form noValidate style={{ width: "400px" }}>
                        <Stack spacing={5} alignItems={'flex-start'}>
                            <Box className={`${styles.box1} ${styles.box}`}>
                                <Box className={styles.formChild} sx={{ flexGrow: 1 }}>
                                    <label htmlFor='uname' >
                                        <Typography variant='body' gutterBottom>
                                            User Name
                                        </Typography></label>
                                    {customTextFeild({ id: "uname", variant: "outlined", sx: { width: "90%" }, ...register("uname", { required: "User Name is required" }) })}
                                    {errors.uname?.message && <p style={{ color: "red" }}>{errors.uname.message}</p>}
                                </Box>
                            </Box>
                            <Box className={`${styles.box2} ${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='email' >
                                        <Typography variant='body' gutterBottom>
                                            Email Address
                                        </Typography></label>
                                    {customTextFeild({
                                        id: "email", variant: "outlined", type: 'text', sx: { width: "100%" }, ...register("email", {
                                            required: "email is required", pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                message: "invalid email"
                                            }
                                        })
                                    })}
                                    {errors.email?.message && <p style={{ color: "red" }}>{errors.email.message}</p>}
                                </Box>
                            </Box>
                            <Box className={`${styles.box2} ${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='password' >
                                        <Typography variant='body' gutterBottom>
                                            Password
                                        </Typography></label>
                                    {customTextFeild({ id: "password", variant: "outlined", sx: { width: "100%" }, ...register("password", { required: "password is required", minLength: 8 }) })}
                                    {errors.password?.message && <p style={{ color: "red" }}>{errors.password.message}</p>}
                                </Box>
                            </Box>

                            <Box className={`${styles.box2} ${styles.box}`}>
                                <Box className={styles.formChild}>
                                    <label htmlFor='confirmPassword' >
                                        <Typography variant='body' gutterBottom>
                                            Confirm Password
                                        </Typography></label>
                                    {customTextFeild({
                                        id: "confirmPassword", variant: "outlined", sx: { width: "100%" }, ...register("confirmPassword", {
                                            required: "confirm Password is required",
                                            validate: (value, formValues) =>
                                                value === formValues.password || 'password not matching',
                                        })
                                    })}
                                    {errors.confirmPassword?.message && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
                                </Box>

                            </Box>
                        </Stack>
                        {rowDivider({ node: { margin: "20px 0px" } })}
                    </form>
                </DialogContent>
                <DialogActions>

                    <Stack spacing={2} justifyContent={'flex-end'} direction={'row'} alignItems={'center'}>
                        <Button type="reset" variant="text" onClick={() => reset()}>Reset</Button>
                        <Button type="submit" variant="contained" onClick={handleSubmit(funcSubmit2)}>Save</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
