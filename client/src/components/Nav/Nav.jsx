/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';

export default function Nav({ handelClickOpen }) {
  const { user } = useSelector((state) => state.userReducer);
  const steam = () => {
    window.open('http://localhost:4000/auth/steam', '_self');
  };
  const logout = () => {
    window.open('http://localhost:4000/auth/logout', '_self');
  };
  return (
    <div className={style.navBar}>
      <Link to="/">
        <img width="100px" className="logo" src="/img/logo.png" alt="" />
      </Link>
      {!user.id ? (
        <nav>
          <ul className={style.nav__links}>
            <li>
              <Link to="/login">
                <button onClick={steam} className={style.mainNavButton} type="button">
                  Войти
                </button>
              </Link>
            </li>
            <li>
              <Link to="/info">
                <button className={style.mainNavButton} type="button">
                  Информация
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <button className={style.mainNavButton} onClick={handelClickOpen} type="button">
            Найти тиммейта
          </button>
          <ul className={style.list}>
            <li className={style.listItem}>
              <img src={user.steamAvatar} alt="" className={style.avatar} />
            </li>

            <li className={style.listItem}>
              <Link to="/profile">{user.steamNickname}</Link>
            </li>
            <button onClick={logout} className={style.mainNavButton} type="button">
              Выйти
            </button>
          </ul>
        </>
      )}
    </div>
  );
}
