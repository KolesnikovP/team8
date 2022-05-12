/* eslint-disable react/prop-types */
import { List, Typography } from '@mui/material';
import React from 'react';
import classes from '../ChatFormModal.module.css';

function FakeMessageArea() {
  return (
    <List className={classes.messageArea}>
      <Typography sx={{ textAlign: 'center' }} variant="h5">
        Выберите собеседника слева
      </Typography>
    </List>
  );
}

export default FakeMessageArea;
