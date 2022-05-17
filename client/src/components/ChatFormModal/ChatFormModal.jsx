/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
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

function ChatFormModal({
  user,
  handleCloseChat,
  openChat,
  isParams,
  chatLink,
  getId,
  setIsParams,
}) {
  // const [isClose, setClose] = useState(false);

  const socket = useRef();
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   return () => console.log('close');
  // }, []);
  return (
    <Dialog
      open={openChat}
      onClose={() => {
        const msgData = {
          event: 'close',
          data: messages,
        };
        socket.current?.send(JSON.stringify(msgData));
        socket.current?.close();
        handleCloseChat();
        setMessages([]);
        setIsParams(false);
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
            {isParams ? (
              <MessageArea
                user={user}
                chatLink={chatLink}
                socket={socket}
                messages={messages}
                setMessages={setMessages}
              />
            ) : (
              <FakeMessageArea />
            )}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default ChatFormModal;
