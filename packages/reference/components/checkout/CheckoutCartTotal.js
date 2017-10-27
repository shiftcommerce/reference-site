// Libraries
import { Component } from 'react'
import { calculateCartSummary } from '../../lib/calculateCartSummary'
import { penceToPounds } from '../../lib/penceToPounds'
import Sticky from 'react-stickyfill'

class CheckoutCartTotal extends Component {
  render () {
    const { cart, checkout, convertToOrder, order } = this.props
    const totals = calculateCartSummary(cart, checkout)
    // TODO: This can be replaced with 'shippingAddress.valid' once validations are in place
    let shippingText = ''
    if (!checkout.shippingAddress.collapsed) {
      shippingText = 'Enter address'
    } else if (!checkout.shippingMethod.retail_price_inc_tax) {
      shippingText = 'Select shipping method'
    } else {
      shippingText = `£${penceToPounds(totals.shipping)}`
    }

    return (
      <Sticky>
        <div aria-label='Cart total summary' className='o-checkout-cart-total u-sticky'>
          <div className='o-checkout-cart-total__wrapper'>
            <dl aria-label='Subtotal'>
              <dt> Subtotal: </dt>
              <dd> &pound;{penceToPounds(totals.subTotal)} </dd>
            </dl>
            <dl aria-label='VAT'>
              <dt> VAT: </dt>
              <dd> &pound;{penceToPounds(totals.tax)} </dd>
            </dl>
            <dl aria-label='Shipping cost'>
              <dt> Shipping: </dt>
              <dd> {shippingText} </dd>
            </dl>
            <dl aria-label='Total' className='o-checkout-cart-total__total'>
              <dt> You Pay: </dt>
              <dd> <b>&pound;{penceToPounds(totals.total)}</b> </dd>
              <div>
                <input type='button' onClick={convertToOrder} value='Create Order' />
              </div>
            </dl>
            {order.paymentError &&
              <div className='c-checkout-cart-total__payment-error'>{order.paymentError}</div>
            }
          </div>
        </div>
      </Sticky>
    )
  }
}

export default CheckoutCartTotal
