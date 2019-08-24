import React from 'react';
import closeIcon from '../../../assets/images/close.svg';
import coinsIcon from '../../../assets/images/coins.svg';
import { Link } from 'react-router-dom';
import styles from './card.scss';
import stylesMain from '../../../styles/main.scss';

const Card = props => {
  const handlePromptModal = () => {
    props.setIdToRemove(props.item.id)
    props.togglePromptModal();
  }

  const source = props.source.substr(1);

  const startDate = new Date(props.item.startDate).toLocaleDateString();
  return (
    <div className={styles.CardWrapper}>
      <Link to={`/${source}/${props.item.id}`} className={styles.CardLink}>
        <div className={styles.CardName}>{props.item.bankName}</div>
        <div className={styles.CardInfo}>
          <div className={`${styles.CardInfoRow} ${styles.CardInfoRow_bold}`}>Nagroda do zdobycia: {props.item.award} PLN</div>
          <div className={styles.CardInfoRow}>Nazwa konta: {props.item.name}</div>
          <div className={styles.CardInfoRow}>Data otwarcia: {startDate}</div>
          <div className={styles.StatusWrapper}>
            <div className={styles.CardInfoRow}>Status: {props.item.status === 'active' ? 'aktywne' : 'nieaktywne'}</div>
            {props.item.status === 'active' ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />)}
          </div>
        </div>
        <div className={styles.AchievedAwardWrapper}>
          <figure className={styles.CoinsIcon}>
            <img src={coinsIcon} alt='' />
          </figure>
          <div className={`${styles.CardInfoRow} ${styles.CardInfoRow_green}`}>Zysk {props.item.achievedAward} PLN</div>
        </div>
      </Link>
      <figure className={styles.CloseIcon} onClick={handlePromptModal}>
        <img src={closeIcon} alt='' />
      </figure>
    </div>
  )
}

export default Card;