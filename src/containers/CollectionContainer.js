import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions';
import Item from '../components/Item';

const mapStateToProps = state => {
  return { collection: state.collection }
}

const mapDispatchToProps = dispatch => {
  return { fetchCollection: () => dispatch(fetchCollection()) }
}

class CollectionContainer extends React.Component {

  state = {
    all: "",
    search: "",
    price: "",
    color: "",
    type: ""
  }

  componentDidMount() {
    this.props.fetchCollection()
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  filterCollection = e => {
    e.preventDefault()
    this.setState(prevState => {
      let all = prevState.all
      let str = prevState.search
      let results = this.props.collection.filter(item => item.name.toLowerCase().includes(str))
      return { all: results }
    })
  }

  render() {
    return (
      <div className='container'>
        <h1>Collection Container</h1>

        <div>
          <form id='filter' onSubmit={this.filterCollection}>
            <input
              name='search'
              value={this.state.search}
              type='text'
              onChange={this.handleChange}
              placeholder='Filter by name'
            />
            <input className='btn' type='submit' value='Search' />
          </form>
        </div>

        <div className='grid'>
          {this.state.all &&
            this.state.all.slice(0, 28).map(item =>
              <Item key={item.id} item={item} />
            )}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)