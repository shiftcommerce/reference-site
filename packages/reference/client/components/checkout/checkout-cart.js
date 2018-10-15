// Libraries
import { Component } from 'react'
import Pluralize from 'react-pluralize'

// Lib
import { fixedPrice } from '../../lib/fixed-price'
import { calculateCartSummary } from '../../lib/calculate-cart-summary'

// Components
import LineItems from '../../components/cart/line-items'

export class CheckoutCart extends Component {
  render () {
    const { cart, checkout } = this.props
    const totals = calculateCartSummary(cart, checkout)
    return <>
      <section className='c-cart-table__header'>
        <div className='u-float--left'>
          <h2 className='c-cart-table__title'> Your Shopping Basket <a className='c-cart-table__amount'>({ cart.totalQuantity })</a> </h2>
          <p className='c-cart-table__description'>You have <a>{ cart.totalQuantity }</a> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> in your shopping basket</p>
          <p className='c-cart-table__description'><Pluralize singular='This' plural='These' count={cart.totalQuantity} showCount={false} /> <Pluralize singular='item' count={cart.totalQuantity} showCount={false} /> will be saved for 48 hours depending on availablility</p>
        </div>
        <div className='u-float--right'>
          <h4 className='c-cart-table__total'>&pound;{ fixedPrice(totals.total) }</h4>
        </div>
      </section>
      <LineItems cart={cart} updateQuantity={this.props.updateQuantity} />
    </>
  }
}

export default CheckoutCart
