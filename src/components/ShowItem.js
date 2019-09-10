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

class ShowItem extends React.Component {
  // = ({ item, capsules_list, updateItem, active_capsule }) =>

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
    updateItem(payload)
    this.setState({ clicked: true })
  }

  render() {
    if (!this.props.item) {
      return <Redirect to='/discover' />
    } else {
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
                        {this.props.capsules_list.map(capsule => <option key={this.props.capsule.id} value={this.props.capsule.id} >{this.props.capsule.title}</option>)}
                      </select>
                    </label>

                    <input
                      className='btn accent'
                      name="submit"
                      id='add-item-btn'
                      type="submit"
                      disabled={this.state.clicked}
                      value="Add" />
                  </div>}

                <h1>{this.props.item.personal}</h1>

                {!this.props.item.personal ? <label><a target='_blank' rel="noopener noreferrer" className='btn' id="purchase" href={`https://${this.props.item.shop_link}`}>Purchase at {this.props.item.brand}</a></label> : null}

              </form>

            </div>

          </div>
        </div >
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem)