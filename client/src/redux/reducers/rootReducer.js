import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gamesListReducer } from './gamesListReducer';

export const rootReducer = combineReducers({
  userReducer,
  gamesListReducer,
});
