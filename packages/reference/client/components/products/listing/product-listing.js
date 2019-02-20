// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Components
import { Breadcrumb, SearchFilters, SearchHits } from 'shift-react-components'
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
          <SearchFilters facets={facets} filtersShown={this.state.filtersShown} toggleFiltering={this.toggleFiltering} />
          <div className={classNames('c-product-listing')}>
            <div className='c-product-listing__menu'>
              <ProductMenuOptions toggleFiltering={this.toggleFiltering} />
            </div>
            <SearchHits />
          </div>
        </div>
      </>
    )
  }
}

export default ProductListing
