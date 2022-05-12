/* eslint-disable react/prop-types */
import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFecthUserChats } from '../../../redux/thunk/user';

export default function UserChatLink({ getId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { chats } = useSelector((state) => state.userChatReducer);

  useEffect(() => {
    dispatch(getFecthUserChats(user));
  }, []);

  return (
    <List>
      {chats.usersWithChat.length > 0 &&
        chats.usersWithChat.map((el) => {
          return (
            <ListItem
              button
              key={el.id + Math.random()}
              onClick={() => {
                getId(el.steamId);
              }}
            >
              <ListItemIcon>
                <Avatar alt="userAvatar" src={el.steamAvatar} />
              </ListItemIcon>
              <ListItemText primary={el.steamNickname}>{el.steamNickname}</ListItemText>
            </ListItem>
          );
        })}
    </List>
  );
}
