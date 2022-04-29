/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../store';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import style from './style.css';
import FindForm from '../FindForm/FindForm';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/addPost" element={<FindForm />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
