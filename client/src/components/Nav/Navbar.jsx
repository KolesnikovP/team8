/* eslint-disable react/prop-types */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Navbar({ handelClickOpen }) {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const steam = () => {
    navigate('/login');
    window.open('http://localhost:4000/auth/steam', '_self');
  };
  const logout = () => {
    window.open('http://localhost:4000/auth/logout', '_self');
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'main' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ mr: 2 }} onClick={() => navigate('/')}>
          <img width="100px" className="logo" src="/img/logo.png" alt="" />
        </Box>
        {user.id ? (
          <>
            <MenuItem
              variant="h6"
              component="div"
              sx={{ flexGrow: 0, marginRight: '1rem' }}
              onClick={handelClickOpen}
            >
              создать заявку
            </MenuItem>
            <MenuItem
              variant="h6"
              component="div"
              sx={{ flexGrow: 0 }}
              onClick={() => navigate('/postList')}
            >
              посмотреть заявки
            </MenuItem>
          </>
        ) : (
          <MenuItem variant="h6" component="div" onClick={steam}>
            Войти
          </MenuItem>
        )}
        {user.id && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src={user.steamAvatar} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>Профиль</MenuItem>
              <MenuItem onClick={logout}>Выйти</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
