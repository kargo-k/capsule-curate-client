import React from 'react';
import { connect } from 'react-redux'
import CapsuleListContainer from './CapsuleListContainer';
import DetailsContainer from './DetailsContainer';
import CapsuleContainer from './CapsuleContainer';
import ExploreContainer from './ExploreContainer';
import CollectionContainer from './CollectionContainer';

const mapStateToProps = state => {
  return { logged_in: state.logged_in }
}

const MainContainer = props => {
  return (
    <div className='main container'>
      {props.logged_in
        ? (<React.Fragment>
          <CapsuleListContainer />
          <CapsuleContainer />
          {/* <DetailsContainer /> */}

        </React.Fragment>)
        : (<React.Fragment>
          <ExploreContainer />
        </React.Fragment>)
      }

    </div>
  )
}

export default connect(mapStateToProps)(MainContainer)