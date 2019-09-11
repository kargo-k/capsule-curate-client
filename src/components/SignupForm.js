import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../actions';
import { API } from '../constants/api-url';

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

class SignupForm extends React.Component {

  passwordMin = 8

  state = {
    username: "",
    password: "",
    confirmPassword: "",
    validPassword: false,
    errorMsg: "",
    email: "",
    first_name: "",
    last_name: "",
    location: "",
    validUsername: false,
    userMsg: "",
    submitError: ""
  }

  componentWillUnmount() {
    clearInterval(this.matchPassword)
    clearInterval(this.checkPW)
    clearInterval(this.checkUsername)
  }

  handleSubmit = e => {
    e.preventDefault()
    let payload = {
      username: e.target.username.value,
      password: e.target.password.value,
      location: e.target.location.value
    }
    return fetch(API + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: payload
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 422) {
          this.setState({ submitError: 'Username already exists. Please select a new username.' })
        } else if (json.status === 201) {
          console.log('Created User', json)
          // when user is logged in or created, store token and user information in local storage and set the user information in state
          localStorage.setItem('token', json.jwt)
          localStorage.setItem('user', JSON.stringify(json.user))
          this.props.setUser(json.user)
        } else {
          this.setState({ submitError: 'Something went wrong. Please try again.' })
        }
      })
      .catch(e => console.log('error in create user request', e))

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, submitError: "" }, () => setInterval(this.checkUsername, 2000))
    // TODO change this to lodash _.debounce
  }

  matchPassword = e => {
    this.setState({ [e.target.name]: e.target.value },
      () => setInterval(this.checkPW, 1500))
  }

  checkPW = () => {
    if (this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({ validPassword: false })
    } else if (this.state.password.length < this.passwordMin || this.state.confirmPassword < this.passwordMin) {
      this.setState({ validPassword: false, errorMsg: 'Please pick a longer password' })
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ validPassword: false, errorMsg: 'Passwords do not match' })
    } else if (this.state.password === this.state.confirmPassword) {
      this.setState({ validPassword: true, errorMsg: '' })
    }
  }

  checkUsername = () => {
    (this.state.username.length > 2 && this.state.username.length < 16)
      ? this.setState({ validUsername: true, userMsg: "" }) : this.setState({ validUsername: false, userMsg: 'Username must be between 3-16 characters.' })
  }

  componentDidMount() {
    this.username.focus()
  }

  render() {

    if (this.props.user) {
      return <Redirect to='/new' />
    } else {

      return (
        <form id="signup" className='flex col' onSubmit={this.handleSubmit}>
          <h1>Create an Account</h1>

          <label><span className='left'><span>Select a Username:</span>
            <span className='subtext'>minimum 3 characters</span></span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
              ref={input => { this.username = input }}
            />
          </label>

          <label><span className='left'><span>Select a Password:</span>
            <span className='subtext'>minimum {this.passwordMin} characters</span></span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.matchPassword}
            /></label>


          <label>Confirm Password:
          <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.matchPassword}
            />
          </label>

          <label>Location:
          <input
              name="location"
              type="text"
              placeholder="ZIP or City, State"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </label>

          {/* shows error for password if invalid */}
          <span className='error'>
            {this.state.validUsername ? null : this.state.userMsg}
            <br />
            {this.state.validPassword ? null : this.state.errorMsg}
            <br />
            {/* shows error after submit if user cannot be created */}
            {this.state.submitError ? this.state.submitError : null}
          </span>

          <input
            name="submit"
            className='btn'
            type="submit"
            value="Create Account"
            disabled={!(this.state.validUsername && this.state.validPassword && this.state.location)}
          // user can only sign up when username and password are valid.  location must also be present, but there is not validity check on this
          />

          <Link to='/login'>Already Have An Account?</Link>

        </form>
      )
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);