import React from 'react';
import { connect } from "react-redux";
import Item from '../components/Item'

const mapStateToProps = state => {
  return { items: state.show_capsule.items }
}

class ItemsContainer extends React.Component {
  render() {
    return (
      <div className='grid'>
        {this.props.items && this.props.items.map(item => <Item key={item.id} item={item} />)}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ItemsContainer);