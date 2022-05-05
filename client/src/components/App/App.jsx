/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
// import Footer from '../Footer/Footer';
import style from './App.module.css';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';
import Profile from '../Profile/Profile';
import PostList from '../PostList/PostList';
import MainPage from '../MainPage/MainPage';
import Navbar from '../Nav/Navbar';

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
        <body>
          <div className={style.main}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/postList" element={user ? <PostList /> : <MainPage />} />
              {/* <Route
                path="/addPost"
                element={user ? <FindForm handleClose={handleClose} open={open} /> : <MainPage />}
              /> */}
              <Route path="/accessForm" element={user ? <AccessForm /> : <MainPage />} />
              <Route path="/profile" element={user ? <Profile /> : <MainPage />} />
            </Routes>
            <FindForm handleClose={handleClose} open={open} />
          </div>
        </body>
        {/* <Footer className={style.Footer} /> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
