import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router';

const BackButton = (props) => {
  const goBack = () => {
    props.history.goBack();
  }
  return (
    <Fragment>
      <button onClick={goBack}>Go back</button>
    </Fragment>
  )
}
 
export default withRouter(BackButton);
