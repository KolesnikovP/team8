/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getNews } from '../../redux/thunk/chat';

function WebSock({ user }) {
  const params = useParams();
  const chatId = `http://localhost:3000/chat/${params.id}`;
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [username, setUsername] = useState('');
  const [history, setHistory] = useState('');

  useEffect(() => {
    getNews(chatId, setHistory);
    socket.current = new WebSocket('ws://localhost:4000');
    const splittedParams = params.id.split('-')[1];

    socket.current.onopen = () => {
      const message = {
        event: 'connection',
        username: user.steamNickname,
        chatId: params.id,
        userSend: params.id.split('-')[0],
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
      chatId: params.id,
      event: 'message',
      created: Date.now(),
    };
    // console.log(message)
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
          <button type="button" onClick={sendMessage}>
            Отправить
          </button>
          <button type="button" onClick={closeChat}>
            Закрыть чат
          </button>
        </div>
        <div>
          {history?.length &&
            history?.map((msg) => {
              return (
                <div className="message" key={msg.idSms}>
                  {msg.userName}. {msg.messageText}
                </div>
              );
            })}
        </div>
        <div className="messages">
          {messages.map((mess) => (
            <div key={Math.random()}>
              {mess.event === 'connection' ? (
                []
              ) : (
                // <div className="connection_message">Пользователь {mess.username} подключился</div>
                <div className="message">
                  {mess.username}. {mess.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WebSock;
