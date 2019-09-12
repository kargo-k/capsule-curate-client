import React from 'react';
import Item from '../components/Item'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ShowItem from '../components/ShowItem';
import { fetchCapsules } from '../actions';

const mapStateToProps = state => {
  return {
    capsules_list: state.capsules_list,
    active_capsule: state.active_capsule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCapsules: () => dispatch(fetchCapsules)
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

  componentDidMount() {
    this.props.fetchCapsules()
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
        <div className='container' >
          <Link className='btn' id="discover-btn" to='/discover'>Start Curating!</Link>
        </div>
      )
    } else {
      let items = this.props.items
      if (items.length === 0) {
        return (
          <div className='container' style={{ border: '1px solid #ccc' }}>
            <h1>no items in your capsule.</h1>
            <Link className='btn browse' to='/discover'>Add Items from the Curated Collection</Link>
          </div>
        )
      } else {
        return (
          // shows the item details when an item thumbnail is clicked and then hides the rest of the item collections.  when the details are clicked to be hidden, the rest of the items show up again
          <React.Fragment>
            {this.state.show_item_details
              ? <ShowItem
                item={this.state.show_item}
                onClose={this.handleClose}
                active_capsule={this.props.active_capsule}
                capsules_list={this.props.capsules_list}
                updateItem={this.props.updateItem}
              />
              : <div className='flex' id='items-container'>
                {items && items.map(item => <Item
                  key={item.id}
                  item={item}
                  capsule_id={this.props.capsule_id}
                  updateItem={this.props.updateItem}
                  handleClick={this.handleClick}
                  addItem={this.props.addItem}
                  active_capsule={this.props.active_capsule}
                />)}
              </div>}
          </React.Fragment>
        )
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);