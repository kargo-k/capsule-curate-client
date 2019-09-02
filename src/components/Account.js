import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return { user: state.user }
}

const Account = ({ user }) => {

  if (!user) {
    return (
      // Redirect to root if the user is not logged in
      <Redirect to='/' />
    )
  } else {
    return (<div className='user container'>
      <h1>{user.username}</h1>
      <h3>{user.location}</h3>
    </div>)
  }
}

export default connect(mapStateToProps)(Account);