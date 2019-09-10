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

  if (!JSON.parse(localStorage.getItem('user'))) {
    return (
      // Redirect to root if the user is not logged in
      <Redirect to='/' />
    )
  } else {
    // If the user is logged in, show user details
    return (<div className='user container'>
      <form>
        <h1><u>Account</u></h1>

        <h3>{props.user.username}</h3>
        <h3>Location: {props.user.location}</h3>

        <Link className='btn' onClick={props.delete_user}>Delete Account</Link>
      </form>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);