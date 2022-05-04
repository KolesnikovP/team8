import { initUserAction } from '../reducers/userReducer';
import { setProfileGames } from '../reducers/profileReducer';

export const fetchUser = () => {
  return function (dispatch) {
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
        dispatch(initUserAction(resObject.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchUserGames = (id) => {
  return function (dispatch) {
    fetch('http://localhost:4000/api/userGames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((data) => data.json())
      .then((res) => {
        dispatch(setProfileGames(res));
      });
  };
};
