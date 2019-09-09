import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../actions'

const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch(logOutUser()) }
}

const Logout = props => {

  props.logout()

  return (
    <div className='container'>
      <h4>You are Logged out</h4>
      <Link to='/' className='btn'>Home</Link>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Logout);