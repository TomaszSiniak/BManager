import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './links.scss';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

const LoggedInLinks = (props) => {
  return (
    <ul className={styles.LoggedOutLinkWrapper}>
      <li onClick={props.logout}>
        <NavLink to="/login" className={styles.LinkItem}>Log Out</NavLink>
      </li>
    </ul>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks);