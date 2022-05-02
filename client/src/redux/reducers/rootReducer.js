import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gamesListReducer } from './gamesListReducer';
import { profileReducer } from './profileReducer';

export const rootReducer = combineReducers({
  userReducer,
  gamesListReducer,
  profileReducer,
});
