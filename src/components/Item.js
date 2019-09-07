import React from 'react';
import { connect } from 'react-redux';
import { showItem } from '../actions';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return { show_item: (payload) => dispatch(showItem(payload)) }
}

const mapStateToProps = state => {
  return {}
}

const Item = props => {

  const handleOnClick = item => {
    props.show_item(item)
  }

  return (
    <span className='item-details' onClick={() => handleOnClick(props.item)}>
      <img src={props.item.image} alt={props.item.name} />

      <span className='slider' >
        {/* The button to remove an item from a capsule only appears when the item is viewed inside a capsule */}
        {props.updateItem &&
          <button className='remove-btn' onClick={() => props.updateItem({ capsule_id: props.capsule_id, item_id: props.item.id })}>Remove</button>}

        <Link className='item-link' to='/item'>
          <div className='text'>{props.item.name}
            <div className='subtext'>{props.item.brand}</div>
          </div>
        </Link>

      </span>



    </span>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);