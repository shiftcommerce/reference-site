// Libraries
import { Component } from 'react'
import Sticky from 'react-stickyfill'
import Link from 'next/link'

// Lib
import { decimalPrice } from '../../lib/decimal-price'

// Objects
import { Button } from 'shift-react-components'

class CheckoutCartTotal extends Component {
  renderContinueShoppingButton () {
    return (
      <Link href='/'>
        <Button
          aria-label='Continue Shopping'
          label='Continue shopping'
          status='primary'
          className='c-cart-summary-buttons__cta c-cart-summary-buttons__cta--continue o-button--sml'
          type='button'
        />
      </Link>
    )
  }

  renderContinueButton () {
    return (
      <Button
        className='c-cart-summary-buttons__cta c-cart-summary-buttons__cta--proceed o-button--sml'
        type='button'
        {...this.props.continueButtonProps}
      />
    )
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
          <dd>- &pound;{ decimalPrice(discountSummary.total) }</dd>
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
          <dd>- &pound;{ decimalPrice(this.props.cart.shipping_total_discount * -1) }</dd>
        </dl>
      )
    }
  }

  shippingText (cart) {
    if (cart.shipping_method) {
      return `£${decimalPrice(cart.shipping_method.total)}`
    } else {
      return 'Loading shipping cost...'
    }
  }

  render () {
    const { cart, order } = this.props

    return (
      <>
        <Sticky>
          <div aria-label='Cart total summary' className='u-sticky c-cart-summary'>
            <dl aria-label='Subtotal'>
              <dt> Total Price: </dt>
              <dd> &pound;{ decimalPrice(cart.sub_total) } </dd>
            </dl>
            { this.renderPromotions() }
            <dl aria-label='Shipping cost'>
              <dt> Shipping costs: </dt>
              <dd> { this.shippingText(cart) } </dd>
            </dl>
            { this.renderShippingPromotion() }
            <dl aria-label='Total' className='u-bold'>
              <dt> TOTAL: </dt>
              <dd> &pound;{ decimalPrice(cart.total) } </dd>
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
