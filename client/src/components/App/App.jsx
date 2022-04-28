import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../store';
import Nav from '../Nav/Nav';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <Routes>
          <Route />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
