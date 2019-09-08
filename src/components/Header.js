import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCapsule } from '../actions';

const mapDispatchToProps = dispatch => {
  return { toggleCapsule: id => dispatch(toggleCapsule(id)) }
}

const mapStateToProps = state => {
  return { active_capsule: state.active_capsule }
}

const Header = props => {

  const handleClick = id => {
    props.toggleCapsule(id)
  }

  return (
    <div className='header'>
      <h1>{props.capsule.title} {props.capsule == props.active_capsule ? '(Active)' : null}</h1>
      <h3>{props.capsule.season} Season </h3>
      <h3>{props.capsule.items.length} of 36 Hangers Filled</h3>

      <Link to='#' className='btn' onClick={() => handleClick(props.capsule.id)}>{props.capsule === props.active_capsule ? 'Put Away' : 'Start Wearing'}</Link>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);