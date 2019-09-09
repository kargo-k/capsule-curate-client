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
      items: []
    }
  }

  componentDidMount() {
    this.props.fetchCollection()
  }

  handleChange = e => {
    console.log('searching...');
    this.setState({ keyword: e.target.value })
  }

  handleSelect = e => {
    console.log('selection made', e.target.value);
    this.setState({ category: e.target.value })
  }

  render() {
    return (
      <div className='container flex' id='collection'>
        <Browse search={this.state.keyword} onChange={this.handleChange} sel={this.state.category} onSelect={this.handleSelect} />

        <ItemsContainer items={this.state.items} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);