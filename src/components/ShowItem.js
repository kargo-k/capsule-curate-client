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
    return (
      <div id='item-details' className='container'>
        <h1>{item.name} {item.brand ? `// ${item.brand}` : null}</h1>
        <div className='wrapper' >

          <img src={item.image} alt={item.name} />

          <div className='right'>
            <div className='text'>{item.color ? `Color: ${item.color}` : null}</div>
            <div className='text'>{item.price ? `Price: ${item.price}` : null}</div>
            <div className='text'>{item.description ? `Description: ${item.description}` : null}</div>

            <form onSubmit={handleSubmit} id='show-item-form'>

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

              <h1>{item.personal}</h1>

              {!item.personal ? <label><a target='_blank' rel="noopener noreferrer" className='btn' id="purchase" href={`https://${item.shop_link}`}>Purchase at {item.brand}</a></label> : null}

            </form>

          </div>

        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem)