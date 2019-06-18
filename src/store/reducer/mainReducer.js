import { combineReducers } from 'redux';
import accounts from './accounts';
import app from './app';
import auth from './auth';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  app,
  auth,
  accounts,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});