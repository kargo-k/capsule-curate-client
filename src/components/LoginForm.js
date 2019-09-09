import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUser } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (credentials) => dispatch(logInUser(credentials))
  }
}

const mapStateToProps = state => {
  return { user: state.user }
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
    } catch (e) {
      console.log('frontend login post error', e.message)
    }
  }

  componentDidMount() {
    !this.props.user && this.username.focus()
  }

  render() {
    if (this.props.user) {
      return <Redirect to='/active' />
    } else {
      return (
        <form id='login' onSubmit={this.handleSubmit}>
          <h1>Login Form</h1>
          <label>Username: <input
            name="username"
            type="text"
            placeholder="Username"
            ref={(input) => { this.username = input }}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)