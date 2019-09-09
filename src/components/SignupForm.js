import React from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    createUser: (user) => dispatch(createUser(user))
  }
}

class SignupForm extends React.Component {

  passwordMin = 4

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
    try {
      this.props.createUser(payload)
      setTimeout(() => this.props.history.push('/active'), 1000)
    } catch (e) {
      console.log(e.message)
    }
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
    return (
      <form id="signup" onSubmit={this.handleSubmit}>
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
        </span>

        <label className='single top'><input
          name="submit"
          className='btn'
          type="submit"
          value="Create Account"
          disabled={!(this.state.validUsername && this.state.validPassword)}
        /></label>

        <label className='single'><Link to='/login'>Already Have An Account?</Link></label>

        {/* shows error after submit if user cannot be created */}
        <span className='error'>
          {this.state.submitError ? this.state.submitError : null}
        </span>

      </form>
    )
  }
}


export default connect(null, mapDispatchToProps)(SignupForm)