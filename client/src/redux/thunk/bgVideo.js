import { initUserAction } from '../reducers/userReducer';

export const getAllBg = (func) => {
  fetch('http://localhost:4000/api/initBgs')
    .then((response) => response.json())
    .then((data) => func(data));
};

export const updateBgFetch = (userBg) => {
  return (dispatch) => {
    fetch('http://localhost:4000/api/updateBg', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userBg),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(initUserAction(data));
      });
  };
};
