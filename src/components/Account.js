import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { API } from '../constants/api-url';
import { logOutUser } from '../actions';

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout_user: () => dispatch(logOutUser())
  }
}

const Account = props => {

  const destroyUser = e => {
    e.preventDefault()
    return fetch(API + '/delete', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        props.logout_user()
      })
      .catch(e => console.log('error in delete request', e))
  }

  if (!props.user) {
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

        <button className='btn' onClick={destroyUser}>Delete Account</button>
        <div>Note: this cannot be undone!</div>
      </form>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);