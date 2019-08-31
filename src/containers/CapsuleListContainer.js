import React from 'react';
import { connect } from 'react-redux';
import { fetchCapsules, showCapsule } from '../actions';
import CapsuleListItem from '../components/CapsuleListItem'

const mapStateToProps = state => {
  return { capsules_list: state.capsules_list }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCapsules: () => dispatch(fetchCapsules())
  }
}

class CapsuleListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchCapsules()
  }

  render() {
    return (
      <div className='container' >
        <h1>Capsule Container</h1>
        {this.props.capsules_list
          && this.props.capsules_list.map(capsule =>
            <CapsuleListItem
              key={capsule.id}
              capsule={capsule}
            />)}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapsuleListContainer);