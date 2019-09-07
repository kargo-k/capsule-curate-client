import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Item from './Item';

const mapStateToProps = state => {
  return { items: state.active_capsule.items }
}

class Outfit extends React.Component {

  componentDidMount() {
    if (!this.props.items) {
      this.render(false)
    } else {
      this.render(true)
    }
  }

  render(bool) {
    if (this.props.items) {
      debugger
      return (
        <div id='ootd-container'>
          <h1>Add items to get an #OOTD</h1>
          <div id='ootd-div'>
            <Link className='btn' to='/discover'>Add Items</Link>
          </div>
        </div >
      )
    } else {
      let ootd = this.pickOutfit()
      debugger
      if (ootd) {
        ootd = ootd.filter(el => el != null)
        return (
          <div id='ootd-container'>
            <h1>#OOTD</h1>
            <div id='ootd-div'>
              {ootd.map(item => <Item key={item.id} item={item} />)}
            </div>
          </div>
        )
      } else {
        return (
          <div id='ootd-container'>
            <h1>no outfits to show</h1>
          </div>
        )
      }

    }
  }

  pickOutfit() {
    let ootd, ootd_date
    ootd = JSON.parse(localStorage.getItem('ootd'))

    if (ootd) {
      // if the ootd is stored in local storage, get the date it was stored
      ootd_date = ootd.pop()
    }

    if (this.props.items && ootd || ootd_date < new Date()) {
      // if the ootd is stored in local storage and the date is less than today picks a new outfit based on weather forecast each day
      let one_piece_outfits = this.props.items.filter(i => i.category2 === 'one piece')
      let bottoms = this.props.items.filter(i => i.category2 === 'bottoms')
      let tops = this.props.items.filter(i => i.category2 === 'top')
      let n_two_piece_outfits = bottoms.length * tops.length
      let sweaters = this.props.items.filter(i => i.category === 'sweater')
      let outerwear = this.props.items.filter(i => i.category2 === 'outerwear')
      let total_outfits = one_piece_outfits.length + n_two_piece_outfits
      ootd = []

      // choose an outfit randomly based on the number of outfits
      let rand = Math.random()
      if (one_piece_outfits !== [] && rand <= one_piece_outfits.length / total_outfits) {
        // choose a one piece outfit
        ootd.push(one_piece_outfits[Math.floor(Math.random() * one_piece_outfits.length)])
      } else {
        // choose a two piece outfit

        if (this.props.hi < 60) {
          // if the weather is cold (below 60F), do not recommend shorts or skirt and add a sweater/outerwear
          let cold_layers = sweaters + outerwear

          cold_layers !== [] && ootd.push(cold_layers[Math.floor(Math.random() * cold_layers.length)])

          bottoms = bottoms.filter(i => i.category !== 'shorts')
        }

        tops !== [] && ootd.push(tops[Math.floor(Math.random() * tops.length)])
        bottoms !== [] && ootd.push(bottoms[Math.floor(Math.random() * bottoms.length)])
      }

      // if the probability of rain is greater than 60%, suggest a rain item if the user has one
      if (this.props.precip > .6) {
        let rain_gear = this.props.items.filter(i => i.name.includes('rain'))
        if (rain_gear !== []) {
          ootd.push(rain_gear[Math.floor(Math.random() * rain_gear.length)])
        }
      }

      // store the ootd in local storage for 24 hours
      let today = new Date()
      today.setHours(today.getHours() + 24)
      ootd.push(today);
      try {
        localStorage.setItem('ootd', JSON.stringify(ootd))
      }
      catch (e) { console.log(e) }

      return ootd
    } else {
      // returns the stored ootd from local storage if the date is current
      return ootd
    }
  }

}

export default connect(mapStateToProps)(Outfit);