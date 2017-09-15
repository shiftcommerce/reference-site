// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// Components
import Layout from '../../components/Layout'
import ProductDisplay from '../../components/products/ProductDisplay'

// Objects
import Breadcrumb from '../../objects/Breadcrumb'

// Actions
import { addToCart } from '../../actions/cartActions'
import { readProduct } from '../../actions/productActions'

// Utils
import { configureStore } from '../../utils/configureStore'

class Product extends Component {
  constructor () {
    super()
    this.state = {
      sku: '',
      size: '',
      quantity: '',
      price: ''
    }

    this.changeQuantity = this.changeQuantity.bind(this)
    this.changeSize = this.changeSize.bind(this)
    this.addToBag = this.addToBag.bind(this)
  }

  static async getInitialProps ({ store, query }) {
    if (query.id) {
      await store.dispatch(readProduct(query.id))
    } else {
      return { product: {} }
    }
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
        imageUrl: product.asset_files[0].url,
        productSku: product.sku,
        productID: product.id
      }
      this.props.dispatch(addToCart(lineItem))
    } else {
      /*eslint-disable */
      alert('Please select the size and quantity')
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
    const breadcrumbMenuTrail = [
      { id: 1, title: 'Dresses', canonical_path: '/categories/61af1530-a9e8-44f2-a5c0-a0e7fe8f397b' },
      { id: 2, title: 'Textured Long T-Shirt', canonical_path: '/products/708a0142-e60f-4332-9a8b-1359c5af9ec4' }
    ]

    let {
      product,
      process
    } = this.props

    if (process.errored || Object.keys(product).length === 0) {
      return (
        <Layout>
          <h1>Unable to load product.</h1>
        </Layout>
      )
    } else if (process.loading) {
      return (
        <Layout>
          <h1>Loading product...</h1>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <div>
            <Breadcrumb trail={breadcrumbMenuTrail} />
          </div>

          <ProductDisplay product={product} changeQuantity={this.changeQuantity} changeSize={this.changeSize} addToBag={this.addToBag} {...this.state} />
        </Layout>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    process: state.process || {},
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
