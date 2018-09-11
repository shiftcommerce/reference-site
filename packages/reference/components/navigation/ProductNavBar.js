// Libraries
import { Component } from 'react'

class ProductNavBar extends Component {
  render () {
    return (
      <div className='c-product-nav'>
        <div className='c-product-nav__links'><a>Women</a></div>
        <div className='c-product-nav__links  c-product-nav__links--selected'><a>Men</a></div>
        <div className='c-product-nav__links'><a>Kids</a></div>
        <div className='c-product-nav__links'><a>Home</a></div>
        <div className='c-product-nav__links'><a>Active</a></div>
      </div>
    )
  }
}

export default ProductNavBar
