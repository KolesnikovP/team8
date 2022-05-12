/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { List, Fab, TextField, Grid, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@mui/icons-material/Send';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import { getNews } from '../../../redux/thunk/chat';
import classes from '../ChatFormModal.module.css';

function MessageArea({ user, chatLink, socket, messages, setMessages }) {
  const chatId = `http://localhost:3000/chat/${chatLink}`;
  const [value, setValue] = useState('');

  const [history, setHistory] = useState('');

  useEffect(() => {
    getNews(chatId, setHistory);
    socket.current = new WebSocket('ws://localhost:4000');
    const splittedParams = chatLink.split('-')[1];

    socket.current.onopen = () => {
      const message = {
        event: 'connection',
        username: user.steamNickname,
        chatId: chatLink,
        userSend: chatLink.split('-')[0],
        userRecieved: splittedParams,
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log('Socket закрыт');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
    };
  }, [user?.length, chatLink]);

  // const closeChat = async () => {
  // const msgData = {
  //   event: 'close',
  //   data: messages,
  // };
  // socket.current.send(JSON.stringify(msgData));
  // socket.current.close();
  // };

  const sendMessage = async () => {
    const uniqId = uuidv4().split('-');
    const message = {
      id: uniqId[1],
      username: user.steamNickname,
      userId: user.steamId,
      message: value,
      chatId: chatLink,
      event: 'message',
      created: Date.now(),
      idUser: user.id,
      createdAt: Date.now(),
      messageText: value,
      userName: user.steamNickname,
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  const scrollToBottom = useScrollToBottom();

  return (
    <>
      <List className={classes.messageArea} sx={{ flexDirection: 'column-reverse' }}>
        <ScrollToBottom className={classes.messageArea}>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {history?.length ? (
              history?.map((msg) => {
                return <Message key={msg.id} mess={msg} user={user} />;
              })
            ) : (
              <Typography sx={{ textAlign: 'center' }}>История сообщений пуста</Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {messages.map((mess) =>
              mess.event === 'connection' ? [] : <Message key={mess.id} mess={mess} user={user} />
            )}
          </Box>
        </ScrollToBottom>
      </List>
      <Grid container style={{ padding: '1rem' }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              sendMessage();
              scrollToBottom();
            }}
            size="small"
          >
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default MessageArea;
