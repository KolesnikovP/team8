/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Box } from '@mui/material';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import Footer from '../Footer/Footer';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';
import Profile from '../Profile/Profile';
import PostList from '../PostList/PostList';
import MainPage from '../MainPage/MainPage';
import Navbar from '../Nav/Navbar';
import MainAuth from '../MainAuth/MainAuth';
import LocalProfile from '../LocalProfile/LocalProfile';
import Loader from '../Loader/Loader';
import DialogsButton from '../DialogsButton/DialogsButton';
import ChatFormModal from '../ChatFormModal/ChatFormModal';
import WebSock from '../WebSock/WebSock';
import CommentsList from '../CommentsList/Comments';
import { getCommentList } from '../../redux/thunk/comments';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getCommentList());
  }, [dispatch]);
  const { user } = useSelector((state) => state.userReducer);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const [open, setOpen] = useState(false);
  const handelClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openChat, setOpenChat] = useState(false);

  const handleClickOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Navbar handelClickOpen={handelClickOpen} />
            <Box
              sx={{
                flex: '1 1 auto',
                background: 'linear-gradient(180deg, rgb(40, 44, 52) 28%, rgb(0, 0, 0))',
                zIndex: '1',
              }}
            >
              <Routes>
                <Route path="/" element={user?.id ? <MainAuth /> : <MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/postList" element={user?.id ? <PostList /> : <Loader />} />
                <Route path="/accessForm" element={user?.id ? <AccessForm /> : <Loader />} />
                <Route path="/profile" element={user?.id ? <Profile /> : <Loader />} />
                <Route path="/comments" element={user?.id ? <CommentsList /> : <Loader />} />
                <Route
                  exact
                  path="/profile/:id"
                  element={user?.id ? <LocalProfile /> : <Loader />}
                />
                <Route exact path="/chat/:id" element={<WebSock user={user} />} />
              </Routes>
              <FindForm handleClose={handleClose} open={open} />
              {user?.id ? <DialogsButton handleClickOpenChat={handleClickOpenChat} /> : ''}
              <ChatFormModal handleCloseChat={handleCloseChat} openChat={openChat} user={user} />
            </Box>
            <Footer sx={{ flex: '0 0 auto' }} />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
