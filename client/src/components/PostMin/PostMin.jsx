/* eslint-disable react/prop-types */
import { Avatar, Button, Grid, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import React from 'react';
// import { useSelector } from 'react-redux';
import style from './PostMin.module.css';

function PostMin({ post }) {
  return (
    <Grid container spacing={2} sx={{ marginTop: '2rem', border: '1px solid #90caf9' }}>
      <Grid item xs={3}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          {post.author}
          <Avatar src={post.userSteamAvatar} alt="userAvatar" className={style.avatar} />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography noWrap>{post.description}</Typography>
      </Grid>
      <Grid item xs={2}>
        {/* <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${post.gameAppId}/header.jpg?t=1650992920`}
          alt={`appIcon_${post.gameName}`}
          className={style.gameImg}
        /> */}
        <span>{post.gameName}</span>
      </Grid>
      <Grid item xs={2}>
        <span>{post.userHours}</span>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Button type="button"> Открыть профиль</Button>
          <Button type="button">Написать хуеплету</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PostMin;
