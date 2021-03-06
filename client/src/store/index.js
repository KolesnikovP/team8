import { logger } from 'redux-logger/src';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from '../redux/reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
  devTools: true,
});
