import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../store/actions/authActions';
import styles from '../../../styles/main.scss';

class Register extends Component {

  state = {
    firstName: null,
    lastName: null,
    password: null,
    email: null,
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  }

  render () {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/" />
    return (
      <div>
        <form className={styles.RegisterForm} onSubmit={this.handleSubmit}>
          <label className={styles.RegisterFormLabel} htmlFor="firstName">First Name:</label>
          <input className={styles.RegisterFormInput}  name="firstName" id="firstName" onChange={this.handleInput} />
          <label className={styles.RegisterFormLabel} htmlFor="lastName">Last Name:</label>
          <input className={styles.RegisterFormInput}  name="lastName" id="lastName" onChange={this.handleInput} />
          <label className={styles.RegisterFormLabel} htmlFor="password">Password:</label>
          <input className={styles.RegisterFormInput}  type="password" name="password" id="password" onChange={this.handleInput} />
          <label className={styles.RegisterFormLabel} htmlFor="email">Email:</label>
          <input className={styles.RegisterFormInput}  type="email" name="email" id="email" onChange={this.handleInput} />
          <button className={styles.RegisterFormButton}>Zarejestruj</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: userData =>dispatch(registerUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);