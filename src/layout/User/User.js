import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import pooIcon from '../../assets/images/poo.svg';
import styles from './user.scss';

const User = (props) => {
  const name = get(props, 'user.firstName', '');
  return (
    <div className={styles.UserWrapper}>
      <figure className={styles.ImgWrapper}>
        <img src={pooIcon} />
      </figure>
      <div className={styles.Name}>Welcome, {name}!</div>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.firebase.profile,
  }
}

export default connect(mapStateToProps)(User);