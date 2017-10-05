// Libraries
import { Component } from 'react'
import { calculateCartSummary } from '../../lib/calculateCartSummary'

class CheckoutCartTotal extends Component {
  render () {
    const totals = calculateCartSummary(this.props.cart, this.props.checkout)

    // TODO: This can be replaced with 'shippingAddress.valid' once validations are in place
    let shippingText = ''
    if (!this.props.checkout.shippingAddress.collapsed) {
      shippingText = 'Enter address'
    } else if (!this.props.checkout.shippingMethod.cost) {
      shippingText = 'Select shipping method'
    } else {
      shippingText = `£${totals.shipping}`
    }

    return (
      <div aria-label='Cart total summary' className='o-checkout-cart-total'>
        <div className='o-checkout-cart-total__wrapper'>
          <dl aria-label='Subtotal'>
            <dt> Subtotal: </dt>
            <dd> &pound;{totals.subTotal} </dd>
          </dl>
          <dl aria-label='VAT'>
            <dt> VAT: </dt>
            <dd> &pound;{totals.tax} </dd>
          </dl>
          <dl aria-label='Shipping cost'>
            <dt> Shipping: </dt>
            <dd> {shippingText} </dd>
          </dl>
          <dl aria-label='Total' className='o-checkout-cart-total__total'>
            <dt> You Pay: </dt>
            <dd> <b>&pound;{totals.total}</b> </dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default CheckoutCartTotal
