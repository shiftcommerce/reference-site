// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import qs from 'qs'

// Actions
import { setSearchState } from '../../actions/searchActions'
import { readCategory, readCategories } from '../../actions/categoryActions'

// Components
import Layout from '../../components/Layout'
import ProductListingCard from '../../components/products/plp/ProductListingCard'

// Lib
import trimObject from '../../lib/trimObject'

// Objects
import Breadcrumb from '../../objects/Breadcrumb'

// Utils
import { configureStore } from '../../utils/configureStore'

class Category extends Component {
  static async getInitialProps ({ store, query, url }) {
    await store.dispatch(readCategories(store))
    if (query.id) {
      await store.dispatch(readCategory({
        categoryId: query.id,
        pageNumber: query.page,
        pageSize: query.pageSize
      }))
    } else {
      return { product: {} }
    }
  }

  onSearchStateChange (searchState) {
    delete searchState.configure
    delete searchState.id

    let searchObject = trimObject(searchState)
    let href = `/categories/category?id=${this.props.category.id}`
    let as = `/categories/${this.props.category.id}?${qs.stringify(searchObject)}`

    Router.push(href, as, {shallow: true})
    this.props.dispatch(setSearchState(searchObject))
  }

  render () {
    const {
      category
    } = this.props

    let BreadcrumbTrail = [
      { id: category.id, title: category.title, canonical_path: `/categories/${category.id}`, page: '/categories/category' }
    ]
    if (category.loading) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
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
          <Breadcrumb trail={BreadcrumbTrail} />
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
