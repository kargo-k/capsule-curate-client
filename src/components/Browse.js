import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { collection: state.collection }
}

const Browse = props => {
  return (
    <div id='browse'>
      <h1>Browse the Curated Collection</h1>
      <form id='filter'>
        <input
          name='search'
          type='text'
          placeholder='Search by Keyword'
        // onChange={this.handleChange}
        />

        <select
          name='category'
        // value={this.state.category} 
        // onChange={this.handleChange}
        >
          <option value="all">All</option>
          <option value="bottoms">Bottoms</option>
          <option value="denim">Denim</option>
          <option value="one piece">One Pieces</option>
          <option value="outerwear">Outwear</option>
          <option value="pants">Pants</option>
          <option value="shorts">Shorts</option>
          <option value="sweater">Sweaters</option>
          <option value="tee">Tees</option>
          <option value="top">Tops</option>
        </select>

      </form>
    </div>
  )
}

export default connect(mapStateToProps)(Browse)

// class Browse extends React.Component {

//   state = {
//     all: [],
//     search: "",
//     price: "",
//     color: "",
//     category: "all",
//     collection_page: 0,
//     results_page: 0,
//     showCollection: true
//   }

//   componentDidMount() {
//     this.props.fetchCollection()
//   }

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value })
//   }

//   handleNext = e => {
//     let prevPage = this.state[e.target.name]
//     this.setState({ [e.target.name]: prevPage + 1 })
//   }

//   filterCollection = e => {
//     e.preventDefault()
//     this.setState(prevState => {
//       let str = prevState.search
//       let cat = prevState.category
//       let results = this.props.collection.filter(item => {
//         if (str === "" && cat === 'all') {
//           return this.props.collection
//         } else if (str === "") {
//           return (item.category === cat || item.category2 === cat)
//         } else if (cat === 'all') {
//           return item.name.toLowerCase().includes(str)
//         } else {
//           return (item.name.toLowerCase().includes(str) && (item.category === cat || item.category2 === cat))
//         }
//       })
//       return { all: results, showCollection: false }
//     })
//   }

//   render() {

//     // pagination increments
//     let n_items = 16;

//     let initialState = {
//       search: "",
//       price: "",
//       color: "",
//       category: "all",
//       collection_page: 0,
//       results_page: 0,
//       showCollection: true
//     }

//     const reset = () => {
//       this.setState({ ...initialState })
//     }

//     return (
//       <div id='browse'>
//         <h1>Browse the Collection</h1>

//         <div>
//           <form id='filter' onSubmit={this.filterCollection}>
//             <input
//               name='search'
//               value={this.state.search}
//               type='text'
//               onChange={this.handleChange}
//               placeholder='Search by Keyword'
//             />



//             <input className='btn' type='submit' value='Search' />
//             <button className='btn' id='reset' onClick={reset}>Reset</button>
//           </form>
//         </div>
//         </div>
//         )
//       }
//     }

// export default connect(mapStateToProps, mapDispatchToProps)(Browse)