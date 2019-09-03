import React from 'react';
import { SEASONS } from '../constants';
import jscolor from '../js/jscolor.js';

class NewCapsule extends React.Component {

  state = {
    title: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    let colors = e.target.color1.style["background-color"] + ", " + e.target.color2.style["background-color"] + ", " + e.target.color3.style["background-color"] + ", " + e.target.color4.style["background-color"]
    console.log(colors)
    console.log(e.target.isActive.value)

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
          <select>
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

export default NewCapsule;