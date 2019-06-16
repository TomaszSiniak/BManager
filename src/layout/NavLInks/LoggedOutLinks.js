import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './links.scss';

const LoggedInLinks = () => {
  return (
    <ul className={styles.LoggedInLinkWrapper}>
      <li>
        <NavLink to="/login" className={styles.LinkItem}>Login</NavLink>
      </li>
      <li>
        <NavLink to="/register" className={styles.LinkItem}>Register</NavLink>
      </li>
    </ul>
  )
}

export default LoggedInLinks;