// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

// Components
import Layout from '../../components/Layout'
import ProductDisplay from '../../components/products/ProductDisplay'

// Objects
import Breadcrumb from '../../objects/Breadcrumb'

// actions
import { addToCart } from '../../actions/cartActions'

// utils
import configureStore from '../../utils/configureStore'

// Product
import product from '../../static/product.json'

class Product extends Component {
  constructor () {
    super()
    this.state = {
      sku: '',
      size: '',
      quantity: ''
    }

    this.changeQuantity = this.changeQuantity.bind(this)
    this.changeSize = this.changeSize.bind(this)
    this.addToBag = this.addToBag.bind(this)
  }

  addToBag () {
    let { quantity, sku, size } = this.state

    if (quantity !== '' && sku !== '') {
      const lineItem = {
        sku: sku,
        title: product.title,
        size: size,
        quantity: parseInt(quantity),
        price: product.price,
        image_url: product.asset_files[0].url
      }
      this.props.dispatch(addToCart(lineItem))
    } else {
      alert('Please select the size and quantity')
    }
  }

  changeQuantity (e) {
    this.setState({ quantity: e.target.value })
  }

  changeSize (e) {
    this.setState({ sku: e.target.value, size: e.target.options[e.target.selectedIndex].text })
  }

  render () {
    const breadcrumbMenuTrail = [
                                  { id: 1, title: 'Womens', canonical_path: '/womens' },
                                  { id: 2, title: 'Textured Long T-Shirt', canonical_path: '/products/textured-long-t-shirt' }
    ]

    return (
      <Layout>
        <div>
          <Breadcrumb trail={breadcrumbMenuTrail} />
        </div>
        <Link href='/cart'>
          <a> Cart page </a>
        </Link>
        <ProductDisplay product={product} changeQuantity={this.changeQuantity} changeSize={this.changeSize} addToBag={this.addToBag} { ...this.state } />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(Product)
