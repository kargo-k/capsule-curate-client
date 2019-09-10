import React from 'react';
import Browse from '../components/Browse';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';
import { API } from '../constants/api-url'

const mapStateToProps = state => {
  return { collection: state.collection }
}

const mapDispatchToProps = dispatch => {
  return {}
}

class CollectionContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      category: "",
      page: 0,
      items: null
    }
  }

  componentDidMount() {
    console.log('component did mount');
    return fetch(API + '/items', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(items => {
        // saves the collection of items in state
        this.setState({
          items: items,
          all_items: items
        })
      })
  }

  handleChange = e => {
    console.log('searching bye keyword...');
    e.persist()
    this.setState(prevState => {
      let prev_items = prevState.items
      let new_items = prev_items.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
      return {
        keyword: e.target.value,
        items: new_items
      }
    })
  }

  handleSelect = e => {
    console.log('selection made', e.target.value);
    e.persist()

    this.setState(prevState => {
      let prev_items = prevState.items
      let new_items = prev_items.filter(i => i.category === e.target.value || i.category2 === e.target.value)
      return {
        category: e.target.value,
        items: new_items
      }
    })
  }

  handleReset = e => {
    e.preventDefault()
    console.log('reset the search');
    this.setState(prevState => {
      return {
        keyword: "",
        category: 'all',
        page: 0,
        items: prevState.all_items
      }
    })
  }

  render() {
    return (
      <div className='container flex' id='collection'>
        <Browse search={this.state.keyword} onChange={this.handleChange} sel={this.state.category} onSelect={this.handleSelect} onReset={this.handleReset} />

        <ItemsContainer items={this.state.items ? this.state.items.slice(0, 40) : null} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);