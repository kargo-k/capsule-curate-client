import React from 'react';
import { connect } from 'react-redux';
import { updateItem, fetchCapsules } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    updateItem: (payload) => dispatch(updateItem(payload)),
    fetchCapsules: () => dispatch(fetchCapsules())
  }
}

class ShowItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    let payload = {
      capsule_id: e.target.capsule.value,
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

            <form onSubmit={this.handleSubmit} id='show-item-form'>

              {!this.props.active_capsule ? null :
                <div className='custom-select'>
                  <label>Add this to your capsule:
              <select name='capsule' defaultValue={this.props.active_capsule.id}>
                      {this.props.capsules_list.map(capsule => <option key={capsule.id} value={capsule.id} >{capsule.title}</option>)}
                    </select>
                  </label>

                  <button
                    className='btn accent'
                    name="submit"
                    id='add-item-btn'
                    type="submit"
                    disabled={this.state.clicked}>{this.state.click ? 'Saved!' : 'Add to Capsule'}
                  </button>
                </div>}

              <h1>{this.props.item.personal}</h1>

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