// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Lib
import renderComponents from '../lib/render-components'

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
        canonicalPath: product.canonical_path,
        bundles: product.bundles
      }
      this.props.dispatch(addToCart(lineItem))
    } else {
      /* eslint-disable */
      alert('Please select a size')
      /* eslint-enable */
    }
  }

  changeVariant (e) {
    this.setState({
      stockAvailableLevel: parseInt(e.target.options[e.target.selectedIndex].dataset.stockAvailableLevel, 10),
      sku: e.target.value,
      variant: e.target.options[e.target.selectedIndex].text,
      variantId: e.target.options[e.target.selectedIndex].dataset.variantId,
      price: e.target.options[e.target.selectedIndex].dataset.price
    })
  }

  render () {
    const { product, product: { loading, error, template } } = this.props

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

export default connect(mapStateToProps)(Product)
