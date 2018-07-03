// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import ProductDisplay from '../components/products/pdp/ProductDisplay'

// Actions
import { addToCart } from '../actions/cartActions'
import { readProduct } from '../actions/productActions'

export class Product extends Component {
  constructor (props) {
    super(props)
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

  static async getInitialProps ({ store, isServer, pathname, query }) {
    await store.dispatch(readProduct(query.id))
  }

  addToBag () {
    const { quantity, sku, size, price } = this.state
    const product = this.props.product

    if (quantity !== '' && sku !== '') {
      const lineItem = {
        sku: sku,
        title: product.title,
        size: size,
        quantity: parseInt(quantity),
        price: price,
        imageUrl: (product.asset_files[0] && product.asset_files[0].s3_url),
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
    const product = this.props.product
    const { loading, error } = this.props.product

    if (loading) {
      return (
        <h1>Loading product...</h1>
      )
    } else if (error || Object.keys(product).length === 0) {
      return (
        <h1>Unable to load product.</h1>
      )
    } else {
      return (
        <ProductDisplay product={product} changeQuantity={this.changeQuantity} changeSize={this.changeSize} addToBag={this.addToBag} {...this.state} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.data
  }
}

export default connect(mapStateToProps)(Product)
