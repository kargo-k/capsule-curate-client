import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CapsuleListItem from './CapsuleListItem';

const mapStateToProps = state => {
  return {
    user: state.user,
    capsules_list: state.capsules_list,
    logged_in: state.logged_in
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

class Navbar extends React.Component {

  render() {
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
                <NavLink to='/explore'>Explore</NavLink>
              </li>

              {this.props.user
                ? (<React.Fragment>
                  <li>
                    <NavLink to='/main'>Capsules</NavLink>
                    <ul>
                      <li><Link to='/new'>_Curate New Capsule_</Link></li>
                      {this.props.capsules_list
                        && this.props.capsules_list.map(capsule =>
                          <CapsuleListItem
                            key={capsule.id}
                            capsule={capsule}
                          />)}
                    </ul>
                  </li>
                  <li>
                    <NavLink to='/account'>{this.props.user.username}</NavLink>
                    <ul>
                      <li><Link to='/account'>Account</Link></li>
                      <li><Link to='/logout'>Logout</Link></li>
                    </ul>
                  </li>
                </React.Fragment>)
                : (<React.Fragment>
                  <li>
                    <NavLink to='/login'>Log In</NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup'>Sign Up</NavLink>
                  </li>
                </React.Fragment>)
              }

            </ul>
          </div>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)