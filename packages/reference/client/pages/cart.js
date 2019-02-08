// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

import ApiClient from '../lib/api-client'

// Actions
import { updateLineItemQuantity, deleteLineItem } from '../actions/cart-actions'

// Requests
import { fetchShippingMethodsRequest } from '../requests/cart-requests'

// Components
import {
  Breadcrumb,
  CartNoData,
  CartTable,
  CartTableGrid,
  CartTableGridItem,
  CartTableHeader,
  CartTablePaymentIcons,
  CartTableSummary,
  LineItems,
  Loading
} from 'shift-react-components'
import CouponForm from '../components/coupon-form'

// Fixtures
import shippingMethods from '../static/shipping-methods.json'

export class CartPage extends Component {
  constructor (props) {
    super(props)

    // from cart-summary
    this.state = {
      loading: !props.cart.shipping_method
    }

    this.fetchShippingMethods = this.fetchShippingMethods.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  async componentDidMount () {
    if (this.state.loading) {
      const cheapestShipping = (await this.fetchShippingMethods()).data.sort((method1, method2) => method1.total - method2.total)[0]

      this.setState({
        cheapestShipping: cheapestShipping,
        loading: false
      })
    }
  }

  async fetchShippingMethods () {
    try {
      const request = fetchShippingMethodsRequest()
      const response = await new ApiClient().read(request.endpoint, request.query)
      return response.data
    } catch (error) {
      return { error }
    }
  }

  updateQuantity (event) {
    this.props.dispatch(updateLineItemQuantity(event.target.dataset.id, parseInt(event.target.value, 10)))
  }

  deleteItem (event) {
    event.preventDefault()
    this.props.dispatch(deleteLineItem(event.target.dataset.id))
  }

  /**
   * Render the no-data message, or the cart contents, based on if the cart has
   * contents or not
   * @param  {Object} cart
   * @return {string} - HTML markup for the component
   */
  renderCartTableGrid (cart) {
    if (!cart.line_items_count) {
      return (
        <CartNoData />
      )
    } else {
      return (
        <>
          <CartTableGridItem item='a'>
            <LineItems
              updateQuantity={this.updateQuantity}
              deleteItem={this.deleteItem}
              cart={cart}
              aria-label='Line Items'
            />
          </CartTableGridItem>
          <CartTableGridItem item='b'>
            <CouponForm />
            <CartTableSummary
              cart={cart}
              loading={this.state.loading}
              cheapestShipping={this.state.cheapestShipping}
              aria-label='Cart Summary'
            />
            <CartTablePaymentIcons />
          </CartTableGridItem>
        </>
      )
    }
  }

  render () {
    const { cart, cart: { loading, error } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else if (error) {
      return (
        <p>{ error }</p>
      )
    } else {
      return (
        <>
          <Head>
            <title>{ suffixWithStoreName('Your Shopping Cart') }</title>
          </Head>
          <CartTable>
            <CartTableHeader
              cart={cart}
              shippingMethods={shippingMethods}
              breadcrumb={<Breadcrumb />}
            />
            <CartTableGrid>
              { this.renderCartTableGrid(cart) }
            </CartTableGrid>
          </CartTable>
        </>
      )
    }
  }
}

function mapStateToProps (state) {
  const { cart } = state
  return { cart }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(CartPage), CartPage)
