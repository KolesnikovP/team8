/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
// import Footer from '../Footer/Footer';
import style from './App.module.css';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';
import Profile from '../Profile/Profile';
import PostList from '../PostList/PostList';
import MainPage from '../MainPage/MainPage';

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
        <div className={style.main}>
          <Routes>
            <Route path="/" element={user.id ? <PostList /> : <MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addPost" element={user.id ? <FindForm /> : <MainPage />} />
            <Route path="/accessForm" element={user.id ? <AccessForm /> : <MainPage />} />
            <Route path="/profile" element={user.id ? <Profile /> : <MainPage />} />
          </Routes>
        </div>
      </body>
      {/* <Footer className={style.Footer} /> */}
    </BrowserRouter>
  );
}

export default App;
