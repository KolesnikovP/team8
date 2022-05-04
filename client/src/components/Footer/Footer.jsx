/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';

export default function Footer() {
  return (
    <footer className="fixed-bottom">
      <div className={style.mainFooter}>
        <div className={style.row}>
          <div className={style.col}>
            <img className={style.footerImg} src="/img/logo.png" alt="" />
            <p>thats big project for all of you</p>
          </div>
          <div className="col1">
            <h3>TeamLead JS fullstack dev</h3>
            <p>TeamLead FullStack dev Alexey</p>
            <p className={style.email}>alex@mail.ru</p>
            <p className={style.gitLink}>
              <a href="/">GitHub</a>
            </p>

            <h4>+7-989-989-98-98</h4>
          </div>
          <div className="col1">
            <h3>TeamLead JS fullstack dev</h3>
            <p>FullStack dev Daniil</p>
            <p className={style.email}>alex@mail.ru</p>
            <p className={style.gitLink}>
              <a href="/">GitHub</a>
            </p>
            <h4>+7-906-250-44-10</h4>
          </div>
          <div className="col1">
            <h3>TeamLead JS fullstack dev</h3>
            <p>FullStack dev Ilya</p>
            <p className={style.email}>alex@mail.ru</p>
            <p className={style.gitLink}>
              <a href="/">GitHub</a>
            </p>
            <h4>+7-900-650-70-00</h4>
          </div>
        </div>
      </div>
    </footer>
  );
}
