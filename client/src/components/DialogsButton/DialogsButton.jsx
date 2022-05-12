/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { SpeedDial, IconButton, Avatar } from '@mui/material';
import MailOutline from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFecthUserChats } from '../../redux/thunk/user';

export default function DialogsButton({ handleClickOpenChat }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  // const id = user.steamId;

  useEffect(() => {
    dispatch(getFecthUserChats(user));
  }, [user]);

  const { chats } = useSelector((state) => state.userChatReducer);
  return (
    <div>
      {chats?.chatLinks !== undefined ? (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<MailOutline />}
          onClick={handleClickOpenChat}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
