import React from 'react';
import { Link } from 'react-router-dom';
import styles from './bankTile.scss';
import closeIcon from '../../../../assets/images/close.svg';

const BankTile = props => {

  const setIdToRemove = () => {
    props.togglePromptModal(props.item.id)
  }
  
  const startDate = new Date(props.item.startDate).toLocaleDateString();
  
  return (
    <div className={styles.BankTile}>
      <Link
        className={styles.BankTileLink}
        to={`/accounts/${props.item.bankName}`}
      >
        <div className={styles.BankName}>{props.item.bankName}</div>
        <div className={styles.BankInfo}>
          <div className={styles.BankInfoRaw}>Aktywne konta: 0</div>
          <div className={styles.BankInfoRaw}>Data otwarcia: {startDate}</div>
        </div>
      </Link>
      <figure className={styles.CloseIcon} onClick={setIdToRemove}>
        <img src={closeIcon} alt=""/>
      </figure>
    </div>
  );
}
export default BankTile;