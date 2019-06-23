import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import styles from '../../../styles/main.scss';

class Login extends Component {
  state = {
    email: null,
    password: null,
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.logToApp(this.state)
  }

  render () {
    const { authError, auth } = (this.props)
    if(auth.uid) return <Redirect to="/" />
    return (
      <div>
        <form className={styles.LoginForm} onSubmit={this.handleSubmit}>
          <div className={styles.SectionName}>Login:</div>
          <input className={styles.LoginFormInput} placeholder="Email" name="email" type="text" onChange={this.handleInputChange} />
          <input className={styles.LoginFormInput} placeholder="Hasło" name="password" type="password" onChange={this.handleInputChange} />
          <button className={styles.LoginFormButton}>Zaloguj!</button>
          {authError && <p>{authError}</p>}
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
    logToApp: data => dispatch(login(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);