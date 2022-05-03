/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';

export default function Footer() {
  return (
    <div className={style.footerContainer}>
      <div className={style.footer}>
        <div className={style.footerHeading}>
          <div>
            <h2>About Us</h2>
            <div>
              <Link to="/">Lexa</Link>
            </div>
            <div>
              <Link to="/">dan</Link>
            </div>
            <div>
              <Link to="/">Ilya</Link>
            </div>
          </div>
          <div>
            <h2>Contact Us</h2>
            <div>
              <Link to="/">Lexa</Link>
            </div>
            <div>
              <Link to="/">Lexa</Link>
            </div>
            <div>
              <Link to="/">Lexa</Link>
            </div>
          </div>
          <div>
            <h2>Contact Us</h2>
            <div>
              <Link to="/">Lexa</Link>
            </div>
            <div>
              <Link to="/">Lexa</Link>
            </div>
            <div>
              <Link to="/">Lexa</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
