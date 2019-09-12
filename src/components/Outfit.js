import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

const mapStateToProps = state => {
  return {
    active_capsule: state.active_capsule
  }
}

class Outfit extends React.Component {

  constructor(props) {
    super(props);

    this.state = { outfit: [] }
  }

  componentDidMount() {
    this.setState({ items: this.props.active_capsule.items })
    this.pickOutfit()
  }

  render() {
    return (
      <div id='ootd-container'>
        <h1>#OOTD</h1>
        <div id='ootd-div'>
          {this.state.outfit !== [] ? this.state.outfit.map(item => <Item key={`ootd${item.id}`} item={item} />) : <p>Add Items to Get an OOTD</p>}
        </div>
      </div>
    )
  }

  pickOutfit() {
    let items = this.props.active_capsule.items
    let ootd, ootd_date
    ootd = JSON.parse(localStorage.getItem('ootd'))

    if (ootd) {
      // if the ootd is stored in local storage, get the date it was stored and then check to see if the date is less than today's date
      ootd_date = ootd.pop()
      ootd = ootd.filter(i => i !== null)
      ootd = ootd.filter(i => i !== undefined)

      if (ootd_date < new Date()) {
        // generate a new ootd if the stored ootd is more than a day old
        this.newOOTD(items)
      } else {
        // if the ootd's date is the same as today's date, return the current ootd
        this.setState({ outfit: ootd })
      }

    } else {
      // if the ootd is not stored in local storage, generate a new ootd using items
      this.newOOTD(items)
    }
  }

  newOOTD = (items) => {

    let one_piece_outfits = items.filter(i => i.category2 === 'one piece')
    let bottoms = items.filter(i => i.category2 === 'bottoms')
    let tops = items.filter(i => i.category2 === 'top')
    let n_two_piece_outfits = bottoms.length * tops.length
    let sweaters = items.filter(i => i.category === 'sweater')
    let outerwear = items.filter(i => i.category2 === 'outerwear')
    let total_outfits = one_piece_outfits.length + n_two_piece_outfits
    let ootd = []

    // choose an outfit randomly based on the number of outfits
    let rand = Math.random()
    if (one_piece_outfits !== [] && rand <= one_piece_outfits.length / total_outfits) {
      // choose a one piece outfit
      ootd.push(one_piece_outfits[Math.floor(Math.random() * one_piece_outfits.length)])
    } else {
      // choose a two piece outfit

      if (this.props.weather_data.day.apparentTemperatureHigh < 60) {
        // if the weather is cold (below 60F), do not recommend shorts or skirt and add a sweater/outerwear
        let cold_layers = sweaters + outerwear

        cold_layers !== [] && ootd.push(cold_layers[Math.floor(Math.random() * cold_layers.length)])

        bottoms = bottoms.filter(i => i.category !== 'shorts')
      } else if (this.props.weather_data.day.apparentTemperatureLow > 70) {
        bottoms = bottoms.filter(i => i.category === 'shorts')
      }

      tops !== [] && ootd.push(tops[Math.floor(Math.random() * tops.length)])
      bottoms !== [] && ootd.push(bottoms[Math.floor(Math.random() * bottoms.length)])
    }

    // if the probability of rain is greater than 60%, suggest a rain item if the user has one
    if (this.props.weather_data.day.precipProbability > .6) {
      let rain_gear = items.filter(i => i.name.includes('rain'))
      if (rain_gear !== []) {
        ootd.push(rain_gear[Math.floor(Math.random() * rain_gear.length)])
      }
    }

    // remove any null values in case there are missing categories of items
    ootd = ootd.filter(i => i !== null)
    ootd = ootd.filter(i => i !== undefined)
    this.setState({ outfit: ootd })

    // store the ootd in local storage for 24 hours
    let today = new Date()
    today.setHours(today.getHours() + 24)
    ootd.push(today);
    try {
      localStorage.setItem('ootd', JSON.stringify(ootd))
    }
    catch (e) { console.log(e) }

  }

}

export default connect(mapStateToProps)(Outfit);