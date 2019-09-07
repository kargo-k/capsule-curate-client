import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCapsule } from '../actions';

const mapDispatchToProps = dispatch => {
  return { toggleCapsule: id => dispatch(toggleCapsule(id)) }
}

const Header = props => {

  const handleClick = id => {
    props.toggleCapsule(id)
  }

  return (
    <div className='header'>
      <h1>{props.capsule.title} {props.capsule.active ? '(Active)' : null}</h1>
      <h3>{props.capsule.season} Season </h3>
      <h3>{props.capsule.items.length} of 36 Hangers Filled</h3>

      <Link to='#' className='btn' onClick={() => handleClick(props.capsule.id)}>{props.capsule.active ? 'Put Away' : 'Start Wearing'}</Link>


    </div>
  )
}

export default connect(null, mapDispatchToProps)(Header);