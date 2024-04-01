import { MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react'

export default function DropDown({ defaultValue, maxValue }) {

    const options = [];
    function completeOption() {
        for (let i = 1; i <= maxValue; i++) {
            options.push({ value: i, label: i });
        }
    }

    completeOption();


    return (
        <TextField
            select
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
