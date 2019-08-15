import React, { Component } from 'react';
import Switch from 'react-switch';
import closeIcon from '../../../../assets/images/close.svg';
import styles from './conditionTile.scss';
import stylesMain from '../../../../styles/main.scss';

const ConditionTile = (props) => {

  const removeCondition = () => {
    props.removeCondition(props.item.id)
  }

  const handleSwitcher = () => {
    const { item } = props;
    props.updateConditionStatus(item.id, !item.status);
  };

  const { item: { status, conditionName, conditionMonth } } = props;
  return (
    <div className={styles.ConditionContainer}>
      <div className={styles.ConditionName}>{conditionName}</div>
      <div className={styles.ConditionInfo}>Month: {conditionMonth}</div>
      <div className={styles.ConditionInfo}>To do until: 20-07-2019</div>
      <div className={styles.ConditionInfo}>Remaining time: 6h 35min</div>
      <div className={styles.ConditionStatusWrapper}>
        <div className={styles.ConditionStatusInfo}>Status: {status ? 'done' : 'not done'}
          {status === true ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />)}
        </div>
        <Switch
          height={20}
          width={40}
          onColor='#06cc66'
          offColor='#ed3157'
          onChange={handleSwitcher}
          checked={status}
        />
      </div>
      <figure className={styles.CloseIcon} onClick={removeCondition}>
        <img src={closeIcon} alt="" />
      </figure>
    </div>
  )
}

export default ConditionTile;