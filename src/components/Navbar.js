import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showCapsule } from '../actions'
import CapsuleListItem from './CapsuleListItem';

const mapStateToProps = state => {
  return {
    capsules_list: state.capsules_list,
    active_capsule: state.active_capsule,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showCapsule: (payload) => dispatch(showCapsule(payload))
  }
}

class Navbar extends React.Component {

  handleOnClick = () => {
    // reinitializes the show capsule state to null so that when the user clicks on the username in the navbar, the active capsule will show
    this.props.showCapsule(this.props.active_capsule)
  }

  render() {
    if (!this.props.user) {
      // if the user is not logged in (no data in localstorage)
      return (
        <div id='nav-container'>
          <div id='navbar' className='nav'>
            <h1><Link to='/'>capsule curate</Link></h1>
            <div className='links'>
              <ul>
                <li>
                  <NavLink to='/about'>About</NavLink>
                </li>

                <li>
                  <NavLink to='/discover'>Discover</NavLink>
                </li>

                <li>
                  <NavLink to='/login'>Log In</NavLink>
                </li>

                <li>
                  <NavLink to='/signup'>Sign Up</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      // if the user is logged in, then render user's navbar
      return (
        <div id='nav-container'>
          <div id='navbar' className='nav'>
            <h1><Link to='/'>capsule curate</Link></h1>
            <div className='links'>
              <ul>
                <li>
                  <NavLink to='/about'>About</NavLink>
                </li>

                <li>
                  <NavLink to='/discover'>Discover</NavLink>
                </li>

                <li>
                  <NavLink to='/capsule'>Capsules</NavLink>
                  <ul>
                    <li><Link to='/new' id='curate-new'> + New Capsule</Link></li>
                    {this.props.capsules_list
                      && this.props.capsules_list.map(capsule =>
                        <CapsuleListItem
                          key={capsule.id}
                          capsule={capsule}
                        />)}
                  </ul>
                </li>
                <li>
                  <NavLink to='/active' onClick={this.handleOnClick}>{this.props.user.username}</NavLink>
                  <ul>
                    <li><Link to='/account'>Account</Link></li>
                    <li><Link to='/logout' >Logout</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div >
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)