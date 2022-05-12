/* eslint-disable default-param-last */
const INIT_RATING = 'INIT_RATING';

const initionalState = { rating: [] };

export const ratingReducer = (state = initionalState, action) => {
  switch (action.type) {
    case INIT_RATING:
      return { ...state, rating: action.payload };
    default:
      return state;
  }
};

export const initRatingAction = (payload) => ({ type: INIT_RATING, payload });
