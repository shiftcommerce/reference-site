// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Libs
import { calculateCartSummary } from '../../lib/calculateCartSummary'
import { fixedPrice } from '../../lib/fixedPrice'

// Objects
import Button from '../../objects/Button'

class CartSummary extends Component {
  shippingText () {
    if (typeof window === 'undefined' || window.location.pathname !== '/checkout') {
      // TODO: make this dynamic in future
      return <>
        <a>Estimated shipping cost: &pound;3.45</a>
      </>
    } else {
      return <>
         <a>Shipping cost:</a>
       </>
    }
  }

  render () {
    const totals = calculateCartSummary(this.props.cart)

    return (
      <>
      <section className='c-cart-summary'>
        <dl>
          <dt><a>Total Price:</a></dt>
          <dd><a>&pound;{fixedPrice(totals.subTotal)}</a></dd>
        </dl>
        <dl>
          <dt>{ this.shippingText() }</dt>
        </dl>
        <dl>
          <dt><a className='u-bold'>TOTAL:</a></dt>
          <dd><a className='u-bold'>&pound;{fixedPrice(totals.total)}</a></dd>
        </dl>
        <dl>
          <a>* Including VAT</a>
        </dl>
      </section>
      <section className='c-cart-summary__buttons'>
        <Button
          aria-label='Continue Shopping'
          label='Continue shopping'
          size='lrg'
          status='grey'
          className='c-cart-summary__buttons--continue'
          type='button'
        />
        <Link href='/checkout' as=''>
          <Button
            aria-label='Place Order'
            label='Continue to payment'
            size='lrg'
            className='c-cart-summary__buttons--proceed'
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
