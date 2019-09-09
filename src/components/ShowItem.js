import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateItem, fetchCapsules } from '../actions';

const mapStateToProps = state => {
  return {
    item: state.show_item,
    capsules_list: state.capsules_list,
    active_capsule: state.active_capsule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateItem: (payload) => dispatch(updateItem(payload)),
    fetchCapsules: () => dispatch(fetchCapsules())
  }
}

const ShowItem = ({ item, capsules_list, updateItem, active_capsule }) => {

  let style

  const handleSubmit = e => {
    e.preventDefault()
    let payload = {
      capsule_id: e.target.capsule.value,
      item_id: item.id
    }
    updateItem(payload)
  }

  if (!item) {
    return <Redirect to='/discover' />
  } else {
    style = { display: 'none' }
    return (
      <div id='item-details' className='container'>
        <h1>{item.name} // {item.brand}</h1>
        <div className='wrapper' >

        <img src={item.image} alt={item.name} />

        <div className='right'>
        <div className='text'>Color: {item.color}</div>
        <div className='text'>Price: {item.price}</div>

        <form onSubmit={handleSubmit} id='show-item-form'>

          {/* active capsule is the default selected capsule */}
          <div className='custom-select'>
            <label>Add this to a capsule:
              <select name='capsule' defaultValue={active_capsule.id}>
                {capsules_list.map(capsule => <option key={capsule.id} value={capsule.id} >{capsule.title}</option>)}
              </select>
            </label>
          </div>

          <label><input
            className='btn accent'
            name="submit"
            type="submit"
            value="Add" /></label>

        <label><a target='_blank' className='btn' id="purchase" href={`https://${item.shop_link}`}>Purchase at {item.brand}</a></label>

        </form>


        <div className='added-message' style={style}>Added Item!</div>
        </div>

        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem)