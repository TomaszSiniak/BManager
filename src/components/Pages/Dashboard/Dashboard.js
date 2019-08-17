import React from 'react';
import LogoIcon from '../../../assets/images/logo.png';
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
          <p>Welcome in</p>
          <p>bmanager</p>
        </div>
        <div className={styles.DashboardSubtitle}>bank's promotions app manager!</div>
        <figure className={styles.IconWrapper}>
          <img src={LogoIcon} />
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
