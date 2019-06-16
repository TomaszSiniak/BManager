import React from 'react';
import styles from './Navbar.scss';
import menuIcon from '../../assets/images/menu.svg';
import LoggedInLinks from '../NavLinks/LoggedInLinks';
import LoggedOutLinks from '../NavLinks/LoggedOutLinks';

const Navbar = (props) => {

  const showMenu = () => {
    props.toggleMenu();
  }
  return (
    <div className={styles.HeaderWrapper}>
      <figure className={styles.IconContainer} onClick={showMenu}>
        <img src={menuIcon} />
      </figure>
      <div className={styles.LinksWrapper}>
        <LoggedInLinks />
        <LoggedOutLinks />
      </div>
    </div>
  )
}

export default Navbar;