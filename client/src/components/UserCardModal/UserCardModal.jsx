/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
  Avatar,
} from '@mui/material';
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
        <Avatar
          alt={`${user.steamNickname}'s avatar`}
          src={user.steamAvatar}
          sx={{ height: '7rem', width: '7rem' }}
          variant="rounded"
        />
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
