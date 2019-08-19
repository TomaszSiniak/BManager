import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router';
import arrowIcon from '../../../assets/images/arrow-left.svg';
import styles from './backButton.scss';

const BackButton = (props) => {
  const goBack = () => {
    props.history.goBack();
  }
  return (
    <Fragment>
      <button onClick={goBack} className={styles.BackButton}>
        <figure>
          <img src={arrowIcon} alt="" />
        </figure>
        <p>Powrót</p>
      </button>
    </Fragment>
  )
}
 
export default withRouter(BackButton);
