/* eslint-disable react/prop-types */
import { List, Fab, TextField, Grid, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@mui/icons-material/Send';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Message from '../Message/Message';
import { getNews } from '../../../redux/thunk/chat';
import classes from '../ChatFormModal.module.css';

function MessageArea({ user, chatLink }) {
  const chatId = `http://localhost:3000/chat/${chatLink}`;
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
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
  }, [user?.length]);

  const closeChat = async () => {
    const msgData = {
      event: 'close',
      data: messages,
    };
    socket.current.send(JSON.stringify(msgData));
    socket.current.close();
  };
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
    };
    // console.log(message)
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  return (
    <>
      <List className={classes.messageArea}>
        <Fab color="primary" aria-label="add" onClick={closeChat}>
          <CloseOutlinedIcon />
        </Fab>
        {history?.length &&
          history?.map((msg) => {
            return <Message mess={msg} user={user} />;
          })}
        {messages.map((mess) => (
          <div key={mess.id}>
            {mess.event === 'connection' ? (
              []
            ) : (
              // <div className="connection_message">Пользователь {mess.username} подключился</div>
              <Message mess={mess} user={user} />
            )}
          </div>
        ))}
      </List>
      <Divider />
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
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add" onClick={sendMessage}>
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default MessageArea;
