import { Box, Button, TextField, styled } from "@mui/material";
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

export const rowDivider = (obj) => {
    const node = obj?.node;
    return (<div style={{ padding: node?.padding || "" }}>
        <div
            className='rowDivider'
            style={{
                border: 'none',
                borderBottom: node?.color ? `1px solid ${node?.color}` : `1px solid black`,
                opacity: node?.color ? "1" : "0.4",
                margin: node?.margin
            }}>
        </div>
    </div>)
}


const StyledTextField = styled(TextField)(({ classprops }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '2px',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '2px',
        minHeight: '0px !important'
    },
    '& input': {
        padding: '0px 6px !important',
        fontSize: '12px',
        height: '28px',
        borderRadius: '2px',
        minHeight: '0px !important',
    },
    '& fieldset': {
        border: classprops?.fieldsetBorder || '',
    }
}));


export const customTextFeild = (info) => {
    return (

        <StyledTextField {...info} />

    )
}
