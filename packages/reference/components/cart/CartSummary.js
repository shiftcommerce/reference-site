// Libraries
import { Component } from 'react'
import { calculateCartSummary } from '../../lib/calculateCartSummary'

class CartSummary extends Component {
  render () {
    const { subTotal, total, tax, discount } = calculateCartSummary(this.props.cart)

    return (
      <section className='c-cart-summary'>
        <dl>
          <dt> Sub total: </dt>
          <dd> &pound;{ subTotal } </dd>
        </dl>
        <dl>
          <dt> Tax applied: </dt>
          <dd className='u-text-color--red'> +&pound;{ tax } </dd>
        </dl>
        <dl>
          <dt> Amount you saved on this purchase: </dt>
          <dd className='u-text-color--green'> -&pound;{ discount } </dd>
        </dl>
        <dl>
          <dt> Total amount to be paid: </dt>
          <dd> <b>&pound;{ total }</b> </dd>
        </dl>
      </section>
    )
  }
}

export default CartSummary
