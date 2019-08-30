import React from 'react';
import { connect } from 'react-redux'
import CapsuleContainer from './CapsuleContainer';
import DetailsContainer from './DetailsContainer';
import ExploreContainer from './ExploreContainer';
import CollectionContainer from './CollectionContainer';

const mapStateToProps = state => {
  console.log(state)
  return { logged_in: state.logged_in }
}

const MainContainer = props => {
  return (
    <div className='main container'>
      <h1>Main Container</h1>
      {props.logged_in
        ? (<React.Fragment>
          <span>I am logged in</span>
          <CapsuleContainer />
          <DetailsContainer />
          <CollectionContainer />
        </React.Fragment>)
        : (<React.Fragment>
          <ExploreContainer />
        </React.Fragment>)
      }

    </div>
  )
}

export default connect(mapStateToProps)(MainContainer)