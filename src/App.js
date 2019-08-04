import React from 'react';
import styles from './styles/main.scss';
import Navbar from './layout/Navbar/Navbar';
import MainContent from './layout/MainContent/MainContentContainer';
import { connect } from 'react-redux';
import { toggleMenu } from './store/actions/appActions';

const App = (props) => {

  const width = window.innerWidth;
  if(width > 768 && props.auth) {
    props.toggleMenu();
  }
  
  return (
    <div className={styles.AppContainer}>
      <Navbar toggleMenu={props.toggleMenu} />
      <MainContent toggleMenu={props.toggleMenu} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(toggleMenu()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);