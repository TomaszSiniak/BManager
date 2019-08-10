import React, { Component } from 'react';
import Switch from 'react-switch';
import closeIcon from '../../../../assets/images/close.svg';
import styles from './conditionTile.scss';
import stylesMain from '../../../../styles/main.scss';

class ConditionTile extends Component {
 
  removeCondition = () => {
    this.props.removeCondition(this.props.item.id)
  }

  handleSwitcher = () => {
    const { item } = this.props;
    this.props.updateConditionStatus(item.id, !item.status);
  };

  render () {
    const { item: {status, conditionName, conditionMonth} } = this.props;
    return (
      <div className={styles.ConditionContainer}>
        <div className={styles.ConditionName}>{conditionName}</div>
        <div className={styles.ConditionInfo}>Month: {conditionMonth}</div>
        <div className={styles.ConditionInfo}>To do until: 20-07-2019</div>
        <div className={styles.ConditionStatusWrapper}>
          <div className={styles.ConditionStatusInfo}>Status: {status ? 'done' : 'not done'}
          {status === true ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />) }
          </div>
            <Switch
              height={20}
              width={40}
              onColor='#06cc66'
              offColor='#ed3157'
              onChange={this.handleSwitcher}
              checked={status}
            />
        </div>
        <figure className={styles.CloseIcon} onClick={this.removeCondition}>
          <img src={closeIcon} alt="" />
        </figure>
      </div>
    )
  }
}

export default ConditionTile;