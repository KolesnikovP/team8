/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import Footer from '../Footer/Footer';
import style from './App.module.css';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';
import Profile from '../Profile/Profile';
import PostList from '../PostList/PostList';
import MainPage from '../MainPage/MainPage';
import Navbar from '../Nav/Navbar';
import MainAuth from '../MainAuth/MainAuth';
import LocalProfile from '../LocalProfile/LocalProfile';
import Loader from '../Loader/Loader';
import Dialog from '../Dialog/Dialog';
import DialogsButton from '../DialogsButton/DialogsButton';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
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
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Navbar className={style.Nav} handelClickOpen={handelClickOpen} />
        <Routes>
          <Route path="/" element={user?.id ? <MainAuth /> : <MainPage />} />
          {/* <Route path="/main" element={<MainAuth />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/postList" element={user?.id ? <PostList /> : <Loader />} />
          <Route path="/accessForm" element={user?.id ? <AccessForm /> : <Loader />} />
          <Route exact path="/profile" element={user?.id ? <Profile /> : <Loader />} />
          <Route exact path="/profile/:id" element={user?.id ? <LocalProfile /> : <Loader />} />
          <Route exact path="/chat" element={<Dialog />} />
        </Routes>
        <FindForm handleClose={handleClose} open={open} />
        <Footer />
        <DialogsButton />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
