import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../store/actions/authActions';
import LogoIcon from '../../../assets/images/logo.png';
import styles from './register.scss';

class Register extends Component {

  state = {
    firstName: null,
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
      <div className={styles.RegisterWrapper}>
        <form className={styles.RegisterForm} onSubmit={this.handleSubmit}>
          <figure className={styles.LogoWrapperSignUp}>
            <img src={LogoIcon} alt="" />
          </figure>
          <div className={styles.SectionName}>Sign up:</div>
          <input className={styles.RegisterFormInput} placeholder="Name" name="firstName" onChange={this.handleInput} />
          <input className={styles.RegisterFormInput} placeholder="Password" type="password" name="password" onChange={this.handleInput} />
          <input className={styles.RegisterFormInput} placeholder="Email" type="email" name="email" onChange={this.handleInput} />
          <button className={styles.RegisterFormButton}>Sign up</button>
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
    register: userData => dispatch(registerUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);