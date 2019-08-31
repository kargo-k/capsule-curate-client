import React from 'react';
import { Link } from 'react-router-dom';

const Landing = props => {
  return (
    <header className="landing-header">
      <h1>capsule curate</h1>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
      <Link to='/about'>About</Link>
    </header>
  )
}

export default Landing