/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { SpeedDialAction, SpeedDialIcon, SpeedDial, IconButton, Avatar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFecthUserChats } from '../../redux/thunk/user';

export default function DialogsButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const id = user.steamId;

  useEffect(() => {
    dispatch(getFecthUserChats(user));
  }, [user]);

  const { chats } = useSelector((state) => state.userChatReducer);
  console.log(chats.allUsers);

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
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
      ))}
    </SpeedDial>
  );
}
