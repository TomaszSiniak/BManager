import React from 'react';
import dollarIcon from '../../../assets/images/dollar.svg';
import styles from './dashboard.scss';

class Dashboard extends React.Component {
  render () {
    return (
      <div className={styles.DashboardContainer}>
        <div className={styles.DashboardTitle}>Witaj w BManager!</div>
        <div className={styles.DashboardSubtitle}>aplikacji do zarzadzania promocjami bankowymi!</div>
        <figure className={styles.IconWrapper}>
          <img src={dollarIcon} />
        </figure>
      </div>
    )
  }
}

export default Dashboard;