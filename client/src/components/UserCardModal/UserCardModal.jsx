/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import React, { useCallback, useRef } from 'react';

function UserCardModal(props) {
  const { openModal, setOpenModal, userId, usersList } = props;
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const userRef = useRef();

  userRef.current = usersList.find((user) => user.id === userId);

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth>
      <DialogContent>
        <DialogContentText>To subscribe</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserCardModal;
