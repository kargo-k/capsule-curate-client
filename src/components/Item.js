import React from 'react';

const Item = props => {

  return (
    <span className='item-details'>
      <img src={props.item.image} alt={props.item.name} />

      <span className='slider' >

        {props.updateItem &&
          <button className='ar-btn' onClick={() => props.updateItem({ capsule_id: props.capsule_id, item_id: props.item.id })}>Remove</button>}

        {props.addItem &&
          <button className='ar-btn' onClick={() => props.addItem({ capsule_id: props.active_capsule.id, item_id: props.item.id })}>Add</button>}

        <div className='text' onClick={() => props.handleClick(props.item)}>{props.item.name}
          <div className='subtext'>{props.item.brand}</div>
        </div>
      </span>
    </span>
  )
}

export default Item;