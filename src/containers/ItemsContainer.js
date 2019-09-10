import React from 'react';
import Item from '../components/Item'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ShowItem from '../components/ShowItem';

const mapStateToProps = state => {
  return {
    capsules_list: state.capsules_list,
    active_capsule: state.active_capsule
  }
}

class ItemsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show_item_details: false,
      show_item: null
    }
  }

  handleClick = item => {
    this.setState({
      show_item_details: true,
      show_item: item
    })
  }

  handleClose = () => {
    this.setState({ show_item_details: false })
  }

  render() {
    if (this.props.items === null) {
      return (
        <div className='container'>
          <Link className='btn' to='/discover'>Browse the Curated Collection</Link>
        </div>
      )
    } else {
      let items = this.props.items
      if (items.length === 0) {
        return (
          <div className='container'>
            <Link className='btn' to='/discover'>Browse the Curated Collection to start adding items to your capsule</Link>
          </div>
        )
      } else {
        return (
          <React.Fragment>
            {this.state.show_item_details ? <ShowItem item={this.state.show_item} onClose={this.handleClose} /> :
              <div className='flex' id='items-container'>
                {items && items.map(item => <Item
                  key={item.id}
                  item={item}
                  capsule_id={this.props.capsule_id}
                  updateItem={this.props.updateItem}
                  handleClick={this.handleClick}
                />)}
              </div>}
          </React.Fragment>
        )
      }
    }
  }
}

export default connect(mapStateToProps)(ItemsContainer);