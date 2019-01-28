// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Libs
import { decimalPrice } from '../../lib/decimal-price'
import ApiClient from '../../lib/api-client'
import JsonApiParser from '../../lib/json-api-parser'

import { fetchShippingMethodsRequest } from '../../requests/cart-requests'

class CartSummary extends Component {
  static async fetchShippingMethods () {
    try {
      const request = fetchShippingMethodsRequest()
      const response = await new ApiClient().read(request.endpoint, request.query)
      return new JsonApiParser().parse(response.data)
    } catch (error) {
      return { error }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: !props.cart.shipping_method
    }
  }

  async componentDidMount () {
    if (this.state.loading) {
      const cheapestShipping = (await this.constructor.fetchShippingMethods()).data.sort((method1, method2) => method1.total - method2.total)[0]

      this.setState({
        cheapestShipping: cheapestShipping,
        loading: false
      })
    }
  }

  shippingText () {
    const { cart } = this.props

    if (this.state.loading) {
      return <a>Estimating shipping cost...</a>
    } else if (this.props.cart.shipping_method) {
      return <a>{ `Shipping : ${cart.shipping_method.total}` }</a>
    } else {
      return <a>{ `Shipping from: £${this.state.cheapestShipping.total}` }</a>
    }
  }

  renderPromotions () {
    return this.props.cart.discount_summaries.map(discountSummary => {
      return (
        <dl className='c-cart-summary__promotion' key={ discountSummary.id }>
          <dt>{ discountSummary.name }</dt>
          <dd>- &pound;{ decimalPrice(discountSummary.total) }</dd>
        </dl>
      )
    })
  }

  cartTotal () {
    const { cart } = this.props

    if (cart.shipping_method) {
      return cart.total
    } else {
      return cart.total + this.state.cheapestShipping.total
    }
  }

  render () {
    const { cart } = this.props

    return (
      <>
        <section className='c-cart-summary'>
          <dl>
            <dt><a>Total Price:</a></dt>
            <dd><a>&pound;{ decimalPrice(cart.sub_total) }</a></dd>
          </dl>
          { this.renderPromotions() }
          <dl>
            <dt>{ this.shippingText() }</dt>
          </dl>
          <dl>
            <dt><p className='u-bold'>TOTAL:</p></dt>
            <dd><p className='u-bold'>&pound;{ !this.state.loading && decimalPrice(this.cartTotal()) }</p></dd>
          </dl>
          <dl>
            <a>* Including VAT</a>
          </dl>
        </section>
        <section className='c-cart-summary__buttons'>
          <Link href='/slug?slug=/homepage' as='/'>
            <a className='o-button--sml c-cart-summary__buttons--continue'>continue shopping</a>
          </Link>
          <Link href='/checkout'>
            <a className='o-button--sml c-cart-summary__buttons--proceed'>Checkout</a>
          </Link>
        </section>
      </>
    )
  }
}

export default CartSummary
