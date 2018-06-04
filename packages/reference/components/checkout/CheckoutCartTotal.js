// Libraries
import { Component } from 'react'
import { calculateCartSummary } from '../../lib/calculateCartSummary'
import { fixedPrice } from '../../lib/fixedPrice'
import Sticky from 'react-stickyfill'

// Objects
import Button from '../../objects/Button'

class CheckoutCartTotal extends Component {
  validOrder (checkout, order) {
    const checkoutSteps = [ 'shippingAddress', 'shippingMethod', 'paymentMethod' ]
    const allStepsCompleted = checkoutSteps.every((step) => (checkout[step].completed))
    return allStepsCompleted
  }

  render () {
    const { cart, checkout, convertToOrder, order } = this.props
    const totals = calculateCartSummary(cart, checkout)
    let shippingText = ''
    if (!checkout.shippingAddress.completed) {
      shippingText = 'Enter address'
    } else if (!checkout.shippingMethod.retail_price_inc_tax) {
      shippingText = 'Select shipping method'
    } else {
      shippingText = `£${fixedPrice(totals.shipping)}`
    }

    const isValidOrder = this.validOrder(checkout, order)
    return (
      <Sticky>
        <div aria-label='Cart total summary' className='o-checkout-cart-total u-sticky'>
          <div className='o-checkout-cart-total__wrapper'>
            <dl aria-label='Subtotal'>
              <dt> Subtotal: </dt>
              <dd> &pound;{ fixedPrice(totals.subTotal) } </dd>
            </dl>
            <dl aria-label='VAT'>
              <dt> VAT: </dt>
              <dd> &pound;{ fixedPrice(totals.tax) } </dd>
            </dl>
            <dl aria-label='Shipping cost'>
              <dt> Shipping: </dt>
              <dd> {shippingText} </dd>
            </dl>
            <dl aria-label='Total' className='o-checkout-cart-total__total'>
              <dt> You Pay: </dt>
              <dd> <b>&pound;{ fixedPrice(totals.total) }</b> </dd>
              <div>
                <Button
                  aria-label='Place Order'
                  label='Place Order'
                  size='lrg'
                  status={(isValidOrder ? 'primary' : 'disabled')}
                  type='button'
                  disabled={!isValidOrder}
                  onClick={convertToOrder}
                />
              </div>
            </dl>
            {order.paymentError &&
              <div className='c-checkout-cart-total__payment-error'>{ order.paymentError }</div>
            }
          </div>
        </div>
      </Sticky>
    )
  }
}

export default CheckoutCartTotal
