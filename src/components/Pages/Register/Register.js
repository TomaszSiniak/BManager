import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../store/actions/authActions';

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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input name="firstName" id="firstName" onChange={this.handleInput} />
          <label htmlFor="lastName">Last Name:</label>
          <input name="lastName" id="lastName" onChange={this.handleInput} />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={this.handleInput} />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={this.handleInput} />
          <button>Dupa</button>
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