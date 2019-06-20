import React from 'react';
import { Link } from 'react-router-dom';
import styles from './bankTile.scss';
import closeIcon from '../../../assets/images/close.svg';

const BankTile = (props) => {
  
  const handleRemoveBank = () => {
    props.removeBank(props.item.id)
  }
  return ( 
    <div className={styles.BankTile}>
      <Link
        className={styles.BankTileLink}
        to={`/accounts/${props.item.bankName}`}
      >
        <div>Bank: {props.item.bankName}</div>
        <div>Aktywne konta: 0</div>
      </Link>
      <figure className={styles.CloseIcon} onClick={handleRemoveBank}>
        <img src={closeIcon} alt=""/>
      </figure>
    </div>
  );
}
export default BankTile;