import React from 'react';
import closeIcon from '../../../../assets/images/close.svg';
import { Link } from 'react-router-dom';
import styles from './accountListItem.scss';
import stylesMain from '../../../../styles/main.scss';

const AccountListItem = (props) => {
  const handlePromptModal= () => {
    props.setIdToRemove(props.item.id)
    props.togglePromptModal();
  }
  return (
    <div className={styles.AccountListItem}>
      <Link to={`/accounts/${props.name}/${props.item.id}`} className={styles.AccountListItemLink}>
        <div className={styles.AccountName}>{props.item.accountName}</div>
        <div className={styles.AccountInfo}>
          <div>Data otwarcia: {props.item.openDate}</div>
          <div className={styles.StatusWrapper}>
          <div>Status: {props.item.status}</div>
            {props.item.status === 'active' ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />) }
          </div>
        </div>
      </Link>
      <figure className={styles.CloseIcon} onClick={handlePromptModal}>
        <img src={closeIcon} alt='' />
      </figure>
    </div>
  )
}

export default AccountListItem;