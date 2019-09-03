import React from 'react';
import { SEASONS } from '../constants';
import jscolor from '../js/jscolor.js';

class NewCapsule extends React.Component {

  state = {
    title: "",
    description: "",
    season: null,
    colors: null,
    isActive: false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <form id='new-capsule'>
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
              <option value={s} name='season'>{s}</option>
            )}
          </select>
        </label>

        <label>Color Palette:

        </label>

      </form>
    )
  }
}

export default NewCapsule;