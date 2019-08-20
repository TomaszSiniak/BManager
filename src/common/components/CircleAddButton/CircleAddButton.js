import React from 'react';
import PlusIcon from '../../../assets/images/plus.svg';
import styles from './circleAddButton.scss';

const CircleAddButton = props => {
  return (
    <button className={styles.AddDepositBtn} onClick={props.openSidepane}>
     <img src={PlusIcon} alt="" />
    </button>
  )
}

export default CircleAddButton;