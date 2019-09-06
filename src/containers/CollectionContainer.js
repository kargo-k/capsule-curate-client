import React from 'react';
import Browse from '../components/Browse';
import ShowItem from '../components/ShowItem';



class CollectionContainer extends React.Component {

  render() {
    return (
      <div className='container' id='collection'>
        <Browse />
        <ShowItem />
      </div>
    )
  }
}

export default CollectionContainer;