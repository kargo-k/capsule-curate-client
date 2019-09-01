import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div id='navbar'>
      <h1><Link to='/'>capsule curate</Link></h1>
      <div className='links'>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
        <NavLink to='/main'>Capsules</NavLink>
      </div>
    </div>
  )
}

export default Navbar