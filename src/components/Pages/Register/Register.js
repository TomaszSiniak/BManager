import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Register = (props) => {
  const{ auth } = props;
  if(auth.uid) return <Redirect to="/" />
  return (
    <div>Register</div>
  )
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Register);