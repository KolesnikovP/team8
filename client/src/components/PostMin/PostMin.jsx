/* eslint-disable react/prop-types */
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import style from './PostMin.module.css';

function PostMin({ post }) {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: '2rem', border: '1px solid #90caf9', padding: '1rem' }}
    >
      <Grid item xs={1}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Avatar src={post.userSteamAvatar} alt="userAvatar" sx={{ marginRight: '1rem' }} />
          {post.author}
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ wordWrap: 'break-word', paddingLeft: '2rem' }}>
          {post.description}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${post.gameAppId}/header.jpg?t=1650992920`}
          alt={`appIcon_${post.gameName}`}
          width="100px"
        />
        {/* <Typography color="#b8860b" sx={{ textAlign: 'center' }}> */}
        {/* {post.gameName}
        </Typography> */}
      </Grid>
      <Grid item xs={2}>
        <Typography>{post.userHours}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <IconButton>
            <MailOutlineIcon color="primary" onClick={() => navigate(`/chat`)} />
          </IconButton>
          <IconButton onClick={() => navigate(`/profile/${post.authorId}`)}>
            <AssignmentIndIcon color="primary" />
          </IconButton>
          <IconButton>
            <PersonAddIcon color="primary" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Typography>{post.createdAt.slice(0, post.createdAt.length - 14)}</Typography>
      </Grid>
    </Grid>
  );
}

export default PostMin;
