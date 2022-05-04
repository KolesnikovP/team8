import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: 2 }} onClick={() => navigate('/')}>
            <img width="100px" className="logo" src="/img/logo.png" alt="" />
          </Box>
          {user.id ? (
            <>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 0, marginRight: '1rem' }}
                onClick={() => navigate('/addPost')}
              >
                создать заявку
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={() => navigate('/postList')}
              >
                посмотреть заявки
              </Typography>
            </>
          ) : (
            <Typography variant="h6" component="div" onClick={steam}>
              Войти
            </Typography>
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
    </Box>
  );
}
