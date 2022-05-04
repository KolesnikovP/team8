/* eslint-disable no-unused-vars */
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
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
  return (
    <BrowserRouter>
        <Nav />
        <div className={style.main}>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addPost" element={<FindForm />} />
            <Route path="/accessForm" element={<AccessForm />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
