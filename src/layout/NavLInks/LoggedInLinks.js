import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './links.scss';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { closeMenu } from '../../store/actions/appActions';
import SignOutIcon from '../../assets/images/sign-out.svg';

const LoggedInLinks = (props) => {

  const handleLogout = () => {
    props.logout();
    props.closeMenu();
  }
  return (
    <ul className={styles.LoggedOutLinkWrapper}>
      <li onClick={handleLogout}>
        <NavLink to="/login" className={styles.LinkItem}>
          <span>Log Out</span>
          <figure>
            <img src={SignOutIcon} alt="" />
          </figure>
        </NavLink>
      </li>
    </ul>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    closeMenu: () => dispatch(closeMenu())
  }
}


export default connect(null, mapDispatchToProps)(LoggedInLinks);