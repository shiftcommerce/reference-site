// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { readCategory } from '../actions/categoryActions'

// Components
import Loading from '../components/Loading'
import ProductListingCard from '../components/products/plp/ProductListingCard'

class Category extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    const id = query.id
    const isServer = !!req
    if (isServer) {
      await reduxStore.dispatch(readCategory(id))
    }
    return {id: id}
  }

  componentDidMount () {
    const { dispatch, id } = this.props

    dispatch(readCategory(id))
  }

  render () {
    const category = this.props.data
    const { loading, error } = this.props

    if (loading) {
      return (
        <Loading />
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

function mapStateToProps (state) {
  const { category } = state

  return category
}

export default connect(mapStateToProps)(Category)
