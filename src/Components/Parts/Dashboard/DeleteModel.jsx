import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function BasicModal({open, setOpen, deleteFunction, deleteItem=null}) {
  
    function handleClose(){
        setOpen(false)
    }

  return (deleteItem&&
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Id: {deleteItem.id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure want to delete.
          </Typography>
          <Button variant="contained" color="error" onClick={()=>deleteFunction(deleteItem.id)}>
            Delete
        </Button>
        </Box>
        
      </Modal>
    </div>
  );
}
