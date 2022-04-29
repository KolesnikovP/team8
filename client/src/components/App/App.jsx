/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../store';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import style from './App.module.css';

function App() {
  return (
    <div className={style.mainPage}>
      <BrowserRouter>
        <Provider store={store}>
          <Nav />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/addPost" element={<FindForm />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
