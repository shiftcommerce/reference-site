// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { readCategory } from '../actions/categoryActions'

// Components
import Loading from '../components/Loading'
import ProductListingCard from '../components/products/plp/ProductListingCard'
import ProductNavBar from '../components/navigation/ProductNavBar'

// Objects
import Button from '../objects/Button'

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

  renderMenuOptions () {
    return (
      <div className='c-product-listing__menu-options'>
        <div className='c-product-listing__menu-options-filters'>
          <h2 className='c-product-listing__menu-options-filters-title'>Filters</h2>
          <div className='c-product-listing__menu-options-filters-applied'>2 of 6</div>
          <Button className='c-product-listing__menu-options-filters-button' />
        </div>
        <div className='c-product-listing__menu-options-sort-by'>
          <h2 className='c-product-listing__menu-options-sort-by-title'>Sort By: Relevance</h2>
          <Button className='c-product-listing__menu-options-sort-by-button' />
        </div>
      </div>
    )
  }

  renderProductMenu () {
    return (
      <div className='c-product-listing__menu'>
        <div className='c-product-listing__menu-description'>
          <h1 className='c-product-listing__menu-description-title'>Category Title</h1>
          <div className='c-product-listing__menu-description-content'>
            <p>Category description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo nunc. Suspendisse lectus odio, pulvinar vitae dictum.</p>
          </div>
        </div>
        { this.renderMenuOptions() }
        <div className='c-product-listing__menu-items-displayed'>
          Showing 24 of 100 Products
        </div>
      </div>
    )
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
          <ProductNavBar />
          { this.renderProductMenu() }
          {category.map((product, index) => {
            return <ProductListingCard product={product} key={index} />
          })}
          <div className='c-product-listing__view-more'>
            <Button className='c-product-listing__view-more-button' label='view more' size='lrg' />
          </div>
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
