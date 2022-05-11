/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Fab,
  ListItemText,
  ListItem,
  List,
  Grid,
  Paper,
  Divider,
  Dialog,
  ListItemButton,
  Box,
} from '@mui/material';
import classes from './ChatFormModal.module.css';

import MessageArea from './MessageArea/MessageArea';
import FakeMessageArea from './MessageArea/FakeMessageArea';
import UserChatLink from './UserChatLink/UserChatLink';

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
            <Divider />
            <Divider />
            <UserChatLink getId={getId} />
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
