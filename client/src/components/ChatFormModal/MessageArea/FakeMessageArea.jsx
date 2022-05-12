/* eslint-disable react/prop-types */
import { List, Fab, TextField, Grid, Divider } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import classes from '../ChatFormModal.module.css';

function FakeMessageArea() {
  return (
    <>
      <List className={classes.messageArea}>
        <Fab color="primary" aria-label="add">
          <CloseOutlinedIcon />
        </Fab>
      </List>
      <Divider />
      <Grid container style={{ padding: '1rem' }}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab color="primary" aria-label="add" size="small">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default FakeMessageArea;
