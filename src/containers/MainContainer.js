import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CapsuleContainer from './CapsuleContainer';

const mapStateToProps = state => {
  return { logged_in: state.logged_in }
}

const MainContainer = props => {
  return (
    <div className='main container'>
      {props.logged_in
        ? (<React.Fragment>
          <CapsuleContainer />
        </React.Fragment>)
        : (<Redirect to='/' />)
      }

    </div>
  )
}

export default connect(mapStateToProps)(MainContainer)