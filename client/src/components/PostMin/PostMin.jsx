/* eslint-disable react/prop-types */
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import React from 'react';
// import { useSelector } from 'react-redux';
// import style from './PostMin.module.css';

function PostMin({ post }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: '2rem', border: '1px solid #90caf9', padding: '1rem' }}
    >
      <Grid item xs={1}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          {post.author}
          <Avatar src={post.userSteamAvatar} alt="userAvatar" />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ wordWrap: 'break-word', paddingLeft: '2rem' }}>
          {post.description}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        {/* <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${post.gameAppId}/header.jpg?t=1650992920`}
          alt={`appIcon_${post.gameName}`}
          className={style.gameImg}
        /> */}

        <Typography color="#b8860b">{post.gameName}</Typography>
      </Grid>
      <Grid item xs={2}>
        <span>{post.userHours}</span>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <IconButton>
            <MailOutlineIcon color="primary" />
          </IconButton>
          <IconButton>
            <AssignmentIndIcon color="primary" />
          </IconButton>
          <IconButton>
            <PersonAddIcon color="primary" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PostMin;
