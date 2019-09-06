import React from 'react';
import { WEATHER } from '../constants/api-url';

class Weather extends React.Component {

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

  toDateTime = secs => {
    let t = new Date(1970, 0, 1) // Epoch
    t.setSeconds(secs)
    let result = t.getMonth() + '/' + t.getDate() + '--' + t.getHours();
    return result
  }

  render() {
    if (this.state.fetchComplete) {
      return (
        <div id='weather'>
          <h1>Today's forecast for {this.location}: </h1>
          It is currently {this.state.current.summary.toLowerCase()} and is {this.state.current.temperature}F.

          Today, expect it to be {this.state.summary.toLowerCase()} Today's high is {this.state.day.apparentTemperatureHigh}F and low of {this.state.day.apparentTemperatureLow}F with a {this.state.current.precipProbability}% probability of rain.

          <table>
            <tbody>
              <tr><th>8 am</th>
                <th>12 pm</th>
                <th>5 pm</th>
                <th>9 pm</th></tr>
              <tr>
                <td>{this.state.morning.temperature}F</td>
                <td>{this.state.noon.temperature}F</td>
                <td>{this.state.evening.temperature}F</td>
                <td>{this.state.night.temperature}F</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else {
      return null
    }

  }
}

export default Weather;