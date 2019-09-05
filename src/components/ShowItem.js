import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addItem, fetchCapsules } from '../actions';

const mapStateToProps = state => {
  return {
    item: state.show_item,
    capsules_list: state.capsules_list,
    active_capsule: state.active_capsule
  }
}

const mapDispatchToProps = dispatch => {
  return { addItem: (payload) => dispatch(addItem(payload)) }
}

const ShowItem = ({ item, capsules_list, addItem, active_capsule }) => {

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit add capsule', e.target.capsule.value)
    let payload = {
      capsule_id: e.target.capsule.value,
      item_id: item.id
    }
    addItem(payload)
    fetchCapsules()
  }

  if (!item) {
    return <Redirect to='/explore' />
  } else {
    console.log(active_capsule)
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
              <select name='capsule' defaultValue={active_capsule.id}>
                {capsules_list.map(capsule => <option key={capsule.id} value={capsule.id} >{capsule.title}</option>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem)