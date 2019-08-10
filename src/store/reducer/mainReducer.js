import { combineReducers } from 'redux';
import banks from './banks';
import app from './app';
import auth from './auth';
import bankAccounts from './bankAccounts';
import conditions from './conditions';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  app,
  auth,
  banks,
  bankAccounts,
  conditions,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});