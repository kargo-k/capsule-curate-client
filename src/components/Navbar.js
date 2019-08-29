import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
  return (
    <React.Fragment>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Log In</NavLink>
      <NavLink to='/signup'>Sign Up</NavLink>
      <NavLink to='/main'>Main</NavLink>
    </React.Fragment>
  )
}

export default Navbar