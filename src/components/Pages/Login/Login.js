import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, toggleProgressbar } from '../../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import LogoIcon from '../../../assets/images/logo.png';
import styles from './login.scss';
import ProgressBar from '../../../common/components/Progressbar/Progressbar';
import Portal from '../../Portal/Modal';

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
    this.props.showProgressBar();

    setTimeout(() => {
      this.props.showProgressBar();
    }, 2000)
  }

  render () {
    const { authError, auth, progressBarVisible } = (this.props)
    if (auth.uid) return <Redirect to="/" />
    return (
      <div className={styles.LoginWrapper}>
        <form className={styles.LoginForm} onSubmit={this.handleSubmit}>
          <figure className={styles.LogoWrapperSignIn}>
            <img src={LogoIcon} alt="" />
          </figure>
          <div className={styles.SectionName}>Logowanie:</div>
          <input className={styles.LoginFormInput} placeholder="Email" name="email" type="text" onChange={this.handleInputChange} />
          <input className={styles.LoginFormInput} placeholder="Hasło" name="password" type="password" onChange={this.handleInputChange} />
          <button className={styles.LoginFormButton}>Zaloguj!</button>
          {authError && <p>{authError}</p>}
        </form>
        {progressBarVisible && (
          <Portal>
            <ProgressBar />
          </Portal>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    progressBarVisible: state.auth.isProgressbarVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logToApp: data => dispatch(login(data)),
    showProgressBar: () => dispatch(toggleProgressbar())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);