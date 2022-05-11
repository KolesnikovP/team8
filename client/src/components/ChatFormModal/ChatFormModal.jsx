/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Avatar,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Grid,
  Paper,
  Dialog,
  ListItemButton,
  Box,
} from '@mui/material';
import classes from './ChatFormModal.module.css';
import MessageArea from './MessageArea/MessageArea';
import FakeMessageArea from './MessageArea/FakeMessageArea';

function ChatFormModal({ user, handleCloseChat, openChat }) {
  const [chatLink, setChatLink] = useState('');
  const [isParams, setIsParams] = useState(false);
  function getId(id) {
    if (Number(user.steamId) > Number(id)) {
      setChatLink(`${id}-${user.steamId}`);
    } else {
      setChatLink(`${user.steamId}-${id}`);
    }
    setIsParams(true);
  }
  return (
    <Dialog
      open={openChat}
      onClose={() => {
        handleCloseChat();
      }}
      fullWidth
      maxWidth="lg"
    >
      <Box component="div">
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <ListItemButton key="RemySharp" onClick={() => getId('76561198127962810')}>
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                <ListItemText secondary="online" align="right" />
              </ListItemButton>
              <ListItemButton key="Alice" className="qqqqqqqqqq" id="11111">
                <ListItemIcon>
                  <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                </ListItemIcon>
                <ListItemText primary="Alice">Alice</ListItemText>
              </ListItemButton>
              <ListItem button key="CindyBaker">
                <ListItemIcon>
                  <Avatar
                    alt="Cindy Baker"
                    src="https://material-ui.com/static/images/avatar/2.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            {isParams ? <MessageArea user={user} chatLink={chatLink} /> : <FakeMessageArea />}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default ChatFormModal;
