import React from 'react';

const Item = props => {

  return (
    <span className='item-details' onClick={() => props.handleClick(props.item)}>
      <img src={props.item.image} alt={props.item.name} />

      <span className='slider' >

        <div className='text'>{props.item.name}
          <div className='subtext'>{props.item.brand}</div>
        </div>
      </span>
    </span>
  )
}

export default Item;