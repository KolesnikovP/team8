/* eslint-disable react/prop-types */
import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/prop-types
function Comment({ comment }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '700px',
        alignItems: 'center',
        border: '1px solid #90caf9',
        marginTop: '1rem',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar alt="Remy Sharp" src={comment.userAvatar} />
        <Typography sx={{ paddingLeft: '10px' }}>{comment.userName}</Typography>
      </Box>
      <Typography sx={{ width: '200px' }}>{comment.messageText}</Typography>
      <Typography>{comment.createdAt.slice(0, comment.createdAt.length - 8)}</Typography>
    </Box>
  );
}

export default Comment;
