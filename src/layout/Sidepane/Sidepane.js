import React from 'react';
import styles from './sidepane.scss';
import Menu from '../Menu/Menu';

const Sidepane = (props) => {
  return (
    <div className={styles.SidepaneContainer}>
      <div className={styles.Sidepane}>
        <Menu toggleMenu={props.toggleMenu} />
      </div>
    </div>
  )
}

export default Sidepane;
