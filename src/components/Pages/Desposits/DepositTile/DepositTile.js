import React from 'react';
import styles from './depositTile.scss';
import closeIcon from '../../../../assets/images/close.svg';
import coinsIcon from '../../../../assets/images/coins.svg';
import incomeIcon from '../../../../assets/images/hand.svg';
import taxIcon from '../../../../assets/images/sack-dollar.svg';

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
          <div className={styles.DepositRow}>Status: {status}</div>
          <div className={styles.DepositRow}>Koniec: {endDate}</div>
        </div>
        <div className={styles.DepositCalc}>
          <div className={styles.DepositRow}>Kwota: {amount} PLN</div>
          <div className={styles.DepositRow}>Oprocentowanie: {percentage} %</div>
          <div className={styles.DepositRow}>Okres w dniach: {period * 30}</div>
        </div>
      </div>
      <div className={styles.DepositSummary}>
        <div className={styles.DepositSummaryItem}>
          <figure className={styles.IconWrapper}>
            <img src={incomeIcon} alt="" />
          </figure>
          <div className={styles.DepositRowBlack}>Przychód</div>
          <div className={styles.DepositRowBlack}>{interest}33.33 PLN</div>
        </div>
        <div className={styles.DepositSummaryItem}>
          <figure className={styles.IconWrapper}>
            <img src={taxIcon} alt="" />
          </figure>
          <div className={styles.DepositRowRed}>Podatek</div>
          <div className={styles.DepositRowRed}>{tax}33.33 PLN</div>
        </div>
        <div className={styles.DepositSummaryItem}>
          <figure className={styles.IconWrapper}>
            <img src={coinsIcon} alt="" />
          </figure>
          <div className={styles.DepositRowGreen}>Zysk</div>
          <div className={styles.DepositRowGreen}>{profit}33.33 PLN</div>
        </div>
      </div>
      <figure className={styles.CloseIcon} onClick={removeDeposit}>
        <img src={closeIcon} alt="" />
      </figure>
    </div>
  )
}
export default DepositTile;