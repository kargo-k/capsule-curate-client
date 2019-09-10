import React from 'react';
import Item from '../components/Item'
import { Link } from 'react-router-dom';


class ItemsContainer extends React.Component {
  render() {

    if (this.props.items === null) {
      return (
        <div className='container'>
          <Link className='btn' to='/discover'>Browse the Curated Collection</Link>
        </div>
      )
    } else {
      let items = this.props.items
      if (items.length === 0) {
        return (
          <div className='container'>
            <Link className='btn' to='/discover'>Browse the Curated Collection to start adding items to your capsule</Link>
          </div>
        )
      } else {
        return (
          <div className='flex' id='items-container'>
            {items && items.map(item => <Item key={item.id} item={item} capsule_id={this.props.capsule_id} updateItem={this.props.updateItem} />)}
          </div>
        )
      }
    }
  }
}

export default ItemsContainer;