import React from 'react';
import CapsuleContainer from './CapsuleContainer';
import DetailsContainer from './DetailsContainer';

const MainContainer = props => {
  return (
    <div className='main container'>
      <h1>Main Container</h1>
      <CapsuleContainer />
      <DetailsContainer />
    </div>
  )
}

export default MainContainer