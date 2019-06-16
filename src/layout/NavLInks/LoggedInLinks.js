import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './links.scss';

const LoggedInLinks = () => {
  return (
    <ul className={styles.LoggedOutLinkWrapper}>
      <li>
        <NavLink to="/login" className={styles.LinkItem}>Log Out</NavLink>
      </li>
    </ul>
  )
}

export default LoggedInLinks;