import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('sign in! username: ', this.state.username, 'password: ', this.state.password)
  }

  redirectSignup = e => {
    return <Link to='/signup' />
  }

  render() {
    return (
      <form id='login' onSubmit={this.handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
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