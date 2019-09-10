import React from 'react';
import Browse from '../components/Browse';
import ItemsContainer from './ItemsContainer';
import { API } from '../constants/api-url'


class CollectionContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      category: "",
      page: 0,
      items: null,
      n_item: 40
    }
  }

  componentDidMount() {
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
          all_items: items,
          n_results: items.length,
          details: false
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
          items: new_items,
          n_results: new_items.length,
          page: 0
        }
      } else {
        // if a category is selected, search through the already categorically filtered items
        let new_items = prevState.category_items.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
        return {
          keyword: e.target.value,
          items: new_items,
          n_results: new_items.length,
          page: 0
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
          category: e.target.value,
          n_results: prevState.all_items.length,
          page: 0,
          keyword: ""
        }
      } else {
        // if a category is selected, change the items shown to match that category and set a new value in state called category_items, which the keyword search filter will filter through
        let new_items = prevState.all_items.filter(i => i.category === e.target.value || i.category2 === e.target.value)
        return {
          items: new_items,
          category_items: new_items,
          category: e.target.value,
          n_results: new_items.length,
          page: 0,
          keyword: ""
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

  nItemSelect = e => {
    this.setState({ n_item: e.target.value })
  }

  handleBack = e => {
    e.preventDefault()
    console.log('go back to prev results');
    this.setState(prevState => {
      return { page: prevState.page - 1 }
    })
  }

  handleNext = e => {
    e.preventDefault()
    console.log('go to next page');
    this.setState(prevState => {
      return { page: prevState.page + 1 }
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
          n_item={this.state.n_item}
          nItemSelect={this.nItemSelect}
          page={this.state.page}
          n_results={this.state.n_results}
          back={this.handleBack}
          next={this.handleNext}
        />

        <ItemsContainer
          items={this.state.items
            ? this.state.items.slice(this.state.page * this.state.n_item, (this.state.page * this.state.n_item) + this.state.n_item)
            : null} />

      </div>
    )
  }
}

export default CollectionContainer;