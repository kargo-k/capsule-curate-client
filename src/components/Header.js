import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
    props.toggleCapsule(id)
    return <Redirect to='/active' />
  }

  let swatchStyle
  let colors = []
  if (props.show_capsule.colors) {
    colors = props.show_capsule.colors.split(";")
    swatchStyle = [{
      backgroundColor: `${colors[0]}`
    }, {
      backgroundColor: `${colors[1]}`
    }, {
      backgroundColor: `${colors[2]}`
    }, {
      backgroundColor: `${colors[3]}`
    }]
  } else {
    swatchStyle = {
      display: 'none'
    }
  }

  return (
    <div className='header'>
      <h1>{props.show_capsule.title} {props.show_capsule == props.active_capsule ? '(Active)' : null}</h1>

      <div id='swatch-div'>
        <div className='swatch' style={swatchStyle[0]}></div>
        <div className='swatch' style={swatchStyle[1]}></div>
        <div className='swatch' style={swatchStyle[2]}></div>
        <div className='swatch' style={swatchStyle[3]}></div>
      </div>

      <h3>{props.show_capsule.season} Season </h3>
      <h3>{props.show_capsule.items.length} of 36 Hangers Filled</h3>

      <Link to='/discover' className='btn'>Discover Items</Link>

      <Link to='#' className='btn' onClick={props.handleShow}>{props.showForm ? 'Hide Form' : 'Upload Item'}</Link>

      <Link to='#' className='btn' onClick={() => handleClick(props.show_capsule.id)}>{props.show_capsule == props.active_capsule ? 'Put Away' : 'Start Wearing'}</Link>
    </div >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);