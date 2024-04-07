import { MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartAsync } from '../cartSlice';

export default function DropDown({ defaultValue, maxValue, item }) {

    const options = [];
    const dispatch = useDispatch();
    function completeOption() {
        for (let i = 1; i <= maxValue; i++) {
            options.push({ value: i, label: i });
        }
    }

    completeOption();

    function handleChange(e) {
        dispatch(updateCartAsync({ ...item, quantity: +e.target.value }))
    }


    return (
        <TextField
            select
            onChange={handleChange}
            defaultValue={defaultValue}
            inputProps={{
                sx: { padding: "7px 10px" }
            }}
            sx={{ marginTop: "4px" }}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}
