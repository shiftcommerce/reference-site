// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { readCategory } from '../actions/categoryActions'

// Components
import ProductListingCard from '../components/products/plp/ProductListingCard'

class Category extends Component {
  static async getInitialProps ({ store, isServer, pathname, query }) {
    await store.dispatch(readCategory(query.id))
  }

  render () {
    const category = this.props.category.data
    const { loading, error } = this.props.category.data

    if (loading) {
      return (
        <h1>Loading</h1>
      )
    } else if (error) {
      return (
        <p>{error}</p>
      )
    } else {
      return (
        <div className='c-product-listing'>
          {category.map((product, index) => {
            return <ProductListingCard product={product} key={index} />
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category.data || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
