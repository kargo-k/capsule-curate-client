import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { deleteUser } from '../actions'

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return { delete_user: () => dispatch(deleteUser()) }
}

const Account = props => {

  if (!localStorage.getItem('username')) {
    return (
      // Redirect to root if the user is not logged in
      <Redirect to='/' />
    )
  } else {
    // If the user is logged in (in localstorage) then show user details
    return (<div className='user container'>
      <h1>{props.user.username}</h1>
      <h3>{props.user.location}</h3>

      <h1>Account Settings</h1>
      <Link to='#' >Update Profile</Link>
      <Link to='#' onClick={props.delete_user}>Delete Account</Link>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);