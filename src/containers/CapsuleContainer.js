import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toggleCapsule, updateItem } from '../actions';
import ItemsContainer from './ItemsContainer';
import Header from '../components/Header'
import UploadItemForm from '../components/UploadItemForm';

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

  constructor(props) {
    super(props);
    this.state = {
      show_add_form: false
    }

  }

  handleShow = () => {
    this.setState({ show_add_form: !this.state.show_add_form })
    console.log('toggle the show_Add_form');
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
      let capsule = this.props.show_capsule
      if (capsule) {
        return (
          <div id='capsule-show' className='container'>

            <Header handleShow={this.handleShow} />
            <div id='capsule-body'>
              <ItemsContainer capsule_id={capsule.id} updateItem={this.props.updateItem} />

              {this.state.show_add_form ? <UploadItemForm /> : null}

            </div>
          </div >
        )
      } else {
        return <Redirect to='/' />
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapsuleContainer)