import React from 'react';
import closeIcon from '../../../../assets/images/close.svg';
import coinsIcon from '../../../../assets/images/coins.svg';
import { Link } from 'react-router-dom';
import styles from './accountListItem.scss';
import stylesMain from '../../../../styles/main.scss';

const AccountListItem = props => {
  const handlePromptModal = () => {
    props.setIdToRemove(props.item.id)
    props.togglePromptModal();
  }

  const startDate = new Date(props.item.startDate).toLocaleDateString();
  return (
    <div className={styles.AccountListItem}>
      <Link to={`/accounts/${props.name}/${props.item.id}`} className={styles.AccountListItemLink}>
        <div className={styles.AccountName}>{props.item.accountName}</div>
        <div className={styles.AccountInfo}>
          <div className={`${styles.AccountInfoRow} ${styles.AccountInfoRow_bold}`}>Nagroda do zdobycia: {props.item.award} PLN</div>
          <div className={styles.AccountInfoRow}>Data otwarcia: {startDate}</div>
          <div className={styles.StatusWrapper}>
            <div className={styles.AccountInfoRow}>Status: {props.item.status === 'active' ? 'aktywne' : 'nieaktywne'}</div>
            {props.item.status === 'active' ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />)}
          </div>
        </div>
        <div className={styles.AchievedAwardWrapper}>
          <figure className={styles.CoinsIcon}>
            <img src={coinsIcon} alt='' />
          </figure>
          <div className={`${styles.AccountInfoRow} ${styles.AccountInfoRow_green}`}>Zysk {props.item.achievedAward} PLN</div>
        </div>
      </Link>
      <figure className={styles.CloseIcon} onClick={handlePromptModal}>
        <img src={closeIcon} alt='' />
      </figure>
    </div>
  )
}

export default AccountListItem;