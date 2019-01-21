// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

// Lib
import renderComponents from '../lib/render-components'
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'

// Components
import Loading from '../components/loading'
import ProductDisplay from '../components/products/display/product-display'

// Actions
import { addToCart } from '../actions/cart-actions'
import { readProduct } from '../actions/product-actions'

export class Product extends Component {
  constructor (props) {
    super(props)
    // TODO: Update to use redux
    this.state = {
      sku: '',
      variant: '',
      variantId: null,
      quantity: 1,
      price: '',
      stockAvailableLevel: 0
    }

    this.changeVariant = this.changeVariant.bind(this)
    this.addToBag = this.addToBag.bind(this)
  }

  static async getInitialProps ({ reduxStore, req, query }) {
    const { id } = query
    const isServer = !!req

    if (isServer) {
      await reduxStore.dispatch(readProduct(id))
    }

    return { id: id }
  }

  componentDidMount () {
    const { dispatch, id } = this.props
    dispatch(readProduct(id))
  }

  addToBag () {
    const { variantId, quantity } = this.state
    this.props.dispatch(addToCart(variantId, parseInt(quantity)))
  }

  changeVariant (e) {
    this.setState({
      stockAvailableLevel: parseInt(e.target.attributes['data-stock-available-level'].value, 10),
      sku: e.target.value,
      variant: e.target.text,
      variantId: e.target.attributes['data-variant-id'].value,
      price: e.target.attributes['data-price'].value
    })
  }

  render () {
    const { product, product: { loading, error, template, title } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else if (error || Object.keys(product).length === 0) {
      return (
        <h1>Unable to load product.</h1>
      )
    } else {
      const templateSection = template && template.sections && template.sections.slice(-1).pop()
      const components = templateSection && templateSection.components
      const selectedVariant = product.variants.find(variant => variant.id === this.state.variantId)

      return (
        <>
          <Head>
            <title>{ title }</title>
          </Head>
          <ProductDisplay
            product={product}
            changeVariant={this.changeVariant}
            addToBag={this.addToBag}
            clickToBuy={this.clickToBuy}
            selectedVariant={selectedVariant}
          />
          { components && renderComponents(components) }
        </>
      )
    }
  }
}

function mapStateToProps (state) {
  const { menu, product, cart } = state
  return { menu, product, cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(Product), Product)
