import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { deleteCapsule, removeItem } from '../actions';
import ItemsContainer from './ItemsContainer';

const mapStateToProps = state => {
  return {
    show_capsule: state.show_capsule,
    active_capsule: state.active_capsule,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCapsule: (id) => dispatch(deleteCapsule(id)),
    removeItem: payload => dispatch(removeItem(payload))
  }
}

class CapsuleContainer extends React.Component {

  handleClick = id => {
    this.props.deleteCapsule(id)
    setTimeout(() => this.props.history.push('/deleted'), 500)
  }

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
        let styles
        capsule.colors ? styles = this.splitColors(capsule.colors) : styles = { backgroundColor: '#fcfcfa' }
        return (
          <div id='capsule-show' className='container' style={styles}>
            <h2>Current Capsule: {capsule.title}</h2>
            <h4>(Number of Items) {capsule.items && capsule.items.length}</h4>
            <h4>Active: {capsule.active ? `${true}` : `${false}`}</h4>
            <h4>Season: {capsule.season}</h4>

            <Link to='#' className='btn' onClick={() => this.handleClick(capsule.id)}>Delete Capsule</Link>

            <ItemsContainer capsule_id={capsule.id} removeItem={this.props.removeItem} />

          </div >
        )
      } else {
        return (<div className='container'>
          <h3>Welcome back, {this.props.user.username}</h3>
          <p>Looks like you don't have an active capsule. <Link to='/new'>curate a new one!</Link></p>
        </div>)
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapsuleContainer)