import React from 'react';

const Header = props => {

  return (
    <div className='header'>
      <h1>{props.capsule.name} for {props.capsule.season} Season</h1>
      <h3>{props.capsule.items.length} Items</h3>
      <h3>{props.capsule.active ? 'This is your current active capsule' : null}</h3>
    </div>
  )
}

export default Header;