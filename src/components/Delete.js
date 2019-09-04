import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return { user: state.user }
}

const Delete = props => {

  setTimeout(() => props.history.push('/account'), 3000)

  if (!props.user.username) {
    return <Redirect to='/' />
  } else {
    return (
      <div className='container'>
        <h4>Capsule successfully deleted</h4>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Delete);