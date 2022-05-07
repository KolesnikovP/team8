import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import style from './Login.module.css';

export default function Login() {
  useEffect(() => {
    window.open('http://localhost:4000/auth/steam', '_self');
  }, []);
  return (
    <Box sx={{ height: '100vh' }}>
      <img className={style.spinner} src="./pngwing.com.png" alt="loading-png" />
    </Box>
  );
}
