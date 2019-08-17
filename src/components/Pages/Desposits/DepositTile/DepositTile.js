import React from 'react';
import styles from './depositTile.scss';
import closeIcon from '../../../../assets/images/close.svg';

const DepositTile = props => {

  const removeDeposit = () => {
    props.removeDeposit(props.item.id)
  }

  const { bankName, depositName, status, percentage, period } = props.item;
  return (
    <div className={styles.DepositListItem}>
      <div className={styles.DepositName}>{depositName}</div>
      <div className={styles.DepositDetails}>
        <div>{bankName}</div>
        <div>{period}</div>
        <div>{status}</div>
        <div>{percentage}</div>
      </div>
      <figure className={styles.CloseIcon} onClick={removeDeposit}>
        <img src={closeIcon} alt="" />
      </figure>
    </div>
  )
}
export default DepositTile;