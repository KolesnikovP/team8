/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import Footer from '../Footer/Footer';
import style from './App.module.css';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';
import Profile from '../Profile/Profile';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const { user } = useSelector((state) => state.userReducer);
  return (
    <BrowserRouter>
      <Nav className={style.Nav} />
      <body>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/addPost" element={<FindForm />} />
          <Route path="/accessForm" element={<AccessForm />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </body>
      <footer>
        <Footer className={style.Footer} />
      </footer>
    </BrowserRouter>
  );
}

export default App;
