import { Component } from 'react'

export default class CartSummary extends Component {
  calculateSummary () {
    const lineItems = this.props.cart.lineItems
    let [ total, discount, tax, subTotal ] = [ 0, 0, 0, 0 ]

    lineItems.map((li, index) => {
      subTotal += (li.quantity * li.price)
      discount += (li.quantity * (li.discount || 0))
    })
    total = subTotal - discount + tax
    return { subTotal, total, tax, discount }
  }

  render () {
    const { subTotal, total, tax, discount } = this.calculateSummary()

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
