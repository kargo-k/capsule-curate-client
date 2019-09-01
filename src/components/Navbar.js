import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CapsuleListItem from './CapsuleListItem';
import { fetchCapsules } from '../actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    capsules_list: state.capsules_list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCapsules: () => dispatch(fetchCapsules())
  }
}

class Navbar extends React.Component {

  state = {
    showMenu: false
  }

  handleShowCapsules = () => {
    this.setState({ showMenu: true })
  }

  handleHideCapsules = () => {
    this.setState({ showMenu: false })
  }

  componentDidMount() {
    this.props.fetchCapsules()
    document.addEventListener('click', this.handleHideCapsules)
  }

  render() {
    return (
      <div id='outer-navbar'>
        <div id='navbar'>
          <h1><Link to='/'>capsule curate</Link></h1>
          <div className='links'>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/explore'>Explore</NavLink>
            {this.props.user
              ? (<React.Fragment>
                <NavLink to='/main' onMouseOver={this.handleShowCapsules} >Capsules</NavLink>
                <NavLink to='/account'>{this.props.user.username}</NavLink>
              </React.Fragment>)
              : (<React.Fragment>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
              </React.Fragment>)
            }
          </div>
        </div>

        {this.state.showMenu
          ? (<div id='capsule-list'>
            {this.props.capsules_list
              && this.props.capsules_list.map(capsule =>
                <CapsuleListItem
                  key={capsule.id}
                  capsule={capsule}
                />)}
          </div>)
          : null
        }
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)