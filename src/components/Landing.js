import React from 'react';
import { Link } from 'react-router-dom';

const Landing = props => {
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

export default Landing