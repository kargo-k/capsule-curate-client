import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showItem } from '../actions';

const mapDispatchToProps = dispatch => {
  return { show_item: (payload) => dispatch(showItem(payload)) }
}

const mapStateToProps = state => {
  return {show_capsule: state.show_capsule}
}

const Item = props => {
  
  const handleOnClick = item => {
    props.show_item(item)
  }
  

  // if (props.show_capsule) {
  //   return (
  //     <span className='item-details'>
  //       <img src={props.item.image} alt={props.item.name} />  
  //     </span>
  //   )
  // } else {
  return (
    <span className='item-details'>
      <img src={props.item.image} alt={props.item.name} />
      <span className='slider' onClick={()=>handleOnClick(props.item)}>
        <div className='text'>
          <Link className='item-link' to='/item'>{props.item.name}
          <div className='subtext'>{props.item.brand} // {props.item.price}</div>
          </Link>
        </div>
      </span>

    </span>
  )
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);