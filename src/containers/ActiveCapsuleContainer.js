import React from 'react';
import { Redirect } from 'react-router-dom';
import Weather from '../components/Weather';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';
import Outfit from '../components/Outfit';
import { WEATHER } from '../constants/api-url';
import { updateItem, fetchCapsules } from '../actions';

const mapStateToProps = state => {
  return {
    active_capsule: state.active_capsule,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateItem: payload => dispatch(updateItem(payload)),
    fetchCapsules: () => dispatch(fetchCapsules())
  }
}

class ActiveCapsuleContainer extends React.Component {

  location = localStorage.getItem('location')

  state = {
    fetchComplete: false
  }

  getSwatches() {
    let swatchStyle
    let colors = []
    if (this.props.active_capsule && this.props.active_capsule.colors) {
      colors = this.props.active_capsule.colors.split(";")
      swatchStyle = [{
        backgroundColor: `${colors[0]}`
      }, {
        backgroundColor: `${colors[1]}`
      }, {
        backgroundColor: `${colors[2]}`
      }, {
        backgroundColor: `${colors[3]}`
      }]
    } else {
      swatchStyle = {
        display: 'none'
      }
    }
    return swatchStyle
  }

  componentDidMount() {
    this.props.fetchCapsules()

    // const LOCATION_ENDPOINT = `/location/${location}`;
    // const WEATHER_ENDPOINT = `/weather?loc=${latitude}_${longitude}`;

    fetch(WEATHER + `/location/${this.location}`)
      .then(res => res.json())
      .then(json => {
        let lat_lng = json.results[0].geometry.location;
        fetch(WEATHER + `/weather?loc=${lat_lng.lat}_${lat_lng.lng}`)
          .then(res => res.json())
          .then(json => {
            let current = json.currently
            let summary = json.hourly.summary
            let morning = json.hourly.data[8]
            let noon = json.hourly.data[12]
            let evening = json.hourly.data[17]
            let night = json.hourly.data[21]
            let day = json.daily.data[0]
            this.setState({
              current: current,
              summary: summary,
              day: day,
              morning: morning,
              noon: noon,
              evening: evening,
              night: night,
              fetchComplete: true
            })
          })
      })
  }

  render() {
    // debugger
    if (!this.props.user) {
      // if there is no user signed in, redirect to root
      return <Redirect to='/' />
    } else {
      // if there is a user signed in, fetch capsules happening in component did mount
      let swatchStyle = this.getSwatches()
      return (
        <div className='container' id='active-container' >
          <div id='active-left' className='flex'>
            <h1>Welcome back, {this.props.user.username} </h1>
            <Weather data={this.state} />
            {this.state.fetchComplete ?
              <Outfit weather_data={this.state} /> : null}
          </div>

          <div className='flex' id='active-right'>
            <h1>{this.props.active_capsule && this.props.active_capsule.title}</h1>

            <div id='swatch-div'>
              <div className='swatch' style={swatchStyle[0]}></div>
              <div className='swatch' style={swatchStyle[1]}></div>
              <div className='swatch' style={swatchStyle[2]}></div>
              <div className='swatch' style={swatchStyle[3]}></div>
            </div>

            {this.props.active_capsule ? <ItemsContainer updateItem={this.props.updateItem} capsule_id={this.props.active_capsule.id} items={this.props.active_capsule.items} /> : null}
          </div>

        </div>
      )
    }
  }

  shouldComponentUpdate() {
    return true
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCapsuleContainer);