// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../components/Loading'
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

  static async getInitialProps ({ reduxStore, req, query }) {
    const {id} = query
    const isServer = !!req

    if (isServer) {
      await reduxStore.dispatch(readProduct(id))
    }

    return {id: id}
  }

  componentDidMount () {
    const {dispatch, id} = this.props
    dispatch(readProduct(id))
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
    const { product, product: { loading, error } } = this.props

    if (loading) {
      return (
        <Loading />
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

function mapStateToProps (state) {
  const { menu, product } = state
  return { menu, product }
}

export default connect(mapStateToProps)(Product)
