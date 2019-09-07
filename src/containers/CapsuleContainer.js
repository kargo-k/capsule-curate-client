import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { toggleCapsule, updateItem } from '../actions';
import ItemsContainer from './ItemsContainer';
import Header from '../components/Header'

const mapStateToProps = state => {
  return {
    show_capsule: state.show_capsule,
    active_capsule: state.active_capsule,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCapsule: (id) => dispatch(toggleCapsule(id)),
    updateItem: payload => dispatch(updateItem(payload))
  }
}

class CapsuleContainer extends React.Component {

  // handleClick = id => {
  //   this.props.toggleCapsule(id)
  //   setTimeout(() => this.props.history.push('/deleted'), 500)
  // }

  splitColors = (cap_colors) => {
    let colors = cap_colors.split(";")
    let styles = {
      backgroundColor: `${colors[0]}`,
      backgroundImage:
        `linear-gradient(225deg, 
        ${colors[0]} 0%, 
        ${colors[1]} 25%, 
        ${colors[2]} 50%,
        ${colors[3]} 75%)`
    }
    return styles
  }

  render() {

    if (this.props.user) {
      let capsule = this.props.show_capsule || this.props.active_capsule
      if (capsule) {

        return (
          <div id='capsule-show' className='container'>

            <Header capsule={capsule} />

            {/* <h2>Current Capsule: {capsule.title}</h2>
            <h4>(Number of Items) {capsule.items && capsule.items.length}</h4>
            <h4>Active: {capsule.active ? `${true}` : `${false}`}</h4>
            <h4>Season: {capsule.season}</h4>

            <Link to='#' className='btn' onClick={() => this.handleClick(capsule.id)}>Delete Capsule</Link> */}

            <ItemsContainer capsule_id={capsule.id} updateItem={this.props.updateItem} />

          </div >
        )
      } else {
        return (<div className='container'>
          <h3>Welcome back, {this.props.user.username}</h3>
          <p>Looks like you don't have an active capsule. Activate an existing capsule, or <Link to='/new'>curate a new one!</Link></p>
        </div>)
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapsuleContainer)