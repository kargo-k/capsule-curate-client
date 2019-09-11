import React from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    updateItem: (payload) => dispatch(updateItem(payload))
  }
}

class ShowItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      sel_capsule: this.props.active_capsule.id,
      item_in_capsule: this.props.active_capsule.items.includes(this.props.item)
    }
  }

  handleSelect = e => {
    console.log('selection made', e.target.value);
    let target_capsule = this.props.capsules_list.filter(capsule => capsule.id === Number(e.target.value))[0]
    let result = target_capsule.items.includes(this.props.item)
    console.log('is the item in the capsule? ', result);
    this.setState({
      sel_capsule: e.target.value,
      item_in_capsule: result
    })
  }

  handleSubmit = e => {
    // e.preventDefault()
    let form_element = document.getElementById('show-item-form')
    let payload = {
      capsule_id: form_element.capsule.value,
      item_id: this.props.item.id
    }
    this.props.updateItem(payload)
    this.setState({ clicked: true })
  }

  render() {
    return (
      <div id='item-details' className='container'>
        <h1>{this.props.item.name} {this.props.item.brand ? `// ${this.props.item.brand}` : null}</h1>
        <div className='wrapper' >

          <img src={this.props.item.image} alt={this.props.item.name} />

          <div className='right'>
            <div className='text'>{this.props.item.color ? `Color: ${this.props.item.color}` : null}</div>
            <div className='text'>{this.props.item.price ? `Price: ${this.props.item.price}` : null}</div>
            <div className='text'>{this.props.item.description ? `Description: ${this.props.item.description}` : null}</div>

            <form id='show-item-form'>

              {!this.props.active_capsule ? null :
                <div className='custom-select'>
                  <label>Add this to a capsule:
              <select name='capsule' defaultValue={this.props.active_capsule.id} onChange={this.handleSelect}>
                      {this.props.capsules_list.map(capsule => <option key={capsule.id} value={capsule.id} >{capsule.title}</option>)}
                    </select>
                  </label>


                  {this.state.item_in_capsule
                    ? <button
                      className='btn accent'
                      id='add-item-btn'
                      disabled={this.state.clicked}
                      onClick={this.handleSubmit}
                    >{this.state.clicked ? 'Removed!' : 'Remove from Capsule'}</button>
                    : <button
                      className='btn accent'
                      id='add-item-btn'
                      disabled={this.state.clicked}
                      onClick={this.handleSubmit}
                    >{this.state.clicked ? 'Added!' : 'Add to Capsule'}</button>}

                </div>}

              {!this.props.item.personal ? <label><a target='_blank' rel="noopener noreferrer" className='btn' id="purchase" href={`https://${this.props.item.shop_link}`}>Purchase at {this.props.item.brand}</a></label> : null}

              <span className='btn' onClick={this.props.onClose} id='close'>Close</span>

            </form>

          </div>

        </div>
      </div >
    )
  }
}

export default connect(null, mapDispatchToProps)(ShowItem)