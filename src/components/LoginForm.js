import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
      console.log('frontend login post', e.message)
    }
  }

  render() {
    return (
      <form id='login' onSubmit={this.handleSubmit}>
        <h1>Login Form</h1>
        <label>Username: <input
          name="username"
          type="text"
          placeholder="Username"
        /></label>

        <label>Password:
        <input
            name="password"
            type="password"
            placeholder="Password"
          /></label>

        <label className='single top'><input
          className='btn'
          name="submit"
          type="submit"
          value="Log In" /></label>

        <label className='single'><Link to='/signup'>New User?</Link></label>

      </form>
    )
  }
}

export default connect(null, mapDispatchtoProps)(LoginForm)