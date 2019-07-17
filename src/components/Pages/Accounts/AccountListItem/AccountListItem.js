import React from 'react';
import closeIcon from '../../../../assets/images/close.svg';
import { Link } from 'react-router-dom';
import styles from './accountListItem.scss';

const AccountListItem = (props) => {
  const handleRemoveAccount = () => {
    props.removeBankAccount(props.item.id, props.name);
  }
  return (
    <div className={styles.AccountListItem}>
      <Link to={`/accounts/${props.name}/${props.item.id}`} className={styles.AccountListItemLink}>
        <div className={styles.AccountName}>{props.item.accountName}</div>
        <div className={styles.AccountInfo}>
          <div>Data Otwarcia: {props.item.openDate}</div>
          <div className={styles.statusWrapper}>
          <div>Status: {props.item.status}</div>
            {props.item.status === 'aktywne' ? (<span className={styles.active} />) : (<span className={styles.inactive} />) }
          </div>
        </div>
      </Link>
      <figure className={styles.CloseIcon} onClick={handleRemoveAccount}>
        <img src={closeIcon} alt='' />
      </figure>
    </div>
  )
}

export default AccountListItem;