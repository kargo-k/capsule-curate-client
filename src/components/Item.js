import React from 'react';

const Item = ({ item }) => {
  return (
    <React.Fragment>
      <h4>Item: {item.name}</h4>
      <img src={item.image} />
    </React.Fragment>
  )
}

export default Item;