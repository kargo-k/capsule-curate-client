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

  handleOnClick = () => {
    this.setState({ showMenu: true })
  }

  componentDidMount() {
    this.props.fetchCapsules()
  }

  render() {
    return (
      <div id='navbar'>
        <h1><Link to='/'>capsule curate</Link></h1>
        <div className='links'>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/explore'>Explore</NavLink>
          {this.props.user
            ? (<React.Fragment>
              <NavLink to='/main' onFocus={this.handleOnClick}>Capsules</NavLink>
              <NavLink to='/account'>{this.props.user.username}</NavLink>
            </React.Fragment>)
            : (<React.Fragment>
              <NavLink to='/login'>Log In</NavLink>
              <NavLink to='/signup'>Sign Up</NavLink>
            </React.Fragment>)
          }
        </div>

        {this.state.showMenu
          ? (<div className='user-menu'>
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