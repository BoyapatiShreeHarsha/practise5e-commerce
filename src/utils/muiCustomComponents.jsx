import { Button, styled } from "@mui/material";
import React from 'react';


const CustomMUIButton = styled(Button)((classprops) => ({
    "&:hover": {
        backgroundColor: classprops?.hover_background_color,
    },
}))

export const customButton = (info) => {
    const { classprops = {}, propsToBePassed = {}, label = '', id = '' } = info;
    return (
        <>
            <CustomMUIButton data-testid={`custom-button-${info.id}`} {...classprops} {...propsToBePassed} id={id} >{label}</CustomMUIButton>
        </>
    )
}