import React from 'react';
import { Link } from 'react-router-dom';
import styles from './bankTile.scss';
import closeIcon from '../../../assets/images/close.svg';

const BankTile = (props) => {

  const setIdToRemove = () => {
    props.togglePromptModal(props.item.id)
  }

  return ( 
    <div className={styles.BankTile}>
      <Link
        className={styles.BankTileLink}
        to={`/accounts/${props.item.bankName}`}
      >
        <div className={styles.BankName}>{props.item.bankName}</div>
        <div className={styles.BankInfo}>
          <div>Active accounts: 0</div>
        </div>
      </Link>
      <figure className={styles.CloseIcon} onClick={setIdToRemove}>
        <img src={closeIcon} alt=""/>
      </figure>
    </div>
  );
}
export default BankTile;