import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../store/actions/authActions';

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
    const { authError } = (this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" type="text" onChange={this.handleInputChange} />
          <input name="password" type="password" onChange={this.handleInputChange} />
          <button>Zaloguj!</button>
          {authError && <p>{authError}</p>}
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logToApp: data => dispatch(login(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);