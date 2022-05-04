const INIT_GAMES = 'INIT_GAMES';

const initialState = { games: [] };

// eslint-disable-next-line default-param-last
export const gamesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GAMES:
      return { ...state, games: action.payload };
    default:
      return state;
  }
};

export const getAllGamesAC = (payload) => ({ type: INIT_GAMES, payload });
