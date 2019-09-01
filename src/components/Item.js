import React from 'react';

const Item = ({ item }) => {
  return (
    <React.Fragment>
      <img src={item.image} />
    </React.Fragment>
  )
}

export default Item;