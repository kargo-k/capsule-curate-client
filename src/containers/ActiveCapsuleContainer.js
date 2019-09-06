import React from 'react';
import Weather from '../components/Weather';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';
import Outfit from '../components/Outfit';

const mapStateToProps = state => {
  return { active_capsule: state.active_capsule }
}

const ActiveCapsuleContainer = props => {

  return (
    <div className='container' id='active-container'>
      <div id='active-left' className='flex'>
        <Weather />
        <Outfit />
      </div>
      <div id='active-right' className='flex'>
        <h1>{props.active_capsule.title}</h1>
        <ItemsContainer />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ActiveCapsuleContainer);