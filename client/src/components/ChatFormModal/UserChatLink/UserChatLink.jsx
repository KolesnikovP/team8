/* eslint-disable react/prop-types */
import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFecthUserChats } from '../../../redux/thunk/user';

export default function UserChatLink({ getId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getFecthUserChats(user));
  }, []);

  const { chats } = useSelector((state) => state.userChatReducer);
  console.log(chats);

  return (
    <List>
      {chats.sendToClientUsers.map((el) => {
        return (
          <ListItem button key="RemySharp" onClick={() => getId(el.steamId)}>
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
