import React from 'react';
import Browse from '../components/Browse';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';
import { fetchCollection } from '../actions';

const mapStateToProps = state => {
  return { collection: state.collection }
}

const mapDispatchToProps = dispatch => {
  return { fetchCollection: () => dispatch(fetchCollection()) }
}

class CollectionContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      category: null,
      page: 0,
      items: null
    }
  }

  componentDidMount() {
    this.props.fetchCollection()
  }

  handleChange = e => {
    console.log('searching...');
    let filtered_items = this.props.collection.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({
      keyword: e.target.value,
      items: filtered_items
    })
  }

  handleSelect = e => {
    console.log('selection made', e.target.value);
    let category_items = this.props.collection.filter(i => i.category === e.target.value || i.category2 === e.target.value)
    this.setState({
      category: e.target.value,
      items: category_items
    })
  }

  render() {
    return (
      <div className='container flex' id='collection'>
        <Browse search={this.state.keyword} onChange={this.handleChange} sel={this.state.category} onSelect={this.handleSelect} />

        <ItemsContainer items={this.state.items ? this.state.items.slice(0, 36) : null} />
        {/* <ItemsContainer items={this.state.items || this.props.collection} /> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);