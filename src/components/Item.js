import React from 'react';

const Item = ({ item }) => {
  return (
    <span className='item-details'>
      <img src={item.image} alt={item.name} />
      <span className='slider'>
        <div className='text'>{item.name}</div>
      </span>
    </span>
  )
}

export default Item;