import React from 'react';

const Item = ({ item }) => {
  return (
    <React.Fragment>
      <img src={item.image} alt={item.name} />
    </React.Fragment>
  )
}

export default Item;