import React from 'react';

const Item = props => {

  return (
    <span className='item-details' onClick={() => props.handleClick(props.item)}>
      <img src={props.item.image} alt={props.item.name} />

      <span className='slider' >
        {/* The button to remove an item from a capsule only appears when the item is viewed inside a capsule */}
        {props.updateItem &&
          <button className='remove-btn' onClick={() => props.updateItem({ capsule_id: props.capsule_id, item_id: props.item.id })}>Remove</button>}

        <div className='text'>{props.item.name}
          <div className='subtext'>{props.item.brand}</div>
        </div>
      </span>
    </span>
  )
}

export default Item;