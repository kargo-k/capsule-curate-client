import React from 'react';
import { Link } from 'react-router-dom';
import { API } from '../constants/api-url';
import { withRouter } from 'react-router-dom';

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

  handleSubmit = e => {
    e.preventDefault()

    // submits a POST request to create the user
    fetch(API + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          location: this.state.location
        }
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          this.setState({ submitError: json.error })
          console.log('failed to create user')
        } else {
          console.log('successfully created user')
          // this.setState({ password: "", confirmPassword: "" })
          // update store to the current user and jwt token here
          this.props.history.push('/main')
        }
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, submitError: "" }, () => setInterval(this.checkUsername, 2000))
  }

  matchPassword = e => {
    this.setState({ [e.target.name]: e.target.value },
      () => setInterval(this.checkPW, 2000))
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

  render() {
    return (
      <form id="signup" onSubmit={this.handleSubmit}>

        <label>Select a Username:
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </label>

        {/* shows the error message for username if invalid */}
        <span className='error'>
          {this.state.validUsername ? null : this.state.userMsg}
        </span>

        <label>Select a Password:  (minimum {this.passwordMin} characters)
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.matchPassword}
          />
        </label>

        <label>Confirm Password:
          <input
            name="confirmPassword"
            type="password"
            placeholder="Password"
            value={this.state.confirmPassword}
            onChange={this.matchPassword}
          />

          {/* shows error for password if invalid */}
          <span className='error'>
            {this.state.validPassword ? null : this.state.errorMsg}
          </span>
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

        <input
          name="submit"
          type="submit"
          value="Create Account"
          disabled={!(this.state.validUsername && this.state.validPassword)}
        />

        <Link to='/login'><input type="button" value="Already Have An Account?" /></Link>

        {/* shows error after submit if user cannot be created */}
        <span className='error'>
          {this.state.submitError ? this.state.submitError : null}
        </span>

      </form>
    )
  }
}

export default withRouter(SignupForm)