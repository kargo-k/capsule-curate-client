import React from 'react';
import Weather from '../components/Weather';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';

const mapStateToProps = state => {
  return { active_capsule: state.active_capsule }
}

const ActiveCapsuleContainer = props => {

  return (
    <div className='container'>
      <Weather />
      <h1>{props.active_capsule.title}</h1>
      <ItemsContainer />
    </div>
  )
}

export default connect(mapStateToProps)(ActiveCapsuleContainer);