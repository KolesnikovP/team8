import { setProfileGames } from '../reducers/profileReducer';
/* eslint-disable func-names */
export const setUserGames = (id, func, func1) => {
  return function (dispatch) {
    fetch('http://localhost:4000/api/validateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.message === 'Games not found') {
          func();
          func1();
        } else {
          dispatch(setProfileGames(res));
          func();
        }
      });
  };
};
