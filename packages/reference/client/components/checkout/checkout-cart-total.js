// Libraries
import { Component } from 'react'
import Sticky from 'react-stickyfill'
import Link from 'next/link'

// Lib
import { calculateCartSummary } from '../../lib/calculate-cart-summary'
import { fixedPrice } from '../../lib/fixed-price'

// Objects
import Button from '../../objects/button'

class CheckoutCartTotal extends Component {
  validOrder (checkout, order) {
    const checkoutSteps = [ 'shippingAddress', 'shippingMethod', 'paymentMethod' ]
    const cardErrors = order.card_errors
    const allStepsCompleted = checkoutSteps.every((step) => (checkout[step].completed))

    if (!cardErrors && allStepsCompleted) {
      return allStepsCompleted
    } else { return false }
  }

  renderContinueShopping () {
    return (
      <Link href='/slug?slug=/homepage' as='/'>
        <a className='c-cart-summary__buttons--continue o-button--sml'>continue shopping</a>
      </Link>
    )
  }

  renderButtons () {
    const { checkout, onClick, order, convertToOrder } = this.props
    const isValidOrder = this.validOrder(checkout, order)

    if (checkout.currentStep === 3) {
      return (
        <section className='c-cart-summary__buttons'>
          { this.renderContinueShopping() }
          <a className='o-button--sml c-cart-summary__buttons--proceed' onClick={onClick}>review your order</a>
        </section>
      )
    } else if (checkout.currentStep === 4) {
      return (
        <section className='c-cart-summary__buttons'>
          { this.renderContinueShopping() }
          <Button
            aria-label='Place Order'
            label='Place Order'
            className='c-cart-summary__buttons--proceed o-button--sml'
            type='button'
            id='place_order'
            status={(isValidOrder ? 'positive' : 'disabled')}
            disabled={!isValidOrder}
            onClick={convertToOrder}
          />
        </section>
      )
    } else {
      return (
        <section className='c-cart-summary__buttons'>
          { this.renderContinueShopping() }
          <a className='o-button--sml c-cart-summary__buttons--proceed' onClick={onClick}>continue to payment</a>
        </section>
      )
    }
  }

  render () {
    const { cart, checkout, order } = this.props
    const totals = calculateCartSummary(cart, checkout)

    let shippingText = ''
    if (!checkout.shippingAddress.completed) {
      shippingText = 'Enter address'
    } else if (!checkout.shippingMethod.retail_price_inc_tax) {
      shippingText = 'Select shipping method'
    } else {
      shippingText = `£${fixedPrice(totals.shipping)}`
    }

    return (
      <>
        <Sticky>
          <div aria-label='Cart total summary' className='u-sticky c-cart-summary'>
            <dl aria-label='Subtotal'>
              <dt> Total Price: </dt>
              <dd> &pound;{ fixedPrice(totals.subTotal) } </dd>
            </dl>
            <dl aria-label='Shipping cost'>
              <dt> Shipping costs: </dt>
              <dd> { shippingText } </dd>
            </dl>
            <dl aria-label='Total' className='u-bold'>
              <dt> TOTAL: </dt>
              <dd> &pound;{ fixedPrice(totals.total) } </dd>
            </dl>
            <dl>
              <dt className='c-cart-summary__VAT'>* Including VAT</dt>
            </dl>
            { order.paymentError &&
              <div className='c-checkout-cart-total__payment-error'>{ order.paymentError }</div>
            }
          </div>
        </Sticky>
        { this.renderButtons() }
      </>
    )
  }
}

export default CheckoutCartTotal
