/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Grid, ListItem, ListItemText } from '@mui/material';

function Message({ mess, user }) {
  const [align, setAlign] = useState('');
  useEffect(() => {
    console.log(mess);
    if (Number(user.id) === Number(mess.idUser)) {
      setAlign('right');
    } else {
      setAlign('left');
    }
  }, [mess, user]);

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={align} primary={mess.messageText} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={align} secondary={mess.createdAt} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Message;
