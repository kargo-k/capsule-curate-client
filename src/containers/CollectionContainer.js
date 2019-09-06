import React from 'react';
import Browse from '../components/Browse';

class CollectionContainer extends React.Component {

  render() {
    return (
      <div className='container' id='collection'>
        <Browse />
      </div>
    )
  }
}

export default CollectionContainer;