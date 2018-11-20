// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Breadcrumb from '../../../objects/breadcrumb'

// Components
import { AlgoliaHits } from '../../search/algolia/algolia-hits'
import AlgoliaFilters from '../../search/algolia/algolia-filters'

import ProductMenu from './product-menu'
import ProductMenuOptions from './product-menu-options'

export class ProductListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showFilters: false
    }
  }

  toggleFiltering = () => {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  render () {
    return (
      <>
        <ProductMenu title={this.props.title} body={'Optional text prop not yet setup but available'} />
        <Breadcrumb />
        <div className='c-product-listing-wrapper'>
          <AlgoliaFilters showFilters={this.state.showFilters} toggleFiltering={this.toggleFiltering} />
          <div className={classNames('c-product-listing')}>
            <div className='c-product-listing__menu'>
              <ProductMenuOptions showFilters={this.state.showFilters} toggleFiltering={this.toggleFiltering} />
            </div>
            <AlgoliaHits />
          </div>
        </div>
      </>
    )
  }
}

export default ProductListing
