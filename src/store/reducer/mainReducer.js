import { combineReducers } from 'redux';
import accounts from './accounts';
import app from './app';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  app,
  accounts,
  firestore: firestoreReducer
});