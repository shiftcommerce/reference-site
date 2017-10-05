// Libraries
import { Component } from 'react'
import { calculateCartSummary } from '../../lib/calculateCartSummary'

class CheckoutCartTotal extends Component {
  render () {
    const {subTotal, total, tax} = calculateCartSummary(this.props.cart)

    return (
      <div aria-label='Cart total summary' className='o-checkout-cart-total'>
        <div className='o-checkout-cart-total__wrapper'>
          <dl aria-label='Subtotal'>
            <dt> Subtotal: </dt>
            <dd> &pound;{subTotal} </dd>
          </dl>
          <dl aria-label='VAT'>
            <dt> VAT: </dt>
            <dd> &pound;{tax} </dd>
          </dl>
          <dl aria-label='Shipping cost'>
            <dt> Shipping: </dt>
            <dd> Enter address </dd>
          </dl>
          <dl aria-label='Total' className='o-checkout-cart-total__total'>
            <dt> You Pay: </dt>
            <dd> <b>&pound;{total}</b> </dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default CheckoutCartTotal
