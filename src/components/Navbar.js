import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const Navbar = props => {
  return (
    <div id='navbar'>
      <h1><Link to='/'>capsule curate</Link></h1>
      <div className='links'>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
        {props.user
          ? <NavLink to='/main'>{props.user.username}</NavLink>
          : <NavLink to='/main'>Explore</NavLink>}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Navbar)