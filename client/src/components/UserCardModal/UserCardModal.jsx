/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { Dialog, DialogContent, Button, DialogActions, DialogContentText } from '@mui/material';
import React, { useCallback } from 'react';

function UserCardModal(props) {
  const { openModal, setOpenModal, user } = props;
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  console.log(props);

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth>
      <DialogContent>
        <DialogContentText>{user.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserCardModal;
