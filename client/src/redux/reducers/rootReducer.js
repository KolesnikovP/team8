import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gamesListReducer } from './gamesListReducer';
import { profileReducer } from './profileReducer';
import { postsReducer } from './postsReducer';
import { usersListReducer } from './usersListReducer';

export const rootReducer = combineReducers({
  userReducer,
  gamesListReducer,
  profileReducer,
  postsReducer,
  usersListReducer,
});
