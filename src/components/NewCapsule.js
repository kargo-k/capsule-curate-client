import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SEASONS } from '../constants';
import { createCapsule } from '../actions';
import jscolor from '../js/jscolor.js';

const mapDispatchToProps = dispatch => {
  return { createCapsule: payload => dispatch(createCapsule(payload)) }
}

// const mapStateToProps = state => {
//   return { logged_in: state.logged_in }
// }

class NewCapsule extends React.Component {

  state = {
    title: "",
    season: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    let colors = e.target.color1.style["background-color"] + ", " + e.target.color2.style["background-color"] + ", " + e.target.color3.style["background-color"] + ", " + e.target.color4.style["background-color"]
    let payload = {
      title: this.state.title,
      description: e.target.description.value,
      season: this.state.season,
      colors: colors,
      active: e.target.isActive.value
    }
    this.props.createCapsule(payload)
  }

  render() {
    return (
      <form id='new-capsule' onSubmit={this.handleSubmit}>
        <h1>new capsule form here</h1>

        <label>Title:
        <input
            type='text'
            name='title'
            placeholder='Capsule Title'
            value={this.state.title}
            onChange={this.handleChange} />
        </label>

        <label>Description:
          <input
            type='text'
            name='description'
            placeholder='#capsulegoals'
          />
        </label>

        <label>Season:
          <select onChange={this.handleChange} value={this.state.season}>
            {SEASONS.map(s =>
              <option value={s} name='season' key={s}>{s}</option>
            )}
          </select>
        </label>

        <label>Color Palette:

          <input type="hidden" id="color_value" value="AAC0AA" />
          <button name='color1' className="jscolor {valueElement: 'color_value'} color-picker"></button>

          <input type="hidden" id="color_value2" value="735372" />
          <button name='color2' className="jscolor {valueElement: 'color_value2'} color-picker"></button>

          <input type="hidden" id="color_value3" value="A18276" />
          <button name='color3' className="jscolor {valueElement: 'color_value3'} color-picker"></button>

          <input type="hidden" id="color_value4" value="7A918D" />
          <button name='color4' className="jscolor {valueElement: 'color_value4'} color-picker"></button>

        </label>

        <label className='radio-buttons'>
          Set this to your current active capsule?

          <span className='radio text'><input name='isActive' type='radio' value={true} className='radio' /> Yes, going to wear this today!
          <br />
            <input name='isActive' type='radio' value={false} className='radio text' /> Nope, just planning ahead!</span>
        </label>

        <label className='single top'><input
          name="submit"
          className='btn'
          type="submit"
          value="Start Curating"
          disabled={!(this.state.title)}
        /></label>

      </form >
    )

  }
}

export default connect(null, mapDispatchToProps)(NewCapsule);