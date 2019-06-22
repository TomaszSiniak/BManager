import React from 'react';
import styles from './sidepane.scss';
import Menu from '../Menu/Menu';
import User from '../User/User';

const Sidepane = (props) => {
  return (
    <div className={styles.SidepaneContainer}>
      <div className={styles.Sidepane}>
        <User />
        <Menu toggleMenu={props.toggleMenu} />
      </div>
    </div>
  )
}

export default Sidepane;
