import React, { useEffect, useState } from 'react'
import { rowDivider } from './muiCustomComponents';
import { Box, Button, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ title, message, cancelName, cancelFunction, saveName, saveFunction, color }) {
  const [open, setOpen] = useState(false);

  function handleCancel() {
    setOpen(false);
    cancelFunction();
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSave() {
    setOpen(false);
    saveFunction();
  }

  useEffect(() => {
    setOpen(true);
  }, [])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        {rowDivider({ node: { padding: "10px 0px" } })}
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignContent: "center" }}>
          <Button variant="text" onClick={handleCancel}>{cancelName}</Button>
          <Button variant="contained" onClick={handleSave} sx={{ marginLeft: "10px" }} color={color}>{saveName}</Button>
        </Box>
      </Box>
    </Modal>
  )
}
