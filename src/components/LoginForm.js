import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUser, isLoggedIn } from '../actions';

const mapDispatchtoProps = dispatch => {
  return {
    logInUser: (credentials) => dispatch(logInUser(credentials)),
    isLoggedIn: () => dispatch(isLoggedIn())
  }
}

class LoginForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault()
    let credentials = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    try {
      this.props.logInUser(credentials)
      this.props.history.push('/main')
    } catch (e) {
      console.log(e.message)
    }
  }

  redirectSignup = e => {
    return <Link to='/signup' />
  }

  render() {
    return (
      <form id='login' onSubmit={this.handleSubmit}>
        <h1>Login Form</h1>
        <input
          name="username"
          type="text"
          placeholder="username"
        />

        <input
          name="password"
          type="password"
          placeholder="password"
        />

        <input
          name="submit"
          type="submit"
          value="Log In" />

        <Link to='/signup'><input type="button" value="New User?" /></Link>

      </form>
    )
  }
}

export default connect(null, mapDispatchtoProps)(LoginForm)