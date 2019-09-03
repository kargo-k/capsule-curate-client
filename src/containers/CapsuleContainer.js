import React from 'react';
import { connect } from 'react-redux';
import Item from '../components/Item';

const mapStateToProps = state => {
  return { show_capsule: state.show_capsule }
}

const CapsuleContainer = ({ show_capsule }) => {

  if (show_capsule) {
    return (
      <div id='capsule-show'>
        <h2>Current Capsule: {show_capsule.title}</h2>
        <h4>(Number of Items) {show_capsule.items.length}</h4>
        <h4>Active: {show_capsule.active ? `${true}` : `${false}`}</h4>
        <h4>{show_capsule.colors}</h4>

        <div id='grid-parent'>
          {show_capsule.items.map(item => <Item key={item.id} item={item} />)}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default connect(mapStateToProps)(CapsuleContainer)