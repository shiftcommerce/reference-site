// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// Components
import Layout from '../components/Layout'
import ProductDisplay from '../components/products/pdp/ProductDisplay'

// Actions
import { addToCart } from '../actions/cartActions'
import { readProduct } from '../actions/productActions'
import { readMenu } from '../actions/menuActions'

// Utils
import { configureStore } from '../utils/configureStore'

export class Product extends Component {
  constructor () {
    super()
    this.state = {
      sku: '',
      size: '',
      quantity: 1,
      price: ''
    }

    this.changeQuantity = this.changeQuantity.bind(this)
    this.changeSize = this.changeSize.bind(this)
    this.addToBag = this.addToBag.bind(this)
  }

  static async getInitialProps ({ store, query }) {
    await store.dispatch(readMenu(store))
    await store.dispatch(readProduct(query.id))
  }

  addToBag () {
    let { quantity, sku, size, price } = this.state
    let { product } = this.props

    if (quantity !== '' && sku !== '') {
      const lineItem = {
        sku: sku,
        title: product.title,
        size: size,
        quantity: parseInt(quantity),
        price: price,
        imageUrl: (product.asset_files[0] && product.asset_files[0].url),
        productSku: product.sku,
        productID: product.id
      }
      this.props.dispatch(addToCart(lineItem))
    } else {
      /*eslint-disable */
      alert('Please select a size')
      /*eslint-enable */
    }
  }

  changeQuantity (e) {
    this.setState({ quantity: e.target.value })
  }

  changeSize (e) {
    this.setState({
      sku: e.target.value,
      size: e.target.options[e.target.selectedIndex].text,
      price: e.target.options[e.target.selectedIndex].dataset.price
    })
  }

  render () {
    let {
      product
    } = this.props

    if (product.loading) {
      return (
        <Layout>
          <h1>Loading product...</h1>
        </Layout>
      )
    } else if (product.error || Object.keys(product).length === 0) {
      return (
        <Layout>
          <h1>Unable to load product.</h1>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <ProductDisplay product={product} changeQuantity={this.changeQuantity} changeSize={this.changeSize} addToBag={this.addToBag} {...this.state} />
        </Layout>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart || {},
    product: state.product || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(Product)