import React from 'react';
import { Link } from 'react-router-dom';

export default class SignupForm extends React.Component {

  state = {
    username: "",
    password: "",
    confirmPassword: "",
    checkPassword: null,
    email: "",
    first_name: "",
    last_name: "",
    location: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('create the new user!')
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  matchPassword = e => {
    this.setState({ [e.target.name]: e.target.value },
      () => setInterval(this.checkPW, 1500))
  }

  checkPW = () => {
    if (this.state.password === "") {
      this.setState({ checkPassword: null })
    } else if (this.state.password.length < 6) {
      this.setState({ checkPassword: 'Pick a longer password' })
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ checkPassword: 'Passwords do not match' })
    } else if (this.state.password === this.state.confirmPassword) {
      this.setState({ checkPassword: 'Passwords Match!' })
    }
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

        <label>Select a Password (minimum 6 characters):
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

          <div>
            {this.state.checkPassword ? this.state.checkPassword : null}
          </div>
        </label>

        <label>Location:
          <input
            name="location"
            type="text"
            placeholder="ZIP or City, State"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </label>

        <input
          name="submit"
          type="submit"
          value="Create Account"
        />

        <Link to='/login'><input type="button" value="Already Signed Up?" /></Link>

      </form>
    )
  }
}