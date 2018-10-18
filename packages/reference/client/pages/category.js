// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { readCategory } from '../actions/category-actions'

// Components
import Loading from '../components/loading'
import ProductListingCard from '../components/products/listing/product-listing-card'
import ProductNavBar from '../components/navigation/product-navbar'

// Objects
import Button from '../objects/button'
import Breadcrumb from '../objects/breadcrumb'

class Category extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    const id = query.id
    const isServer = !!req
    if (isServer) {
      await reduxStore.dispatch(readCategory(id))
    }
    return { id: id }
  }

  componentDidMount () {
    const { dispatch, id } = this.props

    dispatch(readCategory(id))
  }

  renderMenuOptions () {
    return (
      <div className='c-product-listing__menu-options'>
        <Breadcrumb />
        { this.renderProductMenuDropdowns() }
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
          <p>Showing 24 of 100 Products</p>
          <h4>View<span> 2</span> 4</h4>
        </div>
      </div>
    )
  }

  renderProductMenuDropdowns () {
    return (
      <div className='c-product-listing__menu-dropdowns'>
        <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--category'>
          <select className='c-product-listing__menu-dropdown-select'><option>category</option></select>
        </div>
        <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--colour'>
          <select className='c-product-listing__menu-dropdown-select'><option>colour</option></select>
        </div>
        <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--size'>
          <select className='c-product-listing__menu-dropdown-select'><option>size</option></select>
        </div>
        <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--price'>
          <select className='c-product-listing__menu-dropdown-select'><option>price</option></select>
        </div>
        <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--sortby'>
          <select className='c-product-listing__menu-dropdown-select'><option>sort by</option></select>
        </div>
      </div>
    )
  }

  render () {
    const category = this.props.data
    const { loading, error } = this.props

    if (loading) {
      return (<Loading />)
    } else if (error) {
      return (<p>{ error }</p>)
    } else {
      return <>
        <ProductNavBar />
        <div className='c-product-listing'>
          { this.renderProductMenu() }
          { category.map((product, id) => {
            return <ProductListingCard product={product} key={id} />
          }) }
          <div className='c-product-listing__view-more'>
            <Button className='c-product-listing__view-more-button' label='view more' size='lrg' />
          </div>
        </div>
      </>
    }
  }
}

function mapStateToProps (state) {
  const { category } = state

  return category
}

export default connect(mapStateToProps)(Category)
