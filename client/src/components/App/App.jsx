/* eslint-disable no-unused-vars */
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import Footer from '../Footer/Footer';
import style from './App.module.css';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';
import Profile from '../Profile/Profile';
import PostList from '../PostList/PostList';
import { store } from '../../store';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const { user } = useSelector((state) => state.userReducer);
  const [open, setOpen] = useState(false);
  const handelClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <BrowserRouter>
      <Nav className={style.Nav} handelClickOpen={handelClickOpen} />
      <body>
        <div className={style.main}>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addPost" element={<FindForm handleClose={handleClose} open={open} />} />
            <Route path="/accessForm" element={<AccessForm />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </body>
      <Footer className={style.Footer} />
    </BrowserRouter>
  );
}

export default App;
