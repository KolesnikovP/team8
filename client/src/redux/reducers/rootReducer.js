import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gamesListReducer } from './gamesListReducer';
import { profileReducer } from './profileReducer';
import { postsReducer } from './postsReducer';
import { usersListReducer } from './usersListReducer';
import { userChatReducer } from './userChatReducer';
import { commentReducer } from './commentsReducer';

export const rootReducer = combineReducers({
  userReducer,
  gamesListReducer,
  profileReducer,
  postsReducer,
  usersListReducer,
  userChatReducer,
  commentReducer,
});
