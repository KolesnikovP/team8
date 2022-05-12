import { setProfileGames } from '../reducers/profileReducer';
import { initUserAction } from '../reducers/userReducer';
/* eslint-disable func-names */
export const setUserGames = (id, func, func1) => {
  return async function (dispatch) {
    const response = await fetch('http://localhost:4000/api/validateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (response.status === 201) {
      dispatch(setProfileGames(data));
      func();
      document.location.href = 'http://localhost:3000/';
    }
    if (response.status === 200) {
      dispatch(setProfileGames(data));
      func();
    }
    if (response.status === 404) {
      dispatch(setProfileGames(data));
      func();
      func1();
    }
    if (response.status === 405) {
      func();
      func1();
    }
  };
};

export const setUserDescribe = (steamId, description) => {
  return function (dispatch) {
    fetch('http://localhost:4000/api/updateDescribe', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ steamId, description }),
    })
      .then((data) => data.json())
      .then((res) => {
        dispatch(initUserAction(res));
      });
  };
};

export const updateUserStats = (steamId) => {
  return function (dispatch) {
    fetch('http://localhost:4000/api/updateUserStats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: steamId }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(setProfileGames(data)));
  };
};
