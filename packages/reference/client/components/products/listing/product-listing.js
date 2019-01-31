// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import { Breadcrumb } from 'shift-react-components'

// Components
import { AlgoliaHits } from '../../search/algolia/algolia-hits'
import AlgoliaFilters from '../../search/algolia/algolia-filters'

import ProductMenu from './product-menu'
import ProductMenuOptions from './product-menu-options'

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
    const { title, facets } = this.props

    return (
      <>
        <ProductMenu title={title} />
        <Breadcrumb />
        <div className='c-product-listing-wrapper'>
          <AlgoliaFilters facets={facets} filtersShown={this.state.filtersShown} toggleFiltering={this.toggleFiltering} />
          <div className={classNames('c-product-listing')}>
            <div className='c-product-listing__menu'>
              <ProductMenuOptions toggleFiltering={this.toggleFiltering} />
            </div>
            <AlgoliaHits />
          </div>
        </div>
      </>
    )
  }
}

export default ProductListing
