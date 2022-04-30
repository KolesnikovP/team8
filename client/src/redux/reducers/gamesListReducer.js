import { INIT_GAMES } from '../actionTypes/gamesListAT';

const initialState = { games: [] };

// eslint-disable-next-line default-param-last
export function gamesListReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_GAMES:
      return { ...state, games: action.payload };
    default:
      return state;
  }
}
