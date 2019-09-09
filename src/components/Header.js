import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCapsule } from '../actions';

const mapDispatchToProps = dispatch => {
  return { toggleCapsule: id => dispatch(toggleCapsule(id)) }
}

const mapStateToProps = state => {
  return {
    active_capsule: state.active_capsule,
    show_capsule: state.show_capsule
  }
}

const Header = props => {

  const handleClick = id => {
    console.log('handle click heard -- toggle active status of capsule');
    props.toggleCapsule(id)

  }

  return (
    <div className='header'>
      <h1>{props.show_capsule.title} {props.show_capsule == props.active_capsule ? '(Active)' : null}</h1>
      <h3>{props.show_capsule.season} Season </h3>
      <h3>{props.show_capsule.items.length} of 36 Hangers Filled</h3>

      <Link to='#' className='btn' onClick={props.handleShow}>Add A New Item</Link>

      <Link to='#' className='btn' onClick={() => handleClick(props.show_capsule.id)}>{props.show_capsule == props.active_capsule ? 'Put Away' : 'Start Wearing'}</Link>
    </div >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);