import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Item from '../components/Item';
import { deleteCapsule } from '../actions';

const mapStateToProps = state => {
  return {
    show_capsule: state.show_capsule,
    logged_in: state.logged_in
  }
}

const mapDispatchToProps = dispatch => {
  return { deleteCapsule: (id) => dispatch(deleteCapsule(id)) }
}

class CapsuleContainer extends React.Component {

  handleClick = id => {
    console.log('inside handle click', this.props.history)
    this.props.deleteCapsule(id)
    setTimeout(() => this.props.history.push('/deleted'), 500)
  }

  render() {
    if (this.props.logged_in) {
      if (this.props.show_capsule) {
        return (
          <div id='capsule-show' className='container'>
            <h2>Current Capsule: {this.props.show_capsule.title}</h2>
            <h4>(Number of Items) {this.props.show_capsule.items && this.props.show_capsule.items.length}</h4>
            <h4>Active: {this.props.show_capsule.active ? `${true}` : `${false}`}</h4>
            <h4>{this.props.show_capsule.colors}</h4>

            <h3>Settings:</h3>
            <Link to='#' onClick={() => this.handleClick(this.props.show_capsule.id)}>Delete Capsule</Link>

            <div id='grid-parent'>
              {this.props.show_capsule.items && this.props.show_capsule.items.map(item => <Item key={item.id} item={item} />)}
            </div>
          </div>
        )
      } else {
        return (<div className='container'>
          <h1>No Active Capsules!  Curate a new capsule!</h1>
        </div>)
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapsuleContainer)