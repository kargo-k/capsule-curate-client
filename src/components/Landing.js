import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { user: state.user }
}

const Landing = props => {
  if (props.user && props.user.username) {
    return <Redirect to='/active' />
  } else {
    return (
      <header id="landing">
        <h1>capsule curate</h1>
        <span>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
          <Link to='/about'>About</Link>
        </span>
      </header>
    )
  }

}

export default connect(mapStateToProps)(Landing);