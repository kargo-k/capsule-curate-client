import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SEASONS } from '../constants';
import { createCapsule } from '../actions';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

const mapDispatchToProps = dispatch => {
  return { createCapsule: payload => dispatch(createCapsule(payload)) }
}

const mapStateToProps = state => {
  return { logged_in: state.logged_in }
}

class NewCapsule extends React.Component {

  state = {
    title: "",
    season: "",
    picker1: false,
    picker2: false,
    picker3: false,
    picker4: false,
    color1: {
      r: '170',
      g: '192',
      b: '170',
      a: '1'
    },
    color2: {
      r: '115',
      g: '83',
      b: '114',
      a: '1'
    },
    color3: {
      r: '161',
      g: '130',
      b: '118',
      a: '1'
    },
    color4: {
      r: '122',
      g: '145',
      b: '141',
      a: '1'
    },
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClick = e => {
    this.setState({ [e.target.id]: !this.state[e.target.id] })
  }

  handleClose = e => {
    this.setState({
      picker1: false,
      picker2: false,
      picker3: false,
      picker4: false
    })
  }

  handleColor1Change = color => {
    this.setState({ color1: color.rgb })
  }

  handleColor2Change = color => {
    this.setState({ color2: color.rgb })
  }

  handleColor3Change = color => {
    this.setState({ color3: color.rgb })
  }

  handleColor4Change = color => {
    this.setState({ color4: color.rgb })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('submit form clicked')
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

    const styles = reactCSS({
      'default': {
        color1: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b}, ${this.state.color1.a})`,
        },
        color2: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b}, ${this.state.color2.a})`,
        },
        color3: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color3.r}, ${this.state.color3.g}, ${this.state.color3.b}, ${this.state.color3.a})`,
        },
        color4: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color4.r}, ${this.state.color4.g}, ${this.state.color4.b}, ${this.state.color4.a})`,
        },
        swatch: {
          padding: '5px',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'fixed',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    // if (!this.props.logged_in) {
    //   return <Redirect to='/' />
    // } else {
    return (
      <form id='new-capsule' onSubmit={this.handleSubmit}>
        <h1>Curate a New Capsule</h1>

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

        <div style={styles.swatch} onClick={this.handleClick} >
            <div id='picker1' style={styles.color1} />
          </div>
          {this.state.picker1 ? <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker id='color1' color={this.state.color1} onChangeComplete={this.handleColor1Change} />
          </div> : null}

          <div style={styles.swatch} onClick={this.handleClick} >
            <div id='picker2' style={styles.color2} />
          </div>
          {this.state.picker2 ? <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker id='color2' color={this.state.color2} onChangeComplete={this.handleColor2Change} />
          </div> : null}

          <div style={styles.swatch} onClick={this.handleClick} >
            <div id='picker3' style={styles.color3} />
          </div>
          {this.state.picker3 ? <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker id='color3' color={this.state.color3} onChangeComplete={this.handleColor3Change} />
          </div> : null}

          <div style={styles.swatch} onClick={this.handleClick} >
            <div id='picker4' style={styles.color4} />
          </div>
          {this.state.picker4 ? <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker id='color4' color={this.state.color4} onChangeComplete={this.handleColor4Change} />
          </div> : null}

        </label>

        <label className='radio-buttons'>
          Set this to your current active capsule?

          <span className='radio text'><input name='isActive' type='radio' value={true} className='radio' /> Yes, starting today!
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
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCapsule);