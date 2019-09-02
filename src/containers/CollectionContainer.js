import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions';
import Item from '../components/Item';

const mapStateToProps = state => {
  return { collection: state.collection }
}

const mapDispatchToProps = dispatch => {
  return { fetchCollection: () => dispatch(fetchCollection()) }
}

class CollectionContainer extends React.Component {

  componentDidMount() {
    this.props.fetchCollection()
  }

  render() {
    return (
      <React.Fragment>
        <h1>Collection Container</h1>
        {this.props.collection && this.props.collection.map(item =>
          <Item key={item.id} item={item} />
        )}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)