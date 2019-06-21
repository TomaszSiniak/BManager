import { combineReducers } from 'redux';
import banks from './banks';
import app from './app';
import auth from './auth';
import accounts from './accounts';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  app,
  auth,
  banks,
  accounts,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});