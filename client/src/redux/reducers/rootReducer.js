import { combineReducers } from 'redux';
import { gamesListReducer } from './gamesListReducer';

export const rootReducer = combineReducers({
  gamesListReducer,
});
