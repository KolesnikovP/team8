/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Badge,
  Tooltip,
  ListItemButton,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function UsersListItem(props) {
  const { user, handleOpen, setUserState, handleClickOpenChat } = props;
  const [randomRank, setRandomRank] = useState(1);
  const [rankColor, setRankColor] = useState('default');

  useEffect(() => {
    setRandomRank(Math.floor(Math.random() * 4) + 1);
    if (randomRank >= 4) {
      setRankColor('success');
    } else if (randomRank === 3) {
      setRankColor('warning');
    } else {
      setRankColor('error');
    }
  }, [randomRank]);

  const updateUserState = useCallback(() => {
    setUserState(user);
  });

  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={
        <Tooltip
          title="Пригласить в игру"
          enterDelay={500}
          leaveDelay={200}
          disableInteractive
          placement="right-start"
        >
          <IconButton edge="end" aria-label="delete" onClick={handleClickOpenChat}>
            <MailOutlineIcon />
          </IconButton>
        </Tooltip>
      }
      sx={{
        maxHeight: '5rem',
        mb: '1rem',
      }}
      disablePadding
    >
      <ListItemButton
        divider
        onClick={() => {
          handleOpen();
          updateUserState();
        }}
      >
        <ListItemAvatar>
          <Badge badgeContent={randomRank} color={rankColor}>
            <Avatar alt={`${user.steamNickname}'s avatar`} src={user.steamAvatar} />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={user.steamNickname}
          secondary={
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {user.description}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
