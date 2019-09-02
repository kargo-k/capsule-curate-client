import React from 'react';
import { connect } from 'react-redux';
import { showCapsule } from '../actions';

const mapDispatchToProps = dispatch => {
  return { show_capsule: (capsule) => dispatch(showCapsule(capsule)) }
}

class CapsuleListItem extends React.Component {

  handleOnClick = (capsule) => {
    this.props.show_capsule(capsule)
    console.log('redirect me to main pls', capsule)
  }
  render() {
    return (
      <li><a href="#" onClick={() => this.handleOnClick(this.props.capsule)}>
        {this.props.capsule.title}
      </a></li>
    )
  }
}

export default connect(null, mapDispatchToProps)(CapsuleListItem)