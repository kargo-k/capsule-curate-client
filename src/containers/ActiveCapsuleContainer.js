import React from 'react';
import Weather from '../components/Weather';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';
import Outfit from '../components/Outfit';
import { WEATHER } from '../constants/api-url';

const mapStateToProps = state => {
  return { active_capsule: state.active_capsule }
}

class ActiveCapsuleContainer extends React.Component {

  location = localStorage.getItem('location')

  state = {
    fetchComplete: false
  }

  // const LOCATION_ENDPOINT = `/location/${location}`;
  // const WEATHER_ENDPOINT = `/weather?loc=${latitude}_${longitude}`;

  componentDidMount() {
    fetch(WEATHER + `/location/${this.location}`)
      .then(res => res.json())
      .then(json => {
        let lat_lng = json.results[0].geometry.location;
        fetch(WEATHER + `/weather?loc=${lat_lng.lat}_${lat_lng.lng}`)
          .then(res => res.json())
          .then(json => {
            console.log(json)
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
    if (this.state.fetchComplete) {
      return (
        <div className='container' id='active-container' >
          <div id='active-left' className='flex'>
            <h1>Today's forecast for {this.location}: </h1>
            <Weather data={this.state} />
            <Outfit
              hi={this.state.day.apparentTemperatureHigh}
              lo={this.state.day.apparentTemperatureLow}
              precip={this.state.current.precipProbability} />
          </div>
          <div id='active-right' className='flex'>
            <h1>{this.props.active_capsule.title}</h1>
            <ItemsContainer />
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps)(ActiveCapsuleContainer);