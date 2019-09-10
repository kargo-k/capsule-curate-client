import React from 'react';

const Browse = props => {
  return (
    <div id='browse'>
      <h1>Browse the Curated Collection</h1>
      <form id='filter'>
        <input
          name='search'
          type='text'
          placeholder='Search by Keyword'
          value={props.search}
          onChange={props.onChange}
        />

        <select
          name='category'
          value={props.sel}
          onChange={props.onSelect}
        >
          <option value="">Search by Category</option>
          <option value="bottoms">Bottoms</option>
          <option value="denim">Denim</option>
          <option value="one piece">One Pieces</option>
          <option value="outerwear">Outwear</option>
          <option value="pants">Pants</option>
          <option value="shorts">Skirts/Shorts</option>
          <option value="sweater">Sweaters</option>
          <option value="tee">Tees</option>
          <option value="top">Tops</option>
        </select>

        <button className='btn' id='reset' onClick={props.onReset}>Reset</button>


        <label id='n_item'>Results:
        <select
            id='n_item'
            name='n_item'
            value={props.n_item}
            onChange={props.nItemSelect}
          >
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
          </select>
        </label>

        <button
          className='btn page'
          id='back'
          disabled={props.page === 0}
          onClick={props.back}
        >{`<<`}</button>

        <button
          className='btn page'
          id='next'
          disabled={props.page === Math.floor(props.n_results / props.n_item)}
          onClick={props.next}
        >{`>>`}</button>

      </form>
    </div>
  )
}

export default Browse;