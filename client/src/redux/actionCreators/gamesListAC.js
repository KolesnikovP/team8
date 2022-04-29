import { INIT_GAMES } from '../actionTypes/gamesListAT';

export const getAllGamesAC = (payload) => {
  console.log('gamesListAC getAllGamesAC');
  return {
    type: INIT_GAMES,
    payload,
  };
};
