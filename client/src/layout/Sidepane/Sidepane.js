import React from 'react';
import styles from './sidepane.scss';
import closeIcon from '../../assets/images/close.svg';
import Menu from '../Menu/Menu';

const Sidepane = (props) => {

  const closeMenu = () => {
    props.toggleMenu();
  }
  return (
    <div className={styles.SidepaneContainer}>
      <figure className={styles.IconContainer} onClick={closeMenu}>
      </figure>
      <Menu />
    </div>
  )
}

export default Sidepane;
