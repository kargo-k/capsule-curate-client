import React from 'react';
import { connect } from 'react-redux';
import { showItem } from '../actions';

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
        <div className='text'>
          <div className='item-link' to='/item'>{props.item.name}
            <div className='subtext'>{props.item.brand} / {props.item.price}</div>
          </div>

        </div>
      </span>

    </span>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);