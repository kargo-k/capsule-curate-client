import React from 'react';


const Weather = ({ data }) => {
  let location = localStorage.getItem('location')
  if (data.fetchComplete) {
    return (
      <div id='weather'>

        <h1>Today's forecast for {location}</h1>

        <p>Currently, it is {data.current.temperature}&deg;F and {data.current.summary.toLowerCase()}.  Expect it to be {data.summary.toLowerCase()}</p>

        <table id='hilo'>
          <tbody>
            <tr>
              <td>High: {data.day.apparentTemperatureHigh}&deg;F</td>
            </tr>
            <tr>
              <td>Low: {data.day.apparentTemperatureLow}&deg;F</td>
            </tr>
            <tr>
              <td>{data.current.precipProbability}% chance of rain</td>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr><th>8 am</th>
              <th>12 pm</th>
              <th>5 pm</th>
              <th>9 pm</th></tr>
            <tr>
              <td>{data.morning.temperature}&deg;F</td>
              <td>{data.noon.temperature}&deg;F</td>
              <td>{data.evening.temperature}&deg;F</td>
              <td>{data.night.temperature}&deg;F</td>
            </tr>
          </tbody>
        </table>
      </div >
    )
  } else {
    return null
  }

}

export default Weather;