// Libraries
import { Component } from 'react'
import { calculateCartSummary } from '../../lib/calculateCartSummary'
import { fixedPrice } from '../../lib/fixedPrice'

class CartSummary extends Component {
  render () {
    const totals = calculateCartSummary(this.props.cart)

    return (
      <section className='c-cart-summary'>
        <dl>
          <dt> Sub total: </dt>
          <dd> &pound;{ fixedPrice(totals.subTotal) } </dd>
        </dl>
        <dl>
          <dt> Tax applied: </dt>
          <dd className='u-text-color--red'> +&pound;{ fixedPrice(totals.tax) } </dd>
        </dl>
        <dl>
          <dt> Amount you saved on this purchase: </dt>
          <dd className='u-text-color--green'> -&pound;{ fixedPrice(totals.discount) } </dd>
        </dl>
        <dl>
          <dt> Total amount to be paid: </dt>
          <dd> <b>&pound;{ fixedPrice(totals.total) }</b> </dd>
        </dl>
      </section>
    )
  }
}

export default CartSummary
