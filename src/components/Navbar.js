import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCapsules } from '../actions'
import CapsuleListItem from './CapsuleListItem';

const mapStateToProps = state => {
  return {
    capsules_list: state.capsules_list
  }
}

const mapDispatchToProps = dispatch => {
  return { fetchCapsules: () => dispatch(fetchCapsules()) }
}

class Navbar extends React.Component {
  render() {
    if (!localStorage.getItem('username')) {
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
                  <NavLink to='/explore'>Discover</NavLink>
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
      this.props.fetchCapsules()
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
                  <NavLink to='/explore'>Discover</NavLink>
                </li>

                <li>
                  <NavLink to='/main'>Capsules</NavLink>
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
                  <NavLink to='/account'>{localStorage.getItem('username')}</NavLink>
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