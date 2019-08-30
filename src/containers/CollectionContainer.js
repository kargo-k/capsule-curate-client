import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { items: state.items }
}

const mapDispatchToProps = dispatch => {
  return {
    // showItem: (item) => dispatch(showItem(item))
  }
}

class CollectionContainer extends React.Component {
  render() {
    return (
      <h1> Collection Container</h1 >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)