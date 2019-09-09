import React from 'react';
import { connect } from "react-redux";
import Item from '../components/Item'

const mapStateToProps = state => {
  return { capsule: state.show_capsule || state.active_capsule }
}

class ItemsContainer extends React.Component {
  render() {

    if (this.props.capsule === null) {
      return (
        <div>
          No items to show.  Start adding items!
        </div>
      )
    } else {
      let items = this.props.capsule.items
      return (
        <div className='flex' id='items-container'>
          {items && items.map(item => <Item key={item.id} item={item} capsule_id={this.props.capsule.id} updateItem={this.props.updateItem} />)}
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(ItemsContainer);