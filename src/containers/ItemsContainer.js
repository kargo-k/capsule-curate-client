import React from 'react';
import Item from '../components/Item'


class ItemsContainer extends React.Component {
  render() {

    if (this.props.items === null) {
      return (
        <div>
          No items to show.  Start adding items!
        </div>
      )
    } else {
      let items = this.props.items
      return (
        <div className='flex' id='items-container'>
          {items && items.map(item => <Item key={item.id} item={item} capsule_id={this.props.capsule_id} updateItem={this.props.updateItem} />)}
        </div>
      )
    }
  }
}

export default ItemsContainer;