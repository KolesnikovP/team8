import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  return (
    <div>
      <img className="logo" src="img/logo.svg" alt="" />
      <nav>
        <ul className="nav__links">
          <li>
            <button type="button" onClick={() => navigate('/fsdfds')}>
              дом
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/fsdfds')}>
              Логин
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/fsdfds')}>
              Логаут
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
