import React from 'react';


const Weather = ({ data }) => {

  if (data.fetchComplete) {
    return (
      <div id='weather'>
        <p>It is currently {data.current.summary.toLowerCase()} and is {data.current.temperature}F.

          Today, expect it to be {data.summary.toLowerCase()} Today's high is {data.day.apparentTemperatureHigh}F and low of {data.day.apparentTemperatureLow}F with a {data.current.precipProbability}% probability of rain.</p>

        <table>
          <tbody>
            <tr><th>8 am</th>
              <th>12 pm</th>
              <th>5 pm</th>
              <th>9 pm</th></tr>
            <tr>
              <td>{data.morning.temperature}F</td>
              <td>{data.noon.temperature}F</td>
              <td>{data.evening.temperature}F</td>
              <td>{data.night.temperature}F</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return null
  }

}

export default Weather;