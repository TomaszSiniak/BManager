import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import bankAccounts from './bankAccounts';
import conditions from './conditions';
import deposits from './deposits';
import creditCards from './creditCards';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  app,
  auth,
  bankAccounts,
  conditions,
  deposits,
  creditCards,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});