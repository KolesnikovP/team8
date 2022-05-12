import { initRatingAction } from '../reducers/ratingReducer';

export const getFetchAllUserRating = (user, user1, value) => {
  return function (dispatch) {
    fetch('http://localhost:4000/api/allUserRatings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, user1, value }),
    })
      .then((data) => data.json())
      .then((res) => {
        dispatch(initRatingAction(res));
      });
  };
};
