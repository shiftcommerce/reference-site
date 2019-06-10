// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'

// Components
import ProductMenu from '../listing/product-menu'
import ProductMenuOptions from '../listing/product-menu-options'
import SearchFilters from '../../search/search-filters'
import SearchHits from '../../search/search-hits'

// Objects
import { Breadcrumb } from '../../../objects/breadcrumb'

export class ProductListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filtersShown: false
    }
  }

  toggleFiltering = () => {
    if (this.state.filtersShown) {
      document.body.classList.remove('modal-open')
    } else {
      document.body.classList.add('modal-open')
    }

    this.setState({
      filtersShown: !this.state.filtersShown
    })
  }

  render () {
    const { title, facets, indexName, indexNameWithoutDefaultSortOrder } = this.props

    return (
      <>
        <ProductMenu title={title} />
        <Breadcrumb />
        <div className='c-product-listing-wrapper'>
          <SearchFilters facets={facets} filtersShown={this.state.filtersShown} toggleFiltering={this.toggleFiltering} />
          <div className={classNames('c-product-listing')}>
            <div className='c-product-listing__menu'>
              <ProductMenuOptions
                indexName={indexName}
                indexNameWithoutDefaultSortOrder={indexNameWithoutDefaultSortOrder}
                toggleFiltering={this.toggleFiltering}
              />
            </div>
            <SearchHits />
          </div>
        </div>
      </>
    )
  }
}

export default ProductListing
