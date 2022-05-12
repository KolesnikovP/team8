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
  console.log(chats);
  const actions = [
    {
      icon: (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => navigate('/')}
          color="inherit"
        >
          <Avatar alt="Remy Sharp" src={user.steamAvatar} />
        </IconButton>
      ),
      name: 'Copy',
    },
  ];

  return (
    <div>
      {chats?.sendToClientLinks !== undefined ? (
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
