import React, { useEffect } from 'react';
import Loader from '../Loader/Loader';

export default function Login() {
  useEffect(() => {
    window.open('http://localhost:4000/auth/steam', '_self');
  }, []);
  return <Loader />;
}
