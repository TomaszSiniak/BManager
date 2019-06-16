import React from 'react';
import closeIcon from '../../../../assets/images/close.svg';
import { Link } from 'react-router-dom';
import styles from './accountListItem.scss';

const AccountListItem = (props) => {
  const handleRemoveAccount = () => {
    props.remove(props.item.id, props.name);
  }
  return (
    <div className={styles.AccountListItem}>
      <Link to={`/accounts/${props.name}/${props.item.id}`} className={styles.AccountListItemLink}>
        <div>Nazwa konta: {props.item.accountName}</div>
        <div>Data Otwarcia: {props.item.openDate}</div>
        <div>Status: {props.item.status}</div>
      </Link>
      <figure className={styles.CloseIcon} onClick={handleRemoveAccount}>
        <img src={closeIcon} alt='' />
      </figure>
    </div>
  )
}

export default AccountListItem;