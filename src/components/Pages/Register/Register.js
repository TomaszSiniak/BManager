import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../store/actions/authActions';
import styles from '../../../styles/main.scss';

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
      <div>
        <form className={styles.RegisterForm} onSubmit={this.handleSubmit}>
          <div className={styles.SectionName}>Rejestracja:</div>
          <input className={styles.RegisterFormInput} placeholder="Imię" name="firstName"  onChange={this.handleInput} />
          <input className={styles.RegisterFormInput} placeholder="Hasło" type="password" name="password" onChange={this.handleInput} />
          <input className={styles.RegisterFormInput}  placeholder="Email" type="email" name="email"  onChange={this.handleInput} />
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