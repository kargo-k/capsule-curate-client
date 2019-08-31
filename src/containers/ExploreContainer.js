import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const mapStateToProps = state => {
  return { is_logged_in: state.is_logged_in }
}

const ExploreContainer = props => {
  return (
    <div className='explore container'>
      <h1>Explore Container</h1>
    </div>
  )
}

export default connect(mapStateToProps)(ExploreContainer)