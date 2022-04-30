/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import style from './App.module.css';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div className={style.mainPage}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/addPost" element={<FindForm />} />
          <Route path="/accessForm" element={<AccessForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
