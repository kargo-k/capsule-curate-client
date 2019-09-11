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
    e.preventDefault()
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
        <div id='close-x' className='close' onClick={this.props.onClose}>X</div>

        <h1>{this.props.item.name} {this.props.item.brand ? `// ${this.props.item.brand}` : null}</h1>
        <div className='wrapper' >

          <img src={this.props.item.image} alt={this.props.item.name} />

          <div className='right'>
            <div className='text'>{this.props.item.color ? `Color: ${this.props.item.color}` : null}</div>
            <div className='text'>{this.props.item.price ? `Price: ${this.props.item.price}` : null}</div>
            <div className='text'>{this.props.item.description ? `Description: ${this.props.item.description}` : null}</div>

            <form id='show-item-form'>

              {!this.props.active_capsule ? null :
                <React.Fragment>
                  <label>Add this to a capsule:
              <select name='capsule' defaultValue={this.props.active_capsule.id} onChange={this.handleSelect}>
                      {this.props.capsules_list.map(capsule => <option key={capsule.id} value={capsule.id} >{capsule.title}</option>)}
                    </select>
                  </label>


                  {this.state.item_in_capsule
                    ? <button
                      className='update-button'
                      id='add-item-btn'
                      disabled={this.state.clicked}
                      onClick={this.handleSubmit}
                    >{this.state.clicked ? 'Removed!' : 'Remove from Capsule'}</button>
                    : <button
                      className='update-button'
                      id='add-item-btn'
                      disabled={this.state.clicked}
                      onClick={this.handleSubmit}
                    >{this.state.clicked ? 'Added!' : 'Add to Capsule'}</button>}

                </React.Fragment>}

              <div className='btn-list'>
                {!this.props.item.personal ? <a target='_blank' rel="noopener noreferrer" className='btn' id="purchase" href={`https://${this.props.item.shop_link}`}>Purchase at {this.props.item.brand}</a> : null}


                <button type='submit' onClick={this.props.onClose} id='close'>Close</button>
              </div>

            </form>

          </div>

        </div>
      </div >
    )
  }
}

export default connect(null, mapDispatchToProps)(ShowItem)