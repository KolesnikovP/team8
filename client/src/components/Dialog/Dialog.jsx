import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function Dialog() {
  const { user } = useSelector((state) => state.userReducer);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(user?.steamNickname);
  }, [user]);

  function connect() {
    socket.current = new WebSocket('ws://localhost:9999');

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: 'connection',
        username,
        id: 1,
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
  }

  const sendMessage = async () => {
    console.log(user);
    const message = {
      username,
      message: value,
      id: Date.now(),
      idUser: { idUser: user.steamId },
      event: 'message',
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <button type="button" onClick={connect}>
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
          <button type="button" onClick={sendMessage}>
            Отправить
          </button>
        </div>
        <div className="messages">
          {messages.map((mess) => (
            <div key={mess.id}>
              {mess.event === 'connection' ? (
                <div>Пользователь {mess.username} подключился</div> /// //// !!!!!!!!!!!!!!!!!!! бэйджик с materialui
              ) : (
                <div>
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

export default Dialog;
