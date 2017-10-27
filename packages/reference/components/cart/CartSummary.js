// Libraries
import { Component } from 'react'
import { calculateCartSummary } from '../../lib/calculateCartSummary'
import { penceToPounds } from '../../lib/penceToPounds'

class CartSummary extends Component {
  render () {
    const totals = calculateCartSummary(this.props.cart)

    return (
      <section className='c-cart-summary'>
        <dl>
          <dt> Sub total: </dt>
          <dd> &pound;{ penceToPounds(totals.subTotal) } </dd>
        </dl>
        <dl>
          <dt> Tax applied: </dt>
          <dd className='u-text-color--red'> +&pound;{ penceToPounds(totals.tax) } </dd>
        </dl>
        <dl>
          <dt> Amount you saved on this purchase: </dt>
          <dd className='u-text-color--green'> -&pound;{ penceToPounds(totals.discount) } </dd>
        </dl>
        <dl>
          <dt> Total amount to be paid: </dt>
          <dd> <b>&pound;{ penceToPounds(totals.total) }</b> </dd>
        </dl>
      </section>
    )
  }
}

export default CartSummary
