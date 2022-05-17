import React, { useEffect } from 'react';
import Loader from '../Loader/Loader';

export default function Login() {
  useEffect(() => {
    window.open('https://team8elbrus.herokuapp.com/auth/steam', '_self');
  }, []);
  return <Loader />;
}
