import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../actions'

const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch(logOutUser()) }
}

const Logout = props => {

  props.logout()
  localStorage.clear()
  setTimeout(() => props.history.push('/'), 5000)

  return (
    <div className='container'>
      <h4>You are Logged out</h4>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Logout);