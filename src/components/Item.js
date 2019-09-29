import React from 'react';

class Item extends React.Component {

  state = { clicked: false }

  handleClick = (e) => {
    this.props.addItem({ capsule_id: this.props.active_capsule.id, item_id: this.props.item.id })
    this.setState({ clicked: true })
  }

  render() {
    return (
      <span className='item-details' >
        <img src={this.props.item.image} alt={this.props.item.name} />

        <span className='slider' >

          {this.props.updateItem &&
            <button className='ar-btn' onClick={() => this.props.updateItem({ capsule_id: this.props.capsule_id, item_id: this.props.item.id })}>Remove</button>}

          {this.props.addItem &&
            <button
              className='ar-btn'
              disabled={this.state.clicked}
              onClick={this.handleClick}>{this.state.clicked ? null : 'Add'}</button>}

          <div className='text' onClick={() => this.props.handleClick(this.props.item)}>{this.props.item.name}
            <div className='subtext'>{this.props.item.brand ? '// ' + this.props.item.brand : null}</div>
          </div>
        </span>
      </span>
    )
  }
}

export default Item;