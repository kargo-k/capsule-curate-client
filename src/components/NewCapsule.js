import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SEASONS } from '../constants';
import { createCapsule, showCapsule } from '../actions';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';

const mapDispatchToProps = dispatch => {
  return {
    createCapsule: payload => dispatch(createCapsule(payload)),
    showCapsule: payload => dispatch(showCapsule(payload))
  }
}

const mapStateToProps = state => {
  return { user: state.user }
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
      b: '170'
    },
    color2: {
      r: '115',
      g: '83',
      b: '114'
    },
    color3: {
      r: '161',
      g: '130',
      b: '118'
    },
    color4: {
      r: '122',
      g: '145',
      b: '141'
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
    let colors = `${this.rgb_to_s(this.state.color1)};${this.rgb_to_s(this.state.color2)};${this.rgb_to_s(this.state.color3)};${this.rgb_to_s(this.state.color4)}`

    let payload = {
      title: this.state.title,
      description: e.target.description.value,
      season: this.state.season,
      colors: colors,
      active: e.target.isActive.value
    }
    this.props.createCapsule(payload)
    this.props.history.push('/capsule')
  }

  rgb_to_s = rgb => {
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`
  }

  render() {

    const styles = reactCSS({
      'default': {
        color1: {
          width: '36px',
          height: '36px',
          borderRadius: '2px',
          background: `rgb(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b}`,
        },
        color2: {
          width: '36px',
          height: '36px',
          borderRadius: '2px',
          background: `rgb(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b})`,
        },
        color3: {
          width: '36px',
          height: '36px',
          borderRadius: '2px',
          background: `rgb(${this.state.color3.r}, ${this.state.color3.g}, ${this.state.color3.b})`,
        },
        color4: {
          width: '36px',
          height: '36px',
          borderRadius: '2px',
          background: `rgb(${this.state.color4.r}, ${this.state.color4.g}, ${this.state.color4.b})`,
        },
        swatch: {
          padding: '5px',
          borderRadius: '1px',
          cursor: 'crosshair',
        },
        popover: {
          position: 'relative',
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

    if (!this.props.user.username) {
      return <Redirect to='/' />
    } else {
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
          <select name='season' onChange={this.handleChange} value={this.state.season}>
              {SEASONS.map(s =>
                <option value={s} key={s}>{s}</option>
              )}
            </select>
          </label>

          <label>Color Palette:

        <div style={styles.swatch} onClick={this.handleClick} >
              <div id='picker1' style={styles.color1} />
            </div>
            {this.state.picker1 ? <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <ChromePicker id='color1' disableAlpha={true} color={this.state.color1} onChangeComplete={this.handleColor1Change} />
            </div> : null}

            <div style={styles.swatch} onClick={this.handleClick} >
              <div id='picker2' style={styles.color2} />
            </div>
            {this.state.picker2 ? <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <ChromePicker id='color2' disableAlpha={true} color={this.state.color2} onChangeComplete={this.handleColor2Change} />
            </div> : null}

            <div style={styles.swatch} onClick={this.handleClick} >
              <div id='picker3' style={styles.color3} />
            </div>
            {this.state.picker3 ? <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <ChromePicker id='color3' disableAlpha={true} color={this.state.color3} onChangeComplete={this.handleColor3Change} />
            </div> : null}

            <div style={styles.swatch} onClick={this.handleClick} >
              <div id='picker4' style={styles.color4} />
            </div>
            {this.state.picker4 ? <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <ChromePicker id='color4' disableAlpha={true} color={this.state.color4} onChangeComplete={this.handleColor4Change} />
            </div> : null}

          </label>

          <label className='radio-buttons'>
            Set this to your current active capsule?

          <span className='radio text'>

              <div><input name='isActive' type='radio' value={true} className='radio' /> Yes, starting today!</div>

              <div><input name='isActive' type='radio' value={false} className='radio text' defaultChecked /> Nope, just planning ahead!</div>

            </span>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCapsule);