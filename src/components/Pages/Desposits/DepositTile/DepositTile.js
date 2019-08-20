import React from 'react';
import styles from './depositTile.scss';
import closeIcon from '../../../../assets/images/close.svg';

const DepositTile = props => {

  const removeDeposit = () => {
    props.removeDeposit(props.item.id)
  }

  const { bankName, depositName, status, percentage, period, amount, interest, tax, profit, endDate } = props.item;
  return (
    <div className={styles.DepositListItem}>
      <div className={styles.DepositName}>{depositName}</div>
      <div className={styles.DepositDetails}>
        <div className={styles.DepositInfo}>
          <div className={styles.DepositRow}>Nazwa banku: {bankName}</div>
          <div className={styles.DepositRow}>Okres w dniach: {period * 30}</div>
          <div className={styles.DepositRow}>Status: {status}</div>
          <div className={styles.DepositRow}>Koniec: {endDate}</div>
        </div>
        <div className={styles.DepositCalc}>
          <div className={styles.DepositRow}>Oprocentowanie: {percentage} %</div>
          <div className={styles.DepositRow}>Kwota: {amount}</div>
          <div className={styles.DepositRow}>Przychód: {interest} </div>
          <div className={styles.DepositRowRed}>Podatek: {tax} </div>
          <div className={styles.DepositRowGreen}>Zysk: {profit}</div>
        </div>
      </div>
      <figure className={styles.CloseIcon} onClick={removeDeposit}>
        <img src={closeIcon} alt="" />
      </figure>
    </div>
  )
}
export default DepositTile;