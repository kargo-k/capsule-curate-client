import React from 'react';
import { SEASONS } from '../constants';
import jscolor from '../js/jscolor.js';

class NewCapsule extends React.Component {

  state = {
    title: "",
    description: "",
    season: null,
    isActive: false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(e.target.color2.style["background-color"])
  }
  add = (e) => {
    // let newColor = document.createElement('input')
    // FIXME: this does not dynamically create a new color picker
    // let picker = new jscolor(newColor)
    // picker.fromHSV(360 / 100, 100, 100)
    //http://jscolor.com/examples/
    // document.getElementById('color-boxes').appendChild(newColor)
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
            value={this.state.description}
            onChange={this.handleChange} />
        </label>

        <label>Season:
          <select value={this.state.value} onChange={this.handleChange}>
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

        <label className='single top'><input
          name="submit"
          className='btn'
          type="submit"
          value="Start Curating"
          disabled={!(this.state.title)}
        /></label>

      </form>
    )
  }
}

export default NewCapsule;