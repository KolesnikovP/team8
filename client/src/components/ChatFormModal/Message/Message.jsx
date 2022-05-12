/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Grid, ListItem, ListItemText, Divider } from '@mui/material';

function Message({ mess, user }) {
  const [align, setAlign] = useState(null);
  useEffect(() => {
    // console.log(mess);
    if (Number(user.id) === Number(mess.idUser)) {
      setAlign('right');
    } else {
      setAlign('left');
    }
  }, [mess, user]);

  return (
    <ListItem on>
      <Grid container>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={align} secondary={mess.userName} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={align} primary={mess.messageText} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={align} secondary={mess.createdAt} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Message;
