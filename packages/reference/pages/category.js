// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// Actions
import { readCategory } from '../actions/categoryActions'
import { readMenu } from '../actions/menuActions'

// Components
import Layout from '../components/Layout'
import ProductListingCard from '../components/products/plp/ProductListingCard'

// Utils
import { configureStore } from '../utils/configureStore'

const productListingLoading = (
  <Layout>
    <p>Loading...</p>
  </Layout>
)

class Category extends Component {
  static async getInitialProps ({ store, query }) {
    await store.dispatch(readMenu(store))
    await store.dispatch(readCategory({ categoryId: query.id }))
  }

  render () {
    const {
      category
    } = this.props

    if (category.loading) {
      return productListingLoading
    } else if (category.error) {
      return (
        <Layout>
          <p>{category.error}</p>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <div className='c-product-listing'>
            {category.data.map((product, index) => {
              return <ProductListingCard product={product} key={index} />
            })}
          </div>
        </Layout>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category || undefined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(Category)
