import React from 'react';
import dollarIcon from '../../../assets/images/dollar.svg';
import styles from './dashboard.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
  render () {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to="/login" />
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Dashboard);
