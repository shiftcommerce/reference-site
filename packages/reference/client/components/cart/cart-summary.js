// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Libs
import { calculateCartSummary } from '../../lib/calculate-cart-summary'
import { fixedPrice } from '../../lib/fixed-price'

// Objects
import Button from '../../objects/button'

class CartSummary extends Component {
  shippingText () {
    if (typeof window === 'undefined' || window.location.pathname !== '/checkout') {
      // TODO: make this dynamic in future
      return (
        <a>Estimated shipping cost: &pound;3.45</a>
      )
    } else {
      return (
        <a>Shipping cost:</a>
      )
    }
  }

  render () {
    const totals = calculateCartSummary(this.props.cart)

    return (
      <>
        <section className='c-cart-summary'>
          <dl>
            <dt><a>Total Price:</a></dt>
            <dd><a>&pound;{ fixedPrice(totals.subTotal) }</a></dd>
          </dl>
          <dl>
            <dt>{ this.shippingText() }</dt>
          </dl>
          <dl>
            <dt><p className='u-bold'>TOTAL:</p></dt>
            <dd><p className='u-bold'>&pound;{ fixedPrice(totals.total + 3.45) }</p></dd>
          </dl>
          <dl>
            <a>* Including VAT</a>
          </dl>
        </section>
        <section className='c-cart-summary__buttons'>
          <Button
            aria-label='Continue Shopping'
            label='Continue shopping'
            status='grey'
            className='c-cart-summary__buttons--continue o-button--sml'
            type='button'
          />
          <Link href='/checkout' as=''>
            <Button
              aria-label='Place Order'
              label='Continue to payment'
              className='c-cart-summary__buttons--proceed o-button--sml'
              status='positive'
              type='button'
            />
          </Link>
        </section>
      </>
    )
  }
}

export default CartSummary
