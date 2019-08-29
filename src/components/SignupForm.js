import React from 'react';
import { Link } from 'react-router-dom';

export default class SignupForm extends React.Component {

  passwordMin = 8

  state = {
    username: "",
    password: "",
    confirmPassword: "",
    validPassword: null,
    email: "",
    first_name: "",
    last_name: "",
    location: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('create the new user!')
    // TODO create POST reqest to server for User creation
    this.setState({ password: "", confirmPassword: "" })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  matchPassword = e => {
    this.setState({ [e.target.name]: e.target.value },
      () => setInterval(this.checkPW, 1500))
  }

  checkPW = () => {
    if (this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({ validPassword: null })
    } else if (this.state.password.length < this.passwordMin || this.state.confirmPassword < this.passwordMin) {
      this.setState({ validPassword: 'Please pick a longer password' })
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ validPassword: 'Passwords do not match' })
    } else if (this.state.password === this.state.confirmPassword) {
      this.setState({ validPassword: 'Passwords Match!' })
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

        <label>Select a Password (minimum {this.passwordMin} characters):
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

          <span>
            {this.state.validPassword ? this.state.validPassword : null}
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
        />

        <Link to='/login'><input type="button" value="Already Have An Account?" /></Link>

      </form>
    )
  }
}