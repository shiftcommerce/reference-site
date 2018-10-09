// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

// Components
import Loading from '../components/Loading'
import ProductDisplay from '../components/products/display/ProductDisplay'

// Actions
import { addToCart } from '../actions/cartActions'
import { readProduct } from '../actions/productActions'

export class Product extends Component {
  constructor (props) {
    super(props)
    // TODO: Update to use redux
    this.state = {
      sku: '',
      variant: '',
      quantity: 1,
      price: '',
      stockAvailableLevel: 0
    }

    this.changeQuantity = this.changeQuantity.bind(this)
    this.changeVariant = this.changeVariant.bind(this)
    this.addToBag = this.addToBag.bind(this)
    this.clickToBuy = this.clickToBuy.bind(this)
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
    const { quantity, sku, variant, stockAvailableLevel, price } = this.state
    const { product } = this.props

    if (quantity !== '' && sku !== '') {
      const lineItem = {
        sku: sku,
        title: product.title,
        variant: variant,
        quantity: parseInt(quantity),
        stockAvailableLevel: stockAvailableLevel,
        price: price,
        imageUrl: (product.asset_files[0] && product.asset_files[0].s3_url),
        productSku: product.sku,
        productID: product.id,
        slug: product.slug,
        canonicalPath: product.canonical_path
      }
      this.props.dispatch(addToCart(lineItem))
    } else {
      /*eslint-disable */
      alert('Please select a size')
      /*eslint-enable */
    }
  }

  clickToBuy () {
    this.addToBag()

    const { cart } = this.props

    if (cart.totalQuantity >= 1) {
      Router.push('/checkout')
    }
  }

  changeQuantity (e) {
    this.setState({ quantity: e.target.value })
  }

  changeVariant (e) {
    this.setState({
      stockAvailableLevel: parseInt(e.target.options[e.target.selectedIndex].dataset.stockAvailableLevel, 10),
      sku: e.target.value,
      variant: e.target.options[e.target.selectedIndex].text,
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
        <ProductDisplay product={product} changeQuantity={this.changeQuantity} changeVariant={this.changeVariant} addToBag={this.addToBag} clickToBuy={this.clickToBuy} {...this.state} />
      )
    }
  }
}

function mapStateToProps (state) {
  const { menu, product, cart } = state
  return { menu, product, cart }
}

export default connect(mapStateToProps)(Product)
