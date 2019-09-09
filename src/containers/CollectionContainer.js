import React from 'react';
import Browse from '../components/Browse';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';

const mapStateToProps = state => {
  return {}
}

class CollectionContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {
    return (
      <div className='container flex' id='collection'>
        <Browse />

        <ItemsContainer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(CollectionContainer);