// Libraries
import React, { Component, Fragment } from 'react'
import Router from 'next/router'

// Lib
import renderComponents from '../lib/render-components'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

// Components
import { Loading } from '@shiftcommerce/shift-react-components/src/objects/loading'
import { ProductDisplay } from '@shiftcommerce/shift-react-components/src/components/products/display/product-display'

// Actions
import { addToCart, toggleMiniBag } from '../actions/cart-actions'
import { readProduct } from '../actions/product-actions'

// Config
import Config from '../lib/config'
import ApiClient from '../lib/api-client'

class ProductPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      variantId: null,
      quantity: 1
    }

    this.Head = Config.get().Head
    this.changeVariant = this.changeVariant.bind(this)
    this.addToBag = this.addToBag.bind(this)
  }

  static async getInitialProps ({ reduxStore, req, res, query: { id } }) {
    const product = await ProductPage.fetchProduct(id, reduxStore.dispatch)
    const isServer = !!req
    const { sellable } = product
    const preview = req.query && req.query.preview ? req.query.preview : false

    // Unpublished products should return a 404 page to the public however we should
    // be able to preview unpublished products using a ?preview=true query string
    if (sellable === false && preview === false) {
      if (isServer) {
        // server-side
        res.redirect('/error')
      } else {
        // client-side
        Router.push('/error')
      }
    }

    return { id: id, product }
  }

  static async fetchProduct (id, dispatch) {
    try {
      const request = ProductPage.productRequest(id)
      const response = await new ApiClient().read(request.endpoint, request.query, dispatch)

      return response.data
    } catch (error) {
      return { error }
    }
  }

  static productRequest (productId) {
    return {
      endpoint: `/getProduct/${productId}`,
      query: {
        fields: {
          asset_files: 'id,image_height,image_width,s3_url',
          variants: 'id,meta_attributes,title,description,reference,ewis_eligible,product_id,sku,stock_allocated_level,stock_level,tax_code,stock_available_level,has_assets,price_includes_taxes,available_to_order,price,current_price,picture_url'
        },
        include: 'asset_files,variants,template,meta.*'
      }
    }
  }

  componentDidMount () {
    const { dispatch, id } = this.props
    dispatch(readProduct(id))
  }

  addToBag () {
    const { variantId, quantity } = this.state
    this.props.dispatch(addToCart(variantId, parseInt(quantity))).then(success => {
      if (success) this.props.dispatch(toggleMiniBag(true))
    })
  }

  changeVariant (e) {
    this.setState({
      variantId: e.target.attributes['data-variant-id'].value
    })
  }

  renderPageHead (title) {
    return (
      <this.Head>
        <title>{ suffixWithStoreName(title) }</title>
      </this.Head>
    )
  }

  /**
   * Render the product page when loaded. This method is seperate to the main
   * render method so it can be overridden, without overriding the loading and
   * error parts of the render method
   * @return {String} - HTML markup for the component
   */
  renderLoaded () {
    const { product, product: { template } } = this.props

    const templateSection = template && template.sections && template.sections.slice(-1).pop()
    const components = templateSection && templateSection.components
    const selectedVariant = product.variants.find(variant => variant.id === this.state.variantId)

    return (
      <Fragment>
        <ProductDisplay
          product={product}
          changeVariant={this.changeVariant}
          addToBag={this.addToBag}
          selectedVariant={selectedVariant}
        />
        { components && renderComponents(components) }
      </Fragment>
    )
  }

  render () {
    const { product, product: { loading, error, title } } = this.props

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
        <Fragment>
          { this.renderPageHead(title) }
          { this.renderLoaded() }
        </Fragment>
      )
    }
  }
}

export default ProductPage
