import React from 'react';
import styles from './dashboard.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
  render () {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to="/login" />
    return (
      <div className={styles.DashboardContainer}>
        <div className={styles.DashboardTitle}>
          <p>Witamy w</p>
          <p>bmanager</p>
        </div>
        <div className={styles.DashboardSubtitle}>aplikacji do zarządzania promocjami bankowymi!</div>
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
