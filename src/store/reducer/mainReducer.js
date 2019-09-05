import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import accounts from './accounts';
import deposits from './deposits';
import creditCards from './creditCards';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  app,
  auth,
  accounts,
  deposits,
  creditCards,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});