/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import { Avatar, Grid, IconButton, Typography, Box } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ClearIcon from '@mui/icons-material/Clear';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { delPost } from '../../redux/thunk/posts';

function PostMin({ post, local, profile, handleClickOpenChat, getId }) {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const del = () => {
    dispatch(delPost(post.id));
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: '2rem', border: '1px solid #90caf9', padding: '1rem' }}
    >
      <Grid item xs={2}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Avatar src={post.userSteamAvatar} alt="userAvatar" sx={{ marginRight: '1rem' }} />
          {post.author}
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ wordWrap: 'break-word', paddingLeft: '2rem' }}>
            {post.description}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${post.gameAppId}/header.jpg?t=1650992920`}
          alt={`appIcon_${post.gameName}`}
          width="100px"
        />
      </Grid>
      <Grid item xs={2}>
        <Typography>{post.userHours}</Typography>
      </Grid>
      <Grid item xs={2}>
        {profile && user?.steamId === post.authorId ? (
          <IconButton onClick={del}>
            <ClearIcon color="primary" />
          </IconButton>
        ) : (
          ''
        )}
        {local ? (
          ''
        ) : (
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            {user?.steamId === post.authorId ? (
              <IconButton onClick={del}>
                <ClearIcon color="primary" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  handleClickOpenChat();
                  getId(post.authorId);
                }}
              >
                <MailOutlineIcon color="primary" />
              </IconButton>
            )}

            <IconButton onClick={() => navigate(`/profile/${post.authorId}`)}>
              <AssignmentIndIcon color="primary" />
            </IconButton>
          </Box>
        )}
      </Grid>
      <Grid item xs={1}>
        <Box sx={{ width: '300px' }}>
          <Typography>{post.createdAt.slice(0, post.createdAt.length - 14)}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PostMin;
