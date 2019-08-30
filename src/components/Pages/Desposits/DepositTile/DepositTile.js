import React from 'react';
import styles from './depositTile.scss';
import closeIcon from '../../../../assets/images/close.svg';
import timerIcon from '../../../../assets/images/timer.svg';
import incomeIcon from '../../../../assets/images/hand.svg';
import percentageIcon from '../../../../assets/images/percentage.svg';
import calendarIcon from '../../../../assets/images/calendar-day.svg'

const DepositTile = props => {

  const removeDeposit = () => {
    props.removeDeposit(props.item.id)
  }

  const { bankName, status, percentage, period, amount, interest, tax, profit, endDate } = props.item;
  return (
    <div className={styles.DepositListItem}>
      <div className={styles.DespositRow}>
        <figure className={styles.IconWrapper}>
          <img src={incomeIcon} alt="" />
        </figure>
        <div className={styles.DepositInfo}>
          <div className={styles.DepositInfoDetails}>{bankName}</div>
          <div className={`${styles.DepositInfoDetails} ${styles.DepositInfoDetailsAmount}`}>{amount} pln</div>
        </div>
      </div>
      <div className={styles.AdditionalInfoRow}>
        <div className={styles.AdditionalInfoWrapper}>
          <div className={styles.DepositRow}>{endDate}</div>
          <figure className={styles.AdditionalInfoIconWrapper}>
            <img src={timerIcon} alt='' />
          </figure>
        </div>
        <div className={styles.AdditionalInfoWrapper}>
          <div className={styles.DepositRow}>{percentage}</div>
          <figure className={styles.AdditionalInfoIconWrapper}>
            <img src={percentageIcon} alt='' />
          </figure>
        </div>
        <div className={styles.AdditionalInfoWrapper}>
          <div className={styles.DepositRow}>{period * 30} dni</div>
          <figure className={styles.AdditionalInfoIconWrapper}>
            <img src={calendarIcon} alt='' />
          </figure>
        </div>
      </div>
      <figure className={styles.CloseIcon} onClick={removeDeposit}>
        <img src={closeIcon} alt="" />
      </figure>
    </div>
  )
}
export default DepositTile;