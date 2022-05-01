import { setProfileGames } from '../reducers/profileReducer';
/* eslint-disable func-names */
export const setUserGames = (id, func) => {
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
        dispatch(setProfileGames(res));
        func();
      });
  };
};
