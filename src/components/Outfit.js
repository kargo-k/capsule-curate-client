import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { active_capsule: state.active_capsule }
}

const Outfit = props => {
  return (
    <h1>#OOTD</h1>
  )
}

export default Outfit;