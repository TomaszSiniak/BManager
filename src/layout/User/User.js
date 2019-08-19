import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import userIcon from '../../assets/images/user.svg';
import styles from './user.scss';

const User = (props) => {
  const name = get(props, 'user.firstName', '');
  return (
    <div className={styles.UserWrapper}>
      <figure className={styles.ImgWrapper}>
        <img src={userIcon} />
      </figure>
      <div className={styles.Name}>Witaj, {name}!</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.firebase.profile,
  }
}

export default connect(mapStateToProps)(User);