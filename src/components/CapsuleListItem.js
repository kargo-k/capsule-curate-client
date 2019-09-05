import React from 'react';
import { connect } from 'react-redux';
import { showCapsule } from '../actions';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    show_capsule: (capsule) => dispatch(showCapsule(capsule)),
  }
}

class CapsuleListItem extends React.Component {

  handleOnClick = (capsule) => {
    this.props.show_capsule(capsule)
  }


  render() {
    return (
      <li><Link to='/main' onClick={() => this.handleOnClick(this.props.capsule)}>
        {this.props.capsule.title}
      </Link></li>
    )
  }
}

export default connect(null, mapDispatchToProps)(CapsuleListItem)