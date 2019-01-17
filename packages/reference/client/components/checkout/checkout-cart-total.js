// Libraries
import { Component } from 'react'
import Sticky from 'react-stickyfill'
import Link from 'next/link'

// Lib
import addressFormValidator from '../../lib/address-form-validator'
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

  renderContinueShoppingButton () {
    return (
      <Link href='/'>
        <Button
          aria-label='Continue Shopping'
          label='Continue shopping'
          status='primary'
          className='c-cart-summary__buttons--continue o-button--sml'
          type='button'
        />
      </Link>
    )
  }

  renderContinueButton () {
    return (
      <Button
        className='c-cart-summary__buttons--proceed o-button--sml'
        type='button'
        {...this.continueButtonProps()}
      />
    )
  }

  continueButtonProps () {
    const { checkout, onClick, order, convertToOrder } = this.props

    switch (checkout.currentStep) {
      case 1:
        return this.continueToShippingMethodButtonProps(onClick)
      case 2:
        return this.continueToPaymentButtonProps(onClick)
      case 3:
        return this.reviewOrderButtonProps(onClick)
      case 4:
        return this.placeOrderButtonProps(checkout, order, convertToOrder)
    }
  }

  continueToShippingMethodButtonProps (onClick) {
    const { checkout: { shippingAddress } } = this.props

    return {
      'aria-label': 'Choose Shipping Method',
      label: 'Choose Shipping Method',
      status: 'positive',
      disabled: !addressFormValidator(shippingAddress),
      onClick: onClick
    }
  }

  continueToPaymentButtonProps (onClick) {
    return {
      'aria-label': 'Continue to Payment',
      label: 'Continue to Payment',
      status: 'positive',
      onClick: onClick
    }
  }

  reviewOrderButtonProps (onClick) {
    const { checkout: { shippingAddressAsBillingAddress, billingAddress }, order } = this.props

    return {
      'aria-label': 'Review Order',
      label: 'Review Your Order',
      status: 'primary',
      disabled: order.card_errors || !(shippingAddressAsBillingAddress || addressFormValidator(billingAddress)),
      onClick: onClick
    }
  }

  placeOrderButtonProps (checkout, order, convertToOrder) {
    const isValidOrder = this.validOrder(checkout, order)

    return {
      'aria-label': 'Place Order',
      label: 'Place Order',
      id: 'place_order',
      status: isValidOrder ? 'primary' : 'disabled',
      disabled: !isValidOrder,
      onClick: convertToOrder
    }
  }
  renderButtons () {
    return (
      <div className='c-cart-summary-buttons'>
        { this.renderContinueShoppingButton() }
        { this.renderContinueButton() }
      </div>
    )
  }

  renderPromotions () {
    return this.props.cart.discount_summaries.map(discountSummary => {
      return (
        <dl className='c-cart-summary__promotion' key={ discountSummary.id }>
          <dt>{ discountSummary.name }:</dt>
          <dd>- &pound;{ fixedPrice(discountSummary.total) }</dd>
        </dl>
      )
    })
  }

  renderShippingPromotion () {
    const shippingPromotionName = this.props.cart.shipping_discount_name

    if (shippingPromotionName) {
      return (
        <dl className='c-cart-summary__promotion'>
          <dt>{ shippingPromotionName }:</dt>
          <dd>- &pound;{ fixedPrice(this.props.cart.shipping_total_discount * -1) }</dd>
        </dl>
      )
    }
  }

  shippingText (checkout, cart) {
    if (cart.shipping_method) {
      return `£${fixedPrice(cart.shipping_method.total)}`
    } else {
      return 'Loading shipping cost...'
    }
  }

  render () {
    const { cart, checkout, order } = this.props

    return (
      <>
        <Sticky>
          <div aria-label='Cart total summary' className='u-sticky c-cart-summary'>
            <dl aria-label='Subtotal'>
              <dt> Total Price: </dt>
              <dd> &pound;{ fixedPrice(cart.sub_total) } </dd>
            </dl>
            { this.renderPromotions() }
            <dl aria-label='Shipping cost'>
              <dt> Shipping costs: </dt>
              <dd> { this.shippingText(checkout, cart) } </dd>
            </dl>
            { this.renderShippingPromotion() }
            <dl aria-label='Total' className='u-bold'>
              <dt> TOTAL: </dt>
              <dd> &pound;{ fixedPrice(cart.total) } </dd>
            </dl>
            <dl>
              <dt className='c-cart-summary__VAT'>* Including VAT</dt>
            </dl>
            { order.paymentError && <div className='c-checkout-cart-total__payment-error'>{ order.paymentError }</div> }
          </div>
        </Sticky>
        { this.renderButtons() }
      </>
    )
  }
}

export default CheckoutCartTotal
