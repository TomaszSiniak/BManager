import { combineReducers } from 'redux';
import accounts from './accounts';
import app from './app';

export default combineReducers({
  app,
  accounts,
});