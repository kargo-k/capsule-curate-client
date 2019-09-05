import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Item from '../components/Item';
import { deleteCapsule } from '../actions';
import ItemsContainer from './ItemsContainer';

const mapStateToProps = state => {
  return {
    show_capsule: state.show_capsule,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return { deleteCapsule: (id) => dispatch(deleteCapsule(id)) }
}

class CapsuleContainer extends React.Component {

  handleClick = id => {
    this.props.deleteCapsule(id)
    setTimeout(() => this.props.history.push('/deleted'), 500)
  }

  splitColors = () => {
    let colors = this.props.show_capsule.colors.split(";")
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
      if (this.props.show_capsule) {
        let styles
        this.props.show_capsule.colors ? styles = this.splitColors() : styles = { backgroundColor: '#fcfcfa' }
        return (
          <div id='capsule-show' className='container' style={styles}>
            <h2>Current Capsule: {this.props.show_capsule.title}</h2>
            <h4>(Number of Items) {this.props.show_capsule.items && this.props.show_capsule.items.length}</h4>
            <h4>Active: {this.props.show_capsule.active ? `${true}` : `${false}`}</h4>
            <h4>{this.props.show_capsule.colors}</h4>

            <Link to='#' className='btn' onClick={() => this.handleClick(this.props.show_capsule.id)}>Delete Capsule</Link>

            <ItemsContainer />

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