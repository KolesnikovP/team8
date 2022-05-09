import { Box } from '@mui/material';
import React from 'react';
import style from './Loader.module.css';

function Loader() {
  return (
    <Box sx={{ height: '100vh' }}>
      <img className={style.spinner} src="./pngwing.com.png" alt="loading-png" />
    </Box>
  );
}

export default Loader;
