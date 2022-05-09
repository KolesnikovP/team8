/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  Avatar,
  Grid,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCardModal(props) {
  const navigate = useNavigate();
  const { openModal, setOpenModal, user } = props;
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3} columns={2}>
              <Avatar
                alt={`${user.steamNickname}'s avatar`}
                src={user.steamAvatar}
                sx={{ height: '7rem', width: '7rem' }}
                variant="rounded"
              />
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Typography variant="h6" sx={{ maxWidth: 'fit-content' }}>
                    {user.steamNickname}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Tooltip
                    title="Пригласить в игру"
                    enterDelay={500}
                    leaveDelay={100}
                    disableInteractive
                    placement="top-end"
                  >
                    <IconButton edge="end" aria-label="delete">
                      <GroupAddOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={1.5}>
                  <Tooltip
                    title="Посмотреть профиль игрока"
                    enterDelay={500}
                    leaveDelay={100}
                    disableInteractive
                    placement="top-start"
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => navigate(`/profile/${user.steamId}`)}
                    >
                      <AssignmentOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{user.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <br />
              <Typography sx={{ fontSize: '.7rem' }} align="right">
                Дата регистрации:{' '}
                {user.createdAt
                  ?.slice(0, user.createdAt.length - 14)
                  .split('-')
                  .reverse()
                  .join('.')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default UserCardModal;
