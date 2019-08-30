import React, { Fragment } from 'react';
import closeIcon from '../../../assets/images/close.svg';
import coinsIcon from '../../../assets/images/coins.svg';
import { Link } from 'react-router-dom';
import styles from './card.scss';

import percentageIcon from '../../../assets/images/percentage.svg';
import calendarIcon from '../../../assets/images/calendar-day.svg'
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
        <div className={styles.CardRow}>
          <figure className={styles.IconWrapper}>
            <img src={coinsIcon} alt="" />
          </figure>
          <div className={styles.CardInfo}>
            <div className={styles.CardInfoDetails}>{props.item.name}</div>
            <div className={`${styles.CardInfoDetails} ${styles.CardInfoDetailsAward}`}>Zysk 0 pln</div>
          </div>
        </div>

        <div className={styles.AdditionalInfoRow}>

          <div className={styles.AdditionalInfoWrapper}>
            <div className={styles.AdditionalInfoDetail}>{startDate}</div>
            <figure className={styles.AdditionalInfoIconWrapper}>
              <img src={calendarIcon} alt='' />
            </figure>
          </div>
          <div className={styles.AdditionalInfoWrapper}>
            <div className={styles.AdditionalInfoDetail}>
              <div className={styles.CardInfoRow}>Status:</div>
              {props.item.status === 'active' ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />)}
            </div>
          </div>
          </div>
      </Link>
      <figure className={styles.CloseIcon} onClick={handlePromptModal}>
        <img src={closeIcon} alt='' />
      </figure>
    </div>

  )
}

export default Card;