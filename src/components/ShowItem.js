import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  console.log('state:', state)
  return { show_item: state.show_item }
}

const ShowItem = ({ show_item }) => {

  if (!show_item) {
    return <Redirect to='/explore' />
  } else {
    return (
      <div className='container' id='item-details'>
        <h1>{show_item.name}</h1>
        <div className='details'>
          <img src={show_item.image} />
          <div className='text'>
            Brand: {show_item.brand} <br />
            Price: {show_item.price} <br />

            <a target='_blank' className='btn' href={`https://${show_item.shop_link}`}>Purchase</a>

          </div>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps)(ShowItem)