import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addItem } from '../actions';

const mapStateToProps = state => {
  return {
    item: state.show_item,
    capsules_list: state.capsules_list
  }
}

const mapDispatchToProps = dispatch => {
  return { addItem: (payload) => dispatch(addItem(payload)) }
}

const ShowItem = ({ item, capsules_list, addItem }) => {

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit add capsule')
  }

  if (!item) {
    return <Redirect to='/explore' />
  } else {
    return (
      <div className='container' id='item-details'>
        <h1>{item.name}</h1>
        <div className='details'>
          <img src={item.image} />
          <div className='text'>
            Brand: {item.brand} <br />
            Price: {item.price} <br />

            <a target='_blank' className='btn' href={`https://${item.shop_link}`}>Purchase</a>

            <form onSubmit={handleSubmit}>

              {/* active capsule is the default selected capsule */}
              <select>
                {capsules_list.map(capsule => <option key={capsule.id} value={capsule.id} selected={capsule.active ? 'selected' : null}>{capsule.title}</option>)}
              </select>

              <label className='single top'><input
                className='btn'
                name="submit"
                type="submit"
                value="Add to Capsule" /></label>

            </form>

          </div>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps)(ShowItem)