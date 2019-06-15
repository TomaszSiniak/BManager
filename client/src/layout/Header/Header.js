import React from 'react';
import styles from './header.scss';
import menuIcon from '../../assets/images/menu.svg';

const Header = (props) => {

  const showMenu = () => {
    props.toggleMenu();
  }
  return (
    <div className={styles.HeaderWrapper}>
      <figure className={styles.IconContainer} onClick={showMenu}>
        <img src={menuIcon} />
      </figure>
    </div>
  )
}

export default Header;