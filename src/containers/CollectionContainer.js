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
      items: null,
      n_items: 40
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
    e.persist()
    this.setState(prevState => {
      if (prevState.category === "") {
        // if there is no category selected, search through all_items
        let new_items = prevState.all_items.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
        return {
          keyword: e.target.value,
          items: new_items
        }
      } else {
        // if a category is selected, search through the already categorically filtered items
        let new_items = prevState.category_items.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
        return {
          keyword: e.target.value,
          items: new_items
        }
      }
    })
  }

  handleSelect = e => {
    e.persist()

    this.setState(prevState => {
      if (e.target.value === "") {
        // resets the items shown to be all items if no category is selected
        return {
          items: prevState.all_items,
          category_items: prevState.all_items,
          category: e.target.value
        }
      } else {
        // if a category is selected, change the items shown to match that category and set a new value in state called category_items, which the keyword search filter will filter through
        let new_items = prevState.all_items.filter(i => i.category === e.target.value || i.category2 === e.target.value)
        return {
          items: new_items,
          category_items: new_items,
          category: e.target.value
        }
      }
    })
  }

  handleReset = e => {
    e.preventDefault()
    console.log('reset the search');
    this.setState(prevState => {
      return {
        keyword: "",
        category: "",
        page: 0,
        items: prevState.all_items
      }
    })
  }

  render() {
    return (
      <div className='container flex' id='collection'>
        <Browse
          search={this.state.keyword}
          onChange={this.handleChange}
          sel={this.state.category}
          onSelect={this.handleSelect}
          onReset={this.handleReset}
        />

        <ItemsContainer items={this.state.items ? this.state.items.slice(0, this.state.n_items) : null} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);