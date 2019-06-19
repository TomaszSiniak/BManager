
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store';

const AppContainer =() => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<AppContainer />, document.querySelector('#root'));
});
