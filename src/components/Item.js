import React from 'react';

const Item = ({ item }) => {
  return (
    <span className='item-details'>
      <img src={item.image} alt={item.name} />
      <span className='slider'>{item.name}</span>
    </span>
  )
}

export default Item;