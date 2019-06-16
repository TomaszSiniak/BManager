import React from 'react';
import styles from './styles/main.scss';
import Navbar from './layout/Navbar/Navbar';
import MainContent from './layout/MainContent/MainContentContainer';
import { connect } from 'react-redux';
import { toggleMenu } from './actions/appActions';

const App = (props) => {
  return (
    <div className={styles.AppContainer}>
      <Navbar toggleMenu={props.toggleMenu} />
      <MainContent toggleMenu={props.toggleMenu} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(toggleMenu()),
  }
}

export default connect(null, mapDispatchToProps)(App);