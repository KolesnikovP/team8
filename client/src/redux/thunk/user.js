import { initUserAction } from '../reducers/userReducer';

export const fetchUser = () => {
  return function (disptach) {
    fetch('http://localhost:4000/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('authentication has been failed!');
      })
      .then((resObject) => {
        disptach(initUserAction(resObject.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
