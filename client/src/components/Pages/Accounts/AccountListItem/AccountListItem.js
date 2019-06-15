import React from 'react';
import closeIcon from '../../../../assets/images/close.svg';
import styles from './accountListItem.scss';

const AccountListItem = (props) => {
  const handleRemoveAccount = () => {
    props.remove(props.item.id, props.name);
  }
  return (
    <div className={styles.AccountListItem}>
      <div>{props.item.accountName}</div>
      <div>{props.item.id}</div>
      <figure className={styles.CloseIcon} onClick={handleRemoveAccount}>
        <img src={closeIcon} alt='' />
      </figure>
    </div>
  )
}

export default AccountListItem;